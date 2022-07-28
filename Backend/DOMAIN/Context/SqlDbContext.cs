using DOMAIN.Helpers;
using DOMAIN.Models;
using Microsoft.EntityFrameworkCore;


namespace DOMAIN.Context
{
    public class SqlDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"server=sqltstsrv;Database=TaskProject;User Id=bisuser;Password=p@ssword1");
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<DOMAIN.Models.Task> Tasks { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<Companies> Companies { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(user => user.UserRoles);

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(role => role.UserRoles);

            modelBuilder.Entity<DOMAIN.Models.Task>()
                .HasOne<User>(s => s.User)
                .WithMany(g => g.Tasks);

            modelBuilder.Entity<Document>()
                .HasOne<DOMAIN.Models.Task>(s => s.Task)
                .WithMany(g => g.Documents);

            modelBuilder.Entity<User>()
                .HasOne<DOMAIN.Models.Companies>(s => s.Companies)
                .WithMany(g => g.Users);

            modelBuilder.Entity<User>().Property(x => x.IsConfirmEmail).HasDefaultValue(false);

            new DbInitializer(modelBuilder).Seed();
        }

    }
}
