using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using BL.Models;
using System.Net;
using Common.Helpers;
using Common.Models;
using Common.ViewModels;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICompanyServices _companyServices;
        public CompanyController(IMapper mapper, ICompanyServices CompanyServices)
        {
            _mapper = mapper;
            _companyServices = CompanyServices;
        }


        [HttpPost("[action]")]
        [Authorize(Roles = "Admin")]
        public HttpStatusCode CreateCompany(Common.DTO.CompanyDTO company)
        {
            if (company == null) return HttpStatusCode.BadRequest;


            DOMAIN.Models.Companies companyDomain = _mapper.Map<DOMAIN.Models.Companies>(company);


            if(_companyServices.CreateCompany(companyDomain) == 1)
                return HttpStatusCode.OK;
            else
                return HttpStatusCode.BadRequest;
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "Admin")]
        public IActionResult ListComapny()
        {
            return Ok(_mapper.Map<List<Common.ViewModels.ListCompaniesViewModel>>(_companyServices.ListComapny()));
        }

        [HttpPost("[action]")]
        [Authorize(Roles = "Admin")]
        public HttpStatusCode DeleteCompany(Common.DTO.CompanyDTO Company)
        {
            if (Company != null)
            {
                if (_companyServices.DeleteCompany(_mapper.Map<DOMAIN.Models.Companies>(Company)) == 1)
                    return HttpStatusCode.OK;
                else
                    return HttpStatusCode.BadRequest;

            }
            else
                return HttpStatusCode.BadRequest;
        }
    }
}
