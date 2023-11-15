using Backend.Business.DTOs.Users;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Business.Services
{
    public class UserService
    {
        private readonly ILogger<UserService> _logger;
        public UserService(ILogger<UserService> logger)
        {
            _logger = logger;
        }

        // Create Course
        public static Guid Create(CreateUserDTO createUserDTO)
        {
            return Guid.NewGuid();
        }
    }
}
