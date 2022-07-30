using Common.Models;
using DOMAIN.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


namespace Common.Helpers
{
    public class TokenHandler
    {
        public IConfiguration Configuration { get; set; }
        public TokenHandler(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public Token CreateAccessToken(User user)
        {
            List<string> roles = new List<string>();

            foreach (var item in user.UserRoles)
            {
                roles.Add(item.Role.Name);
            }

            Token tokenInstance = new Token();

            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Token:SecurityKey"]));

            SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            tokenInstance.Expiration = DateTime.Now.AddDays(1);

            JwtSecurityToken securityToken = new JwtSecurityToken(issuer: Configuration["Token:Issuer"], audience: Configuration["Token:Audience"], expires: tokenInstance.Expiration, notBefore: DateTime.Now, signingCredentials: signingCredentials);


            securityToken.Payload["isAuthenticated"] = true;
            securityToken.Payload["name"] = user.Name;
            securityToken.Payload["roles"] = roles;
            securityToken.Payload["mail"] = user.Email;
            securityToken.Payload["companyId"] = user.Companies == null?"": user.Companies.Id;
            securityToken.Payload["userId"] = user.Id;


            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            tokenInstance.AccessToken = tokenHandler.WriteToken(securityToken);

            tokenInstance.AccessToken = tokenInstance.AccessToken;

            tokenInstance.RefreshToken = CreateRefreshToken();

            return tokenInstance;
        }

        public string CreateRefreshToken()
        {
            byte[] number = new byte[32];
            using (RandomNumberGenerator random = RandomNumberGenerator.Create())
            {
                random.GetBytes(number);
                return Convert.ToBase64String(number);
            }
        }

        public Token CreateEmailConfirmToken()
        {
            //List<Claim> claims = new List<Claim>();

            //claims.Add(new Claim(ClaimTypes.Role, "api"));

            List<string> roles = new List<string>();

            
             roles.Add("api");
            

            Token tokenInstance = new Token();

            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Token:SecurityKey"]));

            SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            tokenInstance.Expiration = DateTime.Now.AddMinutes(1);

            JwtSecurityToken securityToken = new JwtSecurityToken(issuer: Configuration["Token:Issuer"], audience: Configuration["Token:Audience"], expires: tokenInstance.Expiration, notBefore: DateTime.Now, signingCredentials: signingCredentials);


            securityToken.Payload["roles"] = roles;


            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            tokenInstance.ConfirmToken = tokenHandler.WriteToken(securityToken);

            tokenInstance.ConfirmToken = tokenInstance.ConfirmToken;

            return tokenInstance;
        }
    }
}
