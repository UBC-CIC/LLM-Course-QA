using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Business.DTOs.Users;
using Backend.Data.Models;

namespace Backend.Business.Interfaces
{
    public interface IUserService
    {
        public Guid Create(CreateUserDTO createUserDTO);
        public ReturnUserDTO Login(LoginDTO loginUserDTO);
    }
}
