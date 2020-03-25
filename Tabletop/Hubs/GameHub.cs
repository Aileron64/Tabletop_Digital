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
