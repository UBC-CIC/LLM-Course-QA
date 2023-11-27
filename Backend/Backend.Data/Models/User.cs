using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Models
{
    public enum Role
    {
        Instructor,
        Student,
        Admin
    }

    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set;}
        public string Password { get; set; }
        public Role Role { get; set; }
        // Navigation properties
        public ICollection<Course> InstructorCourses { get; set; }

        // Navigation properties for many-to-many relationships
        public ICollection<Course> AdminCourses { get; set; }
        public ICollection<Course> StudentCourses { get; set; }
    }
}
