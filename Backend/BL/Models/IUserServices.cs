using Common.Models;
using Common.ViewModels;
using DOMAIN.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public interface IUserServices
    {
        int AddUser(DOMAIN.Models.User user);
        int ConfirmEmail(Common.DTO.ConfirmEmailDTO confirmEmailDTO);
        Tuple<int, Token> UserLogin(Common.DTO.UserLoginDTO userLoginDTO, IConfiguration configuration);
        List<User> GetEmployees(int CompanyId);
    }
}
