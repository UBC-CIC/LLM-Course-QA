using Microsoft.AspNetCore.Mvc;

namespace CPEN491.Backend.API.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{

    private readonly ILogger<QueryController> _logger;

    public UserController(ILogger<QueryController> logger)
    {
        _logger = logger;
    }

}

