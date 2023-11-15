using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Business.DTOs.Courses
{
    public class CreateCourseDTO
    {
        public string Code { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
    }
}