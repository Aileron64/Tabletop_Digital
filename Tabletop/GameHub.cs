using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;

namespace Tabletop
{
    public class GameHub : Hub
    {
        protected readonly GameManager GM = GameManager.Instance;
        public static ConcurrentDictionary<string, User> Users = new ConcurrentDictionary<string, User>();
        readonly string[] COLORS = new string[] { "Blue", "Red", "Green", "Yellow" };

        public string GameCode()
        {
            return Users[Context.ConnectionId].GameCode;
        }

        public string UserId()
        {
            return Users[Context.ConnectionId].ClientId;
        }

        //------------ Connection Overrides --------------

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            //GM.Games[GameCode()].RemovePlayer(Context.ConnectionId);
            //UpdatePlayerList();
            return base.OnDisconnectedAsync(exception);
        }

        //---------------- Update Methods ------------------

        public async void UpdateTable()
        {
            //await Clients.All.SendAsync("UpdateTable", GM.Games[GameCode()].Table);
            await Clients.Group(GameCode()).SendAsync("UpdateTable", GM.Games[GameCode()].Table);
        }

        public async void UpdateHand()
        {
            Debug.Log(Users[Context.ConnectionId].Username + ": UPDATE HAND");
            await Clients.Caller.SendAsync("UpdateHand", GM.Games[GameCode()].PlayerCards[UserId()]);
        }

        public async void UpdateOtherHand(string userId)
        {
            await Clients.Client(Users.FirstOrDefault(u => u.Value.ClientId == userId).Key)
                .SendAsync("UpdateHand", GM.Games[GameCode()].PlayerCards[userId]);
        }

        public async void UpdatePlayerList()
        {
            if (GM.Games[GameCode()].Players.Count > 0)
                TableStatus(GM.Games[GameCode()].Players[0].Name + "'s Turn");

            await Clients.Group(GameCode()).SendAsync("UpdatePlayerList", GM.Games[GameCode()].Players);
        }

        public async void UpdateChat()
        {
            await Clients.Group(GameCode()).SendAsync("UpdateChat", GM.ChatLogs[GameCode()]);
        }

        //------------- Status Text Methods --------------

        public async void TableStatus(string text)
        {
            await Clients.Group(GameCode()).SendAsync("TableStatus", text);
        }

        public async void TableSubStatus(string text)
        {
            await Clients.Group(GameCode()).SendAsync("TableSubStatus", text);
        }

        public async void HandStatus(string text)
        {
            await Clients.Caller.SendAsync("HandStatus", text);
        }

        //---------------- Call Methods ------------------

        public async void JoinGame(string code, string name, string clientId)
        {
            name = name.Trim();

            if (name == "")
            {
                try
                {
                    Random rand = new Random();
                    name = NameList.NameArray[rand.Next(NameList.NameArray.Length)];
                }
                catch
                {
                    name = "Anonymous";
                }
            }

            if (Users.Any(x => x.Value.ClientId == clientId))
            {
                Users.TryAdd(Context.ConnectionId, Users.Where(x => x.Value.ClientId == clientId).FirstOrDefault().Value);
            }
            else
            {
                Users.TryAdd(Context.ConnectionId, new User()
                {
                    ConnectionId = Context.ConnectionId,
                    Username = name,
                    GameCode = code,
                    ClientId = clientId
                });

                GM.Games[GameCode()].AddPlayer(UserId(), name);
            }

            //Chat(clientId);
            await Groups.AddToGroupAsync(Context.ConnectionId, code);
        }

        public void DrawCard()
        {
            if (GM.Games[GameCode()].DrawCard(UserId()))
            {
                TableSubStatus(Users[Context.ConnectionId].Username + " Drew a Card");
                UpdatePlayerList();
                UpdateHand();
            }
        }

        public void PlayCard(int cardID)
        {
            Card pCard = GM.Games[GameCode()].PlayerCards[UserId()][cardID];

            if (GM.Games[GameCode()].PlayCard(UserId(), cardID))
            {
                switch (pCard.Number)
                {
                    default:
                        TableSubStatus(
                            Users[Context.ConnectionId].Username + " Played "
                            + COLORS[pCard.Color] + " " + pCard.Number);
                        break;

                    case 10: //----- Pick Up 2 -----//
                        UpdateOtherHand(GM.Games[GameCode()].Players.First().ConnectionId);
                        break;
                }

                UpdatePlayerList();
                UpdateTable();
                UpdateHand();
            }
        }

        public void PlayWildCard(int color, int cardID)
        {
            GM.Games[GameCode()].PlayWildCard(UserId(), cardID, color);

            UpdatePlayerList();
            UpdateTable();
            UpdateHand();
        }

        public void LeaveGame()
        {
            Debug.Log("LEAVE GAME");
            GM.Games[GameCode()].RemovePlayer(UserId());
            UpdatePlayerList();

            //Users.TryRemove(Context.ConnectionId, out _);

            foreach (var user in Users.Where(u => u.Value.ClientId == UserId()))
            {
                Users.TryRemove(user.Key, out _);
            } 
        }

        public void Chat(string input)
        {
            GM.NewMessage(Users[Context.ConnectionId].Username, input, GameCode());
            UpdateChat();
        }
    }

    public class User
    {
        public string ConnectionId { get; set; }
        public string ClientId { get; set; }
        public string GameCode { get; set; }
        public string Username { get; set; }
    }
}
