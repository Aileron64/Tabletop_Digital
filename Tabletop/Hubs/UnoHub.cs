using Microsoft.AspNetCore.SignalR;

namespace Tabletop
{
    public class UnoHub : GameHub
    {
        readonly string[] COLORS = new string[] { "Blue", "Red", "Green", "Yellow" };

        //---------------- Update Methods ------------------

        public async void UpdateTable()
        {
            //await Clients.All.SendAsync("UpdateTable", GM.Games[GameCode()].Table);
            await Clients.Group(GameCode()).SendAsync("UpdateTable", GM.Games[GameCode()].Table);
        }

        public async void UpdateHand()
        {
            await Clients.Group(GameCode()).SendAsync("UpdateHand", GM.Games[GameCode()].PlayerCards[UserId()]);
        }

        public async void UpdatePlayerList()
        {
            if (GM.Games[GameCode()].Players.Count > 0)
                TableStatus(GM.Games[GameCode()].Players[0].Name + "'s Turn");

            await Clients.Group(GameCode()).SendAsync("UpdatePlayerList", GM.Games[GameCode()].Players);
        }

        //---------------- Call Methods ------------------

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

                        //case 10: //----- Pick Up 2 -----//
                        //UpdateOtherHand(GM.Games[GameCode()].Players.First().ConnectionId);
                        //break;
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
            GM.Games[GameCode()].RemovePlayer(UserId());
            UpdatePlayerList();
        }
    }
}
