using System.Threading.Tasks;
//using AuthorizationServer.Models;
//using AuthorizationServer.ViewModels.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ngtemplate.Model;

namespace ngtemplate.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        // private readonly ApplicationDbContext _applicationDbContext;
        private static bool _databaseChecked;

        public AccountController(
            UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            // _applicationDbContext = applicationDbContext;
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] LoginDto model)
        {
            // EnsureDatabaseCreated(_applicationDbContext);
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(model.Name);
                if (user != null)
                {
                    return StatusCode(StatusCodes.Status409Conflict);
                }

                user = new IdentityUser { UserName = model.Name, Email = model.Name };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    return Ok();
                }
                AddErrors(result);
            }

            // If we got this far, something failed.
            return BadRequest(ModelState);
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }
    }
}