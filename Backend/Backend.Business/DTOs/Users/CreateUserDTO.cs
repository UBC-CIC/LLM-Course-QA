using Backend.Data.Models;

namespace Backend.Business.DTOs.Users
{
    public class CreateUserDTO
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; } 

    }
}
