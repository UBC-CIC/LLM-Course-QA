using Backend.Data.Models;

namespace Backend.Business.DTOs.Users
{
    public class LoginDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
