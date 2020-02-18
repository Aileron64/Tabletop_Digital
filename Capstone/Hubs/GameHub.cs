using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.IO;

namespace Capstone
{
    public class GameHub : Hub
    {
        readonly GameManager GM = GameManager.Instance;
        readonly ChatManager CM = ChatManager.Instance;
        readonly string[] COLORS = new string[] { "Blue", "Red", "Green", "Yellow" };

        public static ConcurrentDictionary<string, User> Users = new ConcurrentDictionary<string, User>();

        public override Task OnConnectedAsync()
        {
            Debug.Log("User Connected: " + Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            GM.Games["GAME_CODE"].RemovePlayer(Context.ConnectionId);
            UpdatePlayerList();
            return base.OnDisconnectedAsync(exception);
        }

        //---------------- Update Methods ------------------

        public async void UpdateTable()
        {
            await Clients.All.SendAsync("UpdateTable", GM.Games["GAME_CODE"].Table);
        }

        public async void UpdateHand()
        {
            await Clients.Caller.SendAsync("UpdateHand", GM.Games["GAME_CODE"].PlayerCards[Context.ConnectionId]);
        }

        public async void UpdateOtherHand(string connectionId)
        {
            await Clients.Client(connectionId).SendAsync("UpdateHand", GM.Games["GAME_CODE"].PlayerCards[connectionId]);
        }

        public async void UpdateChat()
        {
            await Clients.All.SendAsync("UpdateChat", CM.ChatBox);
        }

        public async void UpdatePlayerList()
        {
            if(GM.Games["GAME_CODE"].Players.Count > 0)
                TableStatus(GM.Games["GAME_CODE"].Players[0].Name + "'s Turn");

            await Clients.All.SendAsync("UpdatePlayerList", GM.Games["GAME_CODE"].Players);
        }

        //------------- Status Text Methods --------------

        public async void TableStatus(string text)
        {
            await Clients.All.SendAsync("TableStatus", text);
        }

        public async void TableSubStatus(string text)
        {
            await Clients.All.SendAsync("TableSubStatus", text);
        }

        public async void HandStatus(string text)
        {
            await Clients.Caller.SendAsync("HandStatus", text);
        }

        //---------------- Call Methods ------------------

        public async void EnterName(string name)
        {
            int playerID = Users.Count + 1;

            name = name.Trim();

            if(name == "")
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
                
            Users.TryAdd(Context.ConnectionId, new User()
            {
                ConnectionId = Context.ConnectionId,
                Username = name,
                PlayerId = playerID
            });

            GM.Games["GAME_CODE"].AddPlayer(playerID, Context.ConnectionId, name);
            await Clients.Caller.SendAsync("JoinGame", playerID);
        }

        public void DrawCard()
        {
            if (GM.Games["GAME_CODE"].DrawCard(Context.ConnectionId))
            {
                TableSubStatus(Users[Context.ConnectionId].Username + " Drew a Card");
                UpdatePlayerList();
                UpdateHand();
            }
        }

        public void PlayCard(int cardID)
        {
            Card pCard = GM.Games["GAME_CODE"].PlayerCards[Context.ConnectionId][cardID];

            if (GM.Games["GAME_CODE"].PlayCard(Context.ConnectionId, cardID))
            {
                switch (pCard.Number)
                {
                    default:
                        TableSubStatus(
                            Users[Context.ConnectionId].Username + " Played " 
                            + COLORS[pCard.Color] + " " + pCard.Number);
                        break;

                    case 10: //----- Pick Up 2 -----//
                        UpdateOtherHand(GM.Games["GAME_CODE"].Players.First().ConnectionId);
                        break;
                }

                UpdatePlayerList();
                UpdateTable();
                UpdateHand();
            }
        }

        public void Chat(string input)
        {
            CM.NewMessage(Users[Context.ConnectionId].Username, input);

            UpdateChat();
        }
    }

    public class User
    {
        public string ConnectionId { get; set; }
        public int PlayerId { get; set; }
        public string Username { get; set; }
    }
}
