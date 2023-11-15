using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Backend.Business.DTOs.Courses;

namespace Backend.Business.Services
{
    public class CourseService
    {
        private readonly ILogger<CourseService> _logger;
        public CourseService(ILogger<CourseService> logger) 
        { 
            _logger = logger;
        }

        // Create Course
        public static Guid Create(CreateCourseDTO createCourseDTO)
        {
            return Guid.NewGuid();
        }
    }
}
