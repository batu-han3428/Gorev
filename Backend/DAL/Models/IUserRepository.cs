using DOMAIN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public interface IUserRepository : IBaseRepository<DOMAIN.Models.User>
    {
        List<User> GetEmployees(int CompanyId);
    }
}
