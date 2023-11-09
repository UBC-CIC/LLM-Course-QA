using System;
using Microsoft.Extensions.Logging;
namespace CPEN491.Backend.Service.Services
{
	public class CourseService
	{
        private readonly ILogger<CourseService> _logger;
        public CourseService(ILogger<CourseService> logger)
		{
			_logger = logger;
		}
	}
}

