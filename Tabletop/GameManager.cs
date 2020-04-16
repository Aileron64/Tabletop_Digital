using System;
using System.Collections.Generic;
using System.Linq;
using Tabletop.Models;

namespace Tabletop
{
    public class GameManager
    {
        private static GameManager instance = null;
        public static GameManager Instance { get { return instance ?? (instance = new GameManager()); } }

        public Dictionary<string, Game> Games = new Dictionary<string, Game>();
        public Dictionary<string, List<Message>> ChatLogs = new Dictionary<string, List<Message>>();

        //public readonly List<Message> ChatBox = new List<Message>();
        
        const string CODE_CHARS =  "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

        public string CreateGame()
        {
            char[] stringChars = new char[4];
            Random rand = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = CODE_CHARS[rand.Next(CODE_CHARS.Length)];
            }

            string code = new string(stringChars);
            Games.Add(code, new Game());
            ChatLogs.Add(code, new List<Message>());
            return code;
        }

        public void NewMessage(string author, string input, string code)
        {
            ChatLogs[code].Add(new Message
            {
                Author = author,
                Value = input
            });
        }
    }

    public class Message
    {
        public string Author { get; set; }
        public string Value { get; set; }
    }
}


