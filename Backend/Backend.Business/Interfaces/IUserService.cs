using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Business.DTOs.Users;

namespace Backend.Business.Interfaces
{
    public interface IUserService
    {
        public Guid Create(CreateUserDTO createUserDTO);
    }
}
