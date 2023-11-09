using Microsoft.AspNetCore.Mvc;

namespace CPEN491.Backend.API.Controllers;

[ApiController]
[Route("[controller]")]
public class CourseController : ControllerBase
{

    private readonly ILogger<CourseController> _logger;

    public CourseController(ILogger<CourseController> logger)
    {
        _logger = logger;
    }

}

