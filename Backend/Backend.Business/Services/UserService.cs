using Backend.Business.DTOs.Users;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Data.Models;
using Backend.Business.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Business.Services
{
    public class UserService : IUserService
    {
        private readonly ILogger<UserService> _logger;
        private readonly LlmQAContext _llmQAContext;

        public UserService(ILogger<UserService> logger, LlmQAContext llmQAContext)
        {
            _logger = logger;
            _llmQAContext = llmQAContext;
        }

        // Create user
        public Guid Create(CreateUserDTO createUserDTO)
        {
            User user = new User
            {
                Name = createUserDTO.Name,
                Username = createUserDTO.Username,
                Password = createUserDTO.Password,
                Role = createUserDTO.Role
            };

            List<Course> courses = _llmQAContext.Courses.ToList() ?? new List<Course>();

            if (createUserDTO.Role == Role.Admin)
            {
                user.AdminCourses = courses;
            }

            _llmQAContext.Users.Add(user);
            _llmQAContext.SaveChanges();

            return user.Id;
        }

        public ReturnUserDTO Login(LoginDTO loginUserDTO)
        {
            User user = _llmQAContext.Users.Where(u => u.Username == loginUserDTO.Username && u.Password == loginUserDTO.Password).FirstOrDefault();

            if (user == null)
            {
                throw new Exception("User not found");
            }

            List<Course> courses;

            if(user.Role == Role.Admin)
            {
                courses = _llmQAContext.Courses
                .Where(course => course.Admins.Any(admin => admin.Id == user.Id))
                .ToList();
            }
            else if(user.Role == Role.Instructor)
            {
                courses = _llmQAContext.Courses
                .Where(course => course.InstructorId == user.Id)
                .ToList();
            }
            else
            {
                courses = _llmQAContext.Courses
                .Where(course => course.Students.Any(student => student.Id == user.Id))
                .ToList();
            }


            ReturnUserDTO returnUserDTO = new ReturnUserDTO
            {
                Id = user.Id,
                Role = user.Role,
                Courses = courses

            };

            return returnUserDTO;
        }
    }
}
