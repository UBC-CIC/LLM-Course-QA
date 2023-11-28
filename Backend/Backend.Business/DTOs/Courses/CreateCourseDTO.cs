using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Backend.Business.DTOs.Courses
{
    public class CreateCourseDTO
    {
        public string Code { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string CourseCode { get; set;} 
        public Guid InstructorId { get; set; }

    }
}