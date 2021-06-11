using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Eltemtek.ToDoList.Entity.Account.Auth
{
    public class TokenService
    {
        private readonly TokenOptions _tokenOptions;
        public TokenService(TokenOptions tokenOptions)
        {
            _tokenOptions = tokenOptions;
        }
        private IEnumerable<Claim> GetClaims(pToken args, List<string> audiences)
        {
            var claimList = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier,args.Id.ToString()),
                new Claim(ClaimTypes.Email,args.Email),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
            };

            claimList.AddRange(audiences.Select(x => new Claim(JwtRegisteredClaimNames.Aud, x)));

            return claimList;
        }

        public eToken CreateToken(pToken args)
        {

            var accessTokenExpiration = DateTime.Now.AddMinutes(_tokenOptions.AccessTokenExpiration);
            var refreshTokenExpiration = DateTime.Now.AddMinutes(_tokenOptions.RefreshTokenExpiration);
            var securityKey = GetSymmetricSecurityKey(_tokenOptions.SecurityKey);

            SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            JwtSecurityToken jwtSecurityToken = new JwtSecurityToken(
                issuer: _tokenOptions.Issuer,
                expires: accessTokenExpiration,
                notBefore: DateTime.Now,
                claims: GetClaims(args, _tokenOptions.Audience),
                signingCredentials: signingCredentials);

            var handler = new JwtSecurityTokenHandler();

            var token = handler.WriteToken(jwtSecurityToken);
            var tokenDto = new eToken
            {
                AccessToken = token,
                RefreshToken = CreateRefreshToken(),
                AccessTokenExpiration = accessTokenExpiration,
                RefreshTokenExpiration = refreshTokenExpiration
            };

            return tokenDto;

        }
        public eToken RevokeAccessToken()
        {
            var securityKey = GetSymmetricSecurityKey(_tokenOptions.SecurityKey);

            SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            JwtSecurityToken jwtSecurityToken = new JwtSecurityToken(
                issuer: _tokenOptions.Issuer,
                expires: DateTime.Now.AddSeconds(3),
                notBefore: DateTime.Now,
                claims: null,
                signingCredentials: signingCredentials);

            var handler = new JwtSecurityTokenHandler();

            var token = handler.WriteToken(jwtSecurityToken);
            var tokenDto = new eToken
            {
                AccessToken = token,
                AccessTokenExpiration = DateTime.Now.AddSeconds(3),
            };

            return tokenDto;
        }
        private string CreateRefreshToken()
        {
            var numberByte = new byte[32];
            using var rnd = RandomNumberGenerator.Create();
            rnd.GetBytes(numberByte);

            return Convert.ToBase64String(numberByte);
        }

        private SecurityKey GetSymmetricSecurityKey(string securityKey)
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
        }
    }
}
