using Microsoft.AspNetCore.Mvc;
using Backend.Business.DTOs.Queries;
using Backend.Business.Services;
using Backend.Business.Interfaces;

namespace Backend.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QueryController : ControllerBase
    {
        private readonly IQueryService _queryService;
        public QueryController(IQueryService queryService)
        {
            _queryService = queryService;
        }

        [HttpPost(Name = "CreateQueryController")]
        public Guid Create(QueryDTO queryDTO)
        {

            return _queryService.Create(queryDTO);
            
        }
    }
}