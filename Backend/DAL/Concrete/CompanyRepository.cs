using Common.ViewModels;
using DAL.Models;
using DOMAIN.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Concrete
{
    public class CompanyRepository : BaseRepository<DOMAIN.Models.Companies>, ICompanyRepository
    {
      
    }
}
