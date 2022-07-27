using BL.Models;
using Common.DTO;
using Common.Helpers;
using Common.Models;
using Common.ViewModels;
using DAL.Models;
using DOMAIN.Context;
using DOMAIN.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace BL.Concrete
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository _UserRepository;
        private readonly SqlDbContext _context;
        private readonly Sha1Hash _sha;
        public UserServices(IUserRepository UserRepository)
        {
            _UserRepository = UserRepository;
            _context = new SqlDbContext();
            _sha = new Sha1Hash();
        }

        public int AddUser(DOMAIN.Models.User user)
        {
            Regex regex = new Regex(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$");

            if (regex.IsMatch(user.Password))
                return 0;
            else if (_context.Users.Any(u => u.Email == user.Email))
                return 0;
            else
                return _UserRepository.Add(user);
        }
    
        public int ConfirmEmail(ConfirmEmailDTO confirmEmailDTO)
        {
            if (!string.IsNullOrEmpty(confirmEmailDTO.uid) && !string.IsNullOrEmpty(confirmEmailDTO.code))
            {
                var user = _context.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).FirstOrDefault(x => x.Id == Convert.ToInt32(confirmEmailDTO.uid));

                if (user != null && confirmEmailDTO.code == user.ConfirmEmailToken && user.IsConfirmEmail == false)
                {
                    user.IsConfirmEmail = true;
                    return _UserRepository.Update(user);
                }
            }
            return 0;
        }

        public Tuple<int, Token> UserLogin(UserLoginDTO userLoginDTO, IConfiguration configuration)
        {
            if (!_context.Users.Any(x => x.Email == userLoginDTO.Email && x.Password == _sha.Encrypt(userLoginDTO.Password)))
                return new Tuple<int, Token>(403, null);
            else if (_context.Users.Any(x => x.Email == userLoginDTO.Email && x.Password == _sha.Encrypt(userLoginDTO.Password) && x.IsConfirmEmail == false))
                return new Tuple<int, Token>(401, null);
            else
            {
                User user = _context.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role).Include(x=>x.Companies).FirstOrDefault(x => x.Email == userLoginDTO.Email && x.Password == _sha.Encrypt(userLoginDTO.Password) && x.IsConfirmEmail == true);

                    if (user != null)
                    {
                        TokenHandler tokenHandler = new TokenHandler(configuration);
                        Token token = tokenHandler.CreateAccessToken(user);
                        user.RefreshToken = token.RefreshToken;
                        user.RefrestTokenEndDate = token.Expiration.AddMinutes(3);

                        return new Tuple<int, Token>(_UserRepository.Update(user),token);
                    }
                return new Tuple<int, Token>(0, null);
            }
               
        }
    
        public List<User> GetEmployees(int CompanyId)
        {
            if (_context.Companies.Any(x => x.Id == CompanyId))
                return _UserRepository.GetEmployees(CompanyId);
            else
                return null;
        }
    }
}
