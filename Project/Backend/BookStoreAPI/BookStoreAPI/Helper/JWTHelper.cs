﻿using System;
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
        public static string securityKey = SettingHelper.GetConfig().GetSection("JwtSigningSecret").Value;

        public static string CreateUserToken()
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, "User"));
            var token = new JwtSecurityToken(
                issuer: "books.sell",
                audience: "readers",
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddHours(int.Parse(SettingHelper.GetConfig().GetSection("ExpireTime").Value)),
                signingCredentials: signingCredentials
                , claims: claims
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string CreateAdminToken()
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, "Administrator"));
            var token = new JwtSecurityToken(
                issuer: "books.sell",
                audience: "readers",
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddHours(int.Parse(SettingHelper.GetConfig().GetSection("ExpireTime").Value)),
                signingCredentials: signingCredentials
                , claims: claims
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string CreateTemporaryToken()
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, "Temporary"));
            var token = new JwtSecurityToken(
                issuer: "books.sell",
                audience: "readers",
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(5),
                signingCredentials: signingCredentials
                , claims: claims
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static bool ValidateToken(string token)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = "books.sell",
                    ValidAudience = "readers",
                    IssuerSigningKey = symmetricSecurityKey,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
