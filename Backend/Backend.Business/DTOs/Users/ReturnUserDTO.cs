using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Data.Models;

namespace Backend.Business.DTOs.Users
{
    public class ReturnUserDTO
    {
        public Guid Id { get; set; }
        public Role Role { get; set; }
        public List<Course> Courses { get; set; }

    }
}
