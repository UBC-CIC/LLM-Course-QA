using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Business.DTOs.Courses
{
    public class JoinCourseDTO
    {
        public string? AccessCode { get; set; }
        public Guid StudentId { get; set; }

    }
}
