using Microsoft.AspNetCore.Mvc;
using Backend.Business.DTOs.Courses;
using Backend.Business.Services;
using Backend.Business.Interfaces;

namespace Backend.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;
        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpPost(Name = "CreateCourseController")]
        public Guid Create(CreateCourseDTO createCourseDTO)
        {
            return _courseService.Create(createCourseDTO);
        }
    }
}