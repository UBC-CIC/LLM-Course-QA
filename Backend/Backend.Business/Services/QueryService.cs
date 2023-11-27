using Backend.Business.DTOs.Users;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Business.DTOs.Queries;
using Backend.Business.Interfaces;
using Azure.AI.OpenAI;


namespace Backend.Business.Services
{
    public class QueryService : IQueryService
    {
        private readonly ILogger<QueryService> _logger;
        public QueryService(ILogger<QueryService> logger)
        {
            _logger = logger;
        }

        // Create Course
        public Guid Create(QueryDTO queryDTO)
        {
            // connect to open ai
            var client = new OpenAIClient("your-api-key-from-platform.openai.com");
            return Guid.NewGuid();
        }
    }
}
