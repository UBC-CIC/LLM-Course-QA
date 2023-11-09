using System;
namespace CPEN491.Backend.Service.DTOs
{
	public class CreateCourseDTO
	{
		public string Name { get; set; }
		public Guid InstructorId { get; set; }
		public string AccessCode { get; set; }
	}
}

