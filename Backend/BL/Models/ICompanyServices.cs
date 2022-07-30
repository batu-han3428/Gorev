using Common.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public interface ICompanyServices
    {
        int CreateCompany(DOMAIN.Models.Companies company);
        List<DOMAIN.Models.Companies> ListComapny();
        int DeleteCompany(DOMAIN.Models.Companies Company);
    }
}
