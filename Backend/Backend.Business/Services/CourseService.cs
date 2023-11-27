using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Backend.Business.DTOs.Courses;
using Backend.Data.Models;

namespace Backend.Business.Services
{
    public class CourseService
    {
        private readonly ILogger<CourseService> _logger;
        private readonly LlmQAContext _llmQAContext;
        public CourseService(ILogger<CourseService> logger, LlmQAContext llmQAContext) 
        { 
            _logger = logger;
            _llmQAContext = llmQAContext;
        }

        // Create Course
        public Guid Create(CreateCourseDTO createCourseDTO)
        {
            string accessCode = new Guid().ToString();
            
            List<User> adminList = _llmQAContext.Users.Where(u => u.Role == Role.Admin).ToList();

            Course course = new Course
            {
                CourseCode = createCourseDTO.CourseCode,
                Name = createCourseDTO.Name,
                Description = createCourseDTO.Description,
                AccessCode = accessCode,
                InstructorId = createCourseDTO.InstructorId,
                Admins = adminList,
                Students = new List<User>()
            };
            return Guid.NewGuid();
        }

        public bool Join(JoinCourseDTO joinCourseDTO)
        {
            Course course = _llmQAContext.Courses.Where(c => c.AccessCode == joinCourseDTO.AccessCode).FirstOrDefault();
            User student = _llmQAContext.Users.Where(u => u.Id == joinCourseDTO.StudentId).FirstOrDefault();

            if (course == null)
            {
                throw new Exception("Course not found");
            }

            if(student == null)
            {
                throw new Exception("Student not found");
            }

            course.Students.Add(student);
            _llmQAContext.SaveChanges();

            return true;
        }
    }
}
