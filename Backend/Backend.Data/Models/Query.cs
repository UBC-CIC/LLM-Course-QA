using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Data.Models
{
    public class Query
    {
        public Guid Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public User Student { get; set; }
        public Guid StudentId { get; set; }
        public Course Course { get; set; }
        public Guid CourseId { get; set; }
    }
}
