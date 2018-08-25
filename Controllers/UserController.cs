using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ngtemplate.Model;

namespace ngtemplate.Controllers 
{
    [Route("api/[controller]")]
    public class UserController: Controller
    {
        readonly UserManager<IdentityUser> _UserManager;
        SignInManager<IdentityUser> _SignInManager;
        ILogger<UserController> _Logger;

        public UserController(UserManager<IdentityUser> uMgr,
            SignInManager<IdentityUser> siMgr,
            ILogger<UserController> log)
        {
            _UserManager = uMgr;
            _SignInManager = siMgr;
            _Logger = log;
        }


        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> RegisterAsync([FromBody] LoginDto dto)
        {
            var user = new IdentityUser { UserName = dto.Name, Email = dto.Name };
            var result = await _UserManager.CreateAsync(user, dto.Password);
            
            if (result.Succeeded)
            {
                _Logger.LogInformation($"User {dto.Name} created.");

                await _SignInManager.SignInAsync(user, isPersistent: false);
                
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> LoginAsync([FromBody] LoginDto dto)
        {
            var result = await _SignInManager.PasswordSignInAsync(dto.Name,
            dto.Password, dto.RememberMe, lockoutOnFailure: true);
            if (result.Succeeded)
            {
                _Logger.LogInformation("User logged in.");
                
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }

    }
}
