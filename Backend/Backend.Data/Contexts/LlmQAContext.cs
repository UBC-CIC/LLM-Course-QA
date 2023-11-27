using Microsoft.EntityFrameworkCore;
using Backend.Data.Models;
public class LlmQAContext : DbContext
{
    public LlmQAContext(DbContextOptions<LlmQAContext> options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // One-to-many relationship: Instructor to Courses
        modelBuilder.Entity<Course>()
            .HasOne(c => c.Instructor)
            .WithMany(u => u.InstructorCourses)
            .HasForeignKey(c => c.InstructorId)
            .OnDelete(DeleteBehavior.Restrict); // Restrict to avoid cascade delete issues

        // Many-to-many: User to Course for Admins
        modelBuilder.Entity<Course>()
            .HasMany(c => c.Admins)
            .WithMany(u => u.AdminCourses)
            .UsingEntity<Dictionary<string, object>>(
                "CourseUserAdmin", // Join table for Admins
                j => j.HasOne<User>().WithMany().HasForeignKey("AdminId").OnDelete(DeleteBehavior.Restrict),
                j => j.HasOne<Course>().WithMany().HasForeignKey("CourseId").OnDelete(DeleteBehavior.Cascade)
            );

        // Many-to-many: User to Course for Students
        modelBuilder.Entity<Course>()
            .HasMany(c => c.Students)
            .WithMany(u => u.StudentCourses)
            .UsingEntity<Dictionary<string, object>>(
                "CourseUserStudent", // Join table for Students
                j => j.HasOne<User>().WithMany().HasForeignKey("StudentId").OnDelete(DeleteBehavior.Restrict),
                j => j.HasOne<Course>().WithMany().HasForeignKey("CourseId").OnDelete(DeleteBehavior.Cascade)
            );
    }



    public DbSet<User> Users { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Query> Queries { get; set; }

}
