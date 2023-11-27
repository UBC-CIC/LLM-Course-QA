using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Models
{
    public class Course
    {
        public Guid Id { get; set; }
        public string CourseCode { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AccessCode { get; set; }

        // Navigation properties
        public User Instructor { get; set; }
        public Guid InstructorId { get; set; }
        public ICollection<User> Admins { get; set; }
        public ICollection<User>? Students { get; set; }
     
    }
}
