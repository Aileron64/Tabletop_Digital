using Microsoft.AspNetCore.Mvc;
using System;
using Tabletop.Models;
using System.Linq;

namespace Tabletop.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        readonly GameManager GM = GameManager.Instance;

        private readonly TabletopContext _context;

        public MainController(TabletopContext context)
        {
            _context = context;
        }

        [HttpGet("AddAccount")]
        public IActionResult AddAccount(string username, string password, string email)
        {
            string output = "";

            if (username == null || password == null || email == null)
            {
                output = "Missing Info";
            }

            _context.Account.Add(new Account
            {
                UserName = username,
                Password = password,
                Email = email
            });

            _context.SaveChanges();

            Debug.Log("ADD ACCOUNT: " + username);
            return Ok(output);
        }

        [HttpGet("CreateGame")]
        public string CreateGame()
        {
            string gameCode = GM.CreateGame();
            Debug.Log("Added Game:" + gameCode);

            return gameCode;
        }

        [HttpGet("JoinGame")]
        public bool JoinGame(string roomCode)
        {
            if (roomCode != null)
                return GM.Games.ContainsKey(roomCode);
            else
                return false;
        }

        [HttpGet("CheckGames")]
        public string CheckGames()
        {
            if (Request.Cookies["ClientId"] == null)
                return "0";
            else
            {
                string id = Request.Cookies["ClientId"];

                foreach (User user in GameHub.Users.Values)
                {
                    if (user.ClientId == id)
                        return user.GameCode;
                }
            }

            return "0";
        }

        [HttpGet("ClientId")]
        public string ClientId()
        {
            string id;

            if (Request.Cookies["ClientId"] == null)
            {
                id = Guid.NewGuid().ToString();
                Response.Cookies.Append("ClientId", id);
            }
            else
            {
                id = Request.Cookies["ClientId"];
            }

            Debug.Log(id);
            return id;
        }
    }
}