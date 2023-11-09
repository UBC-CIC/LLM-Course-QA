using Microsoft.AspNetCore.Mvc;

namespace CPEN491.Backend.API.Controllers;

[ApiController]
[Route("[controller]")]
public class QueryController : ControllerBase
{

    private readonly ILogger<QueryController> _logger;

    public QueryController(ILogger<QueryController> logger)
    {
        _logger = logger;
    }

}

