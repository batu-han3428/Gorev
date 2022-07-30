using BL.Models;
using Common.ViewModels;
using DAL.Models;
using DOMAIN.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Concrete
{
    public class CompanyServices : ICompanyServices
    {
        private readonly ICompanyRepository _CompanyRepository;
        private readonly SqlDbContext _context;
        public CompanyServices(ICompanyRepository CompanyRepository)
        {
            _CompanyRepository = CompanyRepository;
            _context = new SqlDbContext();
        }

        public int CreateCompany(DOMAIN.Models.Companies company)
        {
            if (_context.Companies.Any(x => x.Name != company.Name))
                return _CompanyRepository.Add(company);
            else
                return 0;
        }

        public List<DOMAIN.Models.Companies> ListComapny()
        {
            return _CompanyRepository.AllList();
        }

        public int DeleteCompany(DOMAIN.Models.Companies Company)
        {
            return _CompanyRepository.Delete(Company);
        }
    }
}
