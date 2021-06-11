using Eltemtek.ToDoList.Dal.Account;
using Eltemtek.ToDoList.Db.DataAccess;
using Eltemtek.ToDoList.Entity.Account;
using Eltemtek.ToDoList.Entity.Account.Auth;
using Eltemtek.ToDoList.Entity.Account.User;
using Eltemtek.ToDoList.Entity.Account.UserToken;
using Microsoft.Extensions.Configuration;
using System;

namespace Eltemtek.ToDoList.Bll.Account
{
    public class bUserToken:bCore
    {
        private readonly TokenService _tokenService;
        private readonly TokenOptions _tokenOptions;
        public bUserToken(IConfiguration configuration)
        {
            _tokenOptions = configuration.GetSection(TokenOptions.TokenOption).Get<TokenOptions>();
            _tokenService = new TokenService(_tokenOptions);
        }

        public rUserToken Get(pbUserToken args)
        {
            using (DbEntities db = new DbEntities())
            {
                var userTokenD = new dUserToken(db);

                try
                {
                    return userTokenD.Get(args);
                }
                catch (SystemException)
                {
                    return new rUserToken() { Error = true, Message ="Error"};
                }
            }
        }

        public rToken RevokeRefreshToken(pbUserToken args)
        {
            using (DbEntities db = new DbEntities())
            {
                try
                {
                    var userRefreshD = new dUserToken(db);
                    var existRefreshToken = userRefreshD.Get(new pbUserToken { RefreshToken = args.RefreshToken });

                    if (existRefreshToken == null)
                    {
                        return new rToken
                        {
                            Value = null,
                            Error = true,
                        };
                    }

                    userRefreshD.Delete(new pId { Id = existRefreshToken.Value.Id });

                    var token = _tokenService.RevokeAccessToken();
                    return new rToken
                    {
                        Value = new eToken
                        {
                            AccessToken = token.AccessToken,
                            AccessTokenExpiration = token.AccessTokenExpiration
                        },
                        Error = false,
                    };

                }
                catch (SystemException)
                {
                    return new rToken() { Error = true, Message = "Error"};
                }
            }
        }

        public rToken CreateTokenByRefreshToken(pbUserToken args)
        {
            using (DbEntities db = new DbEntities())
            {
                try
                {
                    var userRefreshD = new dUserToken(db);

                    var existRefreshToken = userRefreshD.Get(new pbUserToken { RefreshToken = args.RefreshToken });

                    if (existRefreshToken.Value == null)
                    {
                        return new rToken() { Error = true, Message = "Error" };
                    }

                    var userD = new dUser(db);

                    var userValue = userD.Get(new pbUser { Id = existRefreshToken.Value.UserId });

                    if (userValue.Value == null)
                    {
                        return new rToken() { Error = true, Message = "Error" };
                    }

                    var user = userValue.Value;

                    var token = _tokenService.CreateToken(
                       new pToken
                       {
                           Id = user.Id,
                           Email = user.Email,
                       });

                    var refreshToken = userRefreshD.Update(
                        new pUserToken
                        {
                            Id=userValue.Value.Id,
                            Userid = userValue.Value.UserId,
                            RefreshToken = token.RefreshToken,
                            RefreshTokenExpireDate = token.RefreshTokenExpiration
                        });

                    return new rToken
                    {
                        Value = new eToken
                        {
                            UserName = user.Name,
                            AccessToken = token.AccessToken,
                            AccessTokenExpiration = token.AccessTokenExpiration,
                            RefreshToken = token.RefreshToken,
                            RefreshTokenExpiration = token.RefreshTokenExpiration
                        }
                    };

                }
                catch (SystemException)
                {
                    return new rToken() { Error = true, Message = "Error" };
                }
            }
        }

        public rToken Login(pUser args)
        {
            using (DbEntities db = new DbEntities())
            {
                try
                {
                    var userD = new dUser(db);
                    var userValue = userD.Login(args);
                    if (userValue == null)
                    {
                        return new rToken() { Error = true, Message = "Error" };
                    }

                    var user = userValue.Value;

                    var token = _tokenService.CreateToken(
                        new pToken
                        {
                            Id = user.Id,
                            Email = user.Email
                        });

                    var userRefreshD = new dUserToken(db);

                    var userRefreshToken = userRefreshD.Get(new pbUserToken { Userid = user.Id });

                    if (userRefreshToken.Value == null)
                    {
                        var addedRefreshToken = userRefreshD.Add(
                            new pUserToken
                            {
                                Userid = user.Id,
                                RefreshToken = token.RefreshToken,
                                RefreshTokenExpireDate = token.RefreshTokenExpiration
                            });

                        return new rToken
                        {
                            Value = new eToken
                            {
                                //UserName = user.Name,
                                AccessToken = token.AccessToken,
                                AccessTokenExpiration = token.AccessTokenExpiration,
                                RefreshToken = token.RefreshToken,
                                RefreshTokenExpiration = token.RefreshTokenExpiration
                            }
                        };
                    }
                    else
                    {
                        var updatedRefreshToken = userRefreshD.Update(
                            new pUserToken
                            {
                                Id = userRefreshToken.Value.Id,
                                Userid = userRefreshToken.Value.UserId,
                                RefreshToken = token.RefreshToken,
                                RefreshTokenExpireDate = token.RefreshTokenExpiration
                            });

                        var rToken = updatedRefreshToken.Value;
                        return new rToken
                        {
                            Value = new eToken
                            {
                                //UserName = user.Name,
                                AccessToken = token.AccessToken,
                                AccessTokenExpiration = token.AccessTokenExpiration,
                                RefreshToken = token.RefreshToken,
                                RefreshTokenExpiration = token.RefreshTokenExpiration
                            }
                        };
                    }
                }
                catch (SystemException)
                {
                    return new rToken() { Error = true, Message = "Error" };
                }
            }
        }

        public rUserToken Add(pUserToken args)
        {
            using (DbEntities db = new DbEntities())
            {
                var userTokenD = new dUserToken(db);

                try
                {
                    return userTokenD.Add(args);
                }
                catch (SystemException)
                {
                    return new rUserToken() { Error = true, Message = "Error" };
                }
            }
        }

        public rUserToken Update(pUserToken args)
        {
            using (DbEntities db = new DbEntities())
            {
                var userTokenD = new dUserToken(db);

                try
                {
                    return userTokenD.Update(args);
                }
                catch (SystemException)
                {
                    return new rUserToken() { Error = true, Message = "Error" };
                }
            }
        }

        public rUserToken Save(pUserToken args)
        {
            using (DbEntities db = new DbEntities())
            {
                var userTokenD = new dUserToken(db);

                try
                {
                    return userTokenD.Save(args);
                }
                catch (SystemException)
                {
                    return new rUserToken() { Error = true, Message = "Error" };
                }
            }
        }

        public rCore Delete(pId args)
        {
            using (DbEntities db = new DbEntities())
            {
                var userTokenD = new dUserToken(db);

                try
                {
                    return userTokenD.Delete(args);
                }
                catch (SystemException)
                {
                    return null;
                }
            }
        }

        public rListUserToken List(pListUserToken args)
        {
            using (DbEntities db = new DbEntities())
            {
                var userTokenD = new dUserToken(db);

                try
                {
                    return userTokenD.List(args);
                }
                catch (SystemException)
                {
                    return new rListUserToken() { Error = true, Message = "Error"};
                }
            }
        }


    }
}
