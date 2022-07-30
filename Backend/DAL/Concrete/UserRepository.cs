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
            if (context.Users.Any(x => x.Companies.Id == CompanyId && x.Companies.Id != null))
                return context.Users.Where(x => x.Companies.Id == CompanyId && x.Companies.Id != null).ToList();
            else
                return null;
        }
    }
}
