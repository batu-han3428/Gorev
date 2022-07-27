using DOMAIN.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOMAIN.Helpers
{
    public class DbInitializer
    {
        private readonly ModelBuilder modelBuilder;

        public DbInitializer(ModelBuilder modelBuilder)
        {
            this.modelBuilder = modelBuilder;
        }

        public void Seed()
        {
            modelBuilder.Entity<Role>().HasData(
                   new Role() { Id = 1, Name = "Admin" },
                   new Role() { Id = 2, Name = "Yönetici" },
                   new Role() { Id = 3, Name = "Personel" }
            );
        }
    }

}
