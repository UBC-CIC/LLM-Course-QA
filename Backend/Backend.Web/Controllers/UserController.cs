using Microsoft.AspNetCore.Mvc;
using Backend.Business.DTOs.Users;
using Backend.Business.Services;
using Backend.Business.Interfaces;

namespace Backend.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost(Name = "CreateUserController")]
        public Guid Create(CreateUserDTO createUserDTO)
        {
            return _userService.Create(createUserDTO);
        }
    }
}