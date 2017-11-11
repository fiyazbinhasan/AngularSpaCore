using AspNetCoreAngularSpa.Models;
using Microsoft.EntityFrameworkCore;

namespace AsyncValidation
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
    }
}