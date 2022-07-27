using DAL.Models;
using DOMAIN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Concrete
{
    public class UserRepository : BaseRepository<DOMAIN.Models.User>, IUserRepository
    {
        public List<User> GetEmployees(int CompanyId)
        {
            return context.Users.Where(x=>x.Companies.Id == CompanyId).ToList();
        }
    }
}
