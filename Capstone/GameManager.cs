using System;
using System.Collections.Generic;
using System.Linq;

namespace Capstone
{
    public class GameManager
    {
        private static GameManager instance = null;
        public static GameManager Instance { get { return instance ?? (instance = new GameManager()); } }

        public Dictionary<string, Game> Games = new Dictionary<string, Game>();

        private GameManager()
        {
            Games.Add("GAME_CODE", new Game());
        }

    }
}


