using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Business.DTOs.Queries;

namespace Backend.Business.Interfaces
{
    public interface IQueryService
    {
        // Query method
        public Guid Create(QueryDTO createCourseDTO);
    }
}
