using AutoMapper;
using BL.Models;
using Common.DTO;
using Common.Helpers;
using Common.Models;
using Common.ViewModels;
using DOMAIN.Context;
using DOMAIN.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text;
using WebApi.Helpers;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly Sha1Hash _sha;
        private readonly IMapper _mapper;
        private readonly IUserServices _userServices;

        public UserController(IConfiguration configuration, IMapper mapper, IUserServices UserServices)
        {
            this.configuration = configuration;
            _sha = new Sha1Hash();
            _mapper = mapper;
            _userServices = UserServices;
        }


        [HttpPost("[action]")]
        public HttpStatusCode Register(Common.DTO.UserDTO user)
        {
            if (!ModelState.IsValid)
            {
                return HttpStatusCode.BadRequest;
            }

            DOMAIN.Models.User userDomain = _mapper.Map<DOMAIN.Models.User>(user);
            TokenHandler tokenHandler = new TokenHandler(configuration);
            userDomain.ConfirmEmailToken = tokenHandler.CreateEmailConfirmToken().ConfirmToken;
            userDomain.Password = _sha.Encrypt(userDomain.Password);
            
            if (_userServices.AddUser(userDomain) == 0)
                return HttpStatusCode.BadRequest;
            else
            {
                StringBuilder mailbuilder = new StringBuilder();
                mailbuilder.Append("<html>");
                mailbuilder.Append("<head>");
                mailbuilder.Append("<meta charset= utf-8 />");
                mailbuilder.Append("<title>Email Onaylama</title>");
                mailbuilder.Append("</head>");
                mailbuilder.Append("<body>");
                mailbuilder.Append($"<p>Merhaba {user.Name}</p><br/>");
                mailbuilder.Append($"Mail adresinizi onaylamak için aşağıda ki bağlantı adresien tıklayınız.<br/>");
                mailbuilder.Append($"<a onclick='window.close()' href='https://localhost:7261/api/User/ConfirmEmail/?uid={userDomain.Id}&code={userDomain.ConfirmEmailToken}'>Email adresinizi onaylayın.");
                mailbuilder.Append("</body>");
                mailbuilder.Append("</html>");

                EmailHelper emailHelper = new EmailHelper();
                bool isSend = emailHelper.SendEmail(user.Email, mailbuilder.ToString(), Emails.bticaret01Email, Emails.bticaret01Password, "Üyelik Onaylama");

                if (isSend)
                    return HttpStatusCode.OK;
                else
                    return HttpStatusCode.BadRequest;
            }
        }

        [HttpGet("[action]")]
        public IActionResult ConfirmEmail([FromQuery] ConfirmEmailDTO confirmEmailDTO)
        {
            var cookieOptions = new CookieOptions
            {
                Expires = DateTime.UtcNow.AddMinutes(1)
            };
            Response.Cookies.Append("ConfirmToken", confirmEmailDTO.code, cookieOptions);

            if(_userServices.ConfirmEmail(confirmEmailDTO) == 1)
                return Redirect("https://localhost:3000/ConfirmEmail/:true");
            else
                return Redirect("https://localhost:3000/ConfirmEmail/:false");        
        }

        [HttpPost("[action]")]
        public async Task<HttpStatusCode> Login(UserLoginDTO userLoginDTO)
        {
            var result = _userServices.UserLogin(userLoginDTO, configuration);
            if (result.Item1 == 403)
                return HttpStatusCode.Forbidden;
            else if(result.Item1 == 401)
                return HttpStatusCode.Unauthorized;
            else if(result.Item1 == 0 )
                return HttpStatusCode.BadRequest;
            else
            {
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.UtcNow.AddHours(24)
                };

                Response.Cookies.Append("AccessToken", result.Item2.AccessToken, cookieOptions);
                return HttpStatusCode.OK;
            }
        }

        [HttpGet("[action]")]
        public IActionResult GetEmployees(int CompanyId)
        {
            var result = _userServices.GetEmployees(CompanyId);

            if (result != null)
                return Ok(_mapper.Map<List<Common.ViewModels.EmployeesViewModel>>(result));
            else
                return BadRequest();
        }
    }
}
