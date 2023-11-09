using CPEN491.Backend.Service.Interfaces;
using CPEN491.Backend.Service.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace CPEN491.Backend.API.Controllers;

[ApiController]
[Route("[controller]")]
public class CourseController : ControllerBase
{
    private readonly ICourseService _courseService;

    public CourseController(ICourseService courseService)
    {
        _courseService = courseService;
    }

    [HttpPost(Name = "CreateCourse")]
    public ActionResult<string> Create(CreateCourseDTO createCourseDTO)
    {
        string courseId = _courseService.CreateCourse(createCourseDTO);
        return Ok(courseId);
    }
}

