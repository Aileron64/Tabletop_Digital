using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using Tabletop.Models;

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

        [HttpPost("test")]
        public IActionResult Test(string pl)
        {
            Debug.Log("TEST");
            Debug.Log(pl);

            if (pl == null)
            {
                return Ok();
            }

            PL plobj = JsonConvert.DeserializeObject<PL>(pl);

            Debug.Log(pl);
            Debug.Log(plobj.a);
            Debug.Log(plobj.b);



            return Ok($"Test Test a=={plobj.a} b=={plobj.b}");
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
            return GM.Games.ContainsKey(roomCode);
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

    public class PL
    {
        public string a { get; set; }
        public string b { get; set; }
    }
}