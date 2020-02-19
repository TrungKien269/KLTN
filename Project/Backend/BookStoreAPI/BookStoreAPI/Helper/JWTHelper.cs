using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace BookStoreAPI.Helper
{
    public class JWTHelper
    {
        public static string CreateUserToken()
        {
            string securityKey = SettingHelper.GetConfig().GetSection("JwtSigningSecret").Value;
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, "User"));
            var token = new JwtSecurityToken(
                issuer: "books.sell",
                audience: "readers",
                expires: DateTime.Now.AddHours(int.Parse(SettingHelper.GetConfig().GetSection("ExpireTime").Value)),
                signingCredentials: signingCredentials
                , claims: claims
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string CreateAdminToken()
        {
            string securityKey = SettingHelper.GetConfig().GetSection("JwtSigningSecret").Value;
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, "Administrator"));
            var token = new JwtSecurityToken(
                issuer: "books.sell",
                audience: "readers",
                expires: DateTime.Now.AddHours(int.Parse(SettingHelper.GetConfig().GetSection("ExpireTime").Value)),
                signingCredentials: signingCredentials
                , claims: claims
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
