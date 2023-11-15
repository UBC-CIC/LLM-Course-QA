using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Backend.Business.DTOs.Courses;

namespace Backend.Business.Interfaces
{
    public interface ICourseService
    {
        // Create course method
        public Guid Create(CreateCourseDTO createCourseDTO);
    }
}
