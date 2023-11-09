using System;
using Microsoft.Extensions.Logging;
using CPEN491.Backend.Service.Interfaces;
using CPEN491.Backend.Service.DTOs;

namespace CPEN491.Backend.Service.Services
{
	public class CourseService : ICourseService
    {
        private readonly ILogger<CourseService> _logger;

        public CourseService(ILogger<CourseService> logger)
		{
			_logger = logger;
		}

		public string CreateCourse(CreateCourseDTO id)
		{
			return "here";
		}
	}
}

