using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.EntityFrameworkCore;

namespace BookStoreAPI.BUS.Logic
{
    public class AccountBAL
    {
        private BookStoreContext context;

        public AccountBAL()
        {
            this.context = new BookStoreContext();
        }

        public async Task<Response> Login(string username, string password)
        {
            try
            {
                var account = await context.Account
                    .Where(x => x.Username.Equals(username) || x.Email.Equals(username))
                    .FirstOrDefaultAsync();
                if (account != null)
                {
                    var check = await Task.FromResult<bool>(CryptographyHelper.AreEqual(password, account.Password,
                        account.Salt));
                    if (check)
                    {
                        return new Response("Success", true, 1, account);
                    }
                }
                return new Response("Username or Password was wrong!", false, 0, null);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> LoginByGoogle(string email)
        {
            try
            {
                var account = await context.Account
                    .Where(x => x.Email.Equals(email)).FirstOrDefaultAsync();
                if (account is null)
                {
                    return new Response("This email has not been used in this system", false, 0, null);
                }
                else
                {
                    return new Response("Success", true, 1, account);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> SetCookie(string cookie, Account account)
        {
            try
            {
                account.Cookie = cookie;
                context.Account.Update(account);
                var check = await context.SaveChangesAsync();
                if (check == 1)
                {
                    return new Response("Success", true, 1, 1);
                }
                else
                {
                    return new Response("Fail", false, 0, 0);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetAccountByCookie(string cookie)
        {
            try
            {
                var account = await context.Account.Include(x => x.IdNavigation).Where(x => x.Cookie.Equals(cookie))
                    .FirstOrDefaultAsync();
                if (account is null)
                {
                    return new Response("Not found", false, 0, null);
                }
                else
                {
                    return new Response("Success", true, 1, account);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetAccount(int userID)
        {
            try
            {
                var account = await context.Account.Where(x => x.Id.Equals(userID))
                    .FirstOrDefaultAsync();
                if (account is null)
                {
                    return new Response("Not found", false, 0, null);
                }
                else
                {
                    return new Response("Success", true, 1, account);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> CheckAccount(Account account)
        {
            try
            {
                var username = await context.Account.Where(x => x.Username.Equals(account.Username))
                    .FirstOrDefaultAsync();
                if (username is null)
                {
                    var email = await context.Account.Where(x => x.Email.Equals(account.Email))
                        .FirstOrDefaultAsync();
                    if (email != null)
                    {
                        return new Response("This email has already been used!", false, 0, null);
                    }
                    return new Response("Success", true, 1, null);
                }
                else
                {
                    return new Response("This username has already been used!", false, 0, null);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> Create(Account account)
        {
            await context.Account.AddAsync(account);
            var check = await context.SaveChangesAsync();
            if (check is 1)
            {
                return new Response("Success", true, 1, account);
            }
            else
            {
                return new Response("Can not create this account", false, 0, null);
            }
        }

        public async Task<Response> CheckCurrentPassword(Account account, string password)
        {
            var check = await Task.FromResult<bool>(CryptographyHelper.AreEqual(password, account.Password,
                account.Salt));
            if (check)
            {
                return new Response("Success", true, 1, null);
            }
            else
            {
                return new Response("This password was wrong!", false, 0, null);
            }
        }

        public async Task<Response> ChangePassword(Account account, string password)
        {
            try
            {
                account.Password = CryptographyHelper.GenerateHash(password, account.Salt);
                context.Account.Update(account);
                await context.SaveChangesAsync();
                return new Response("Success", true, 1, account.Password);
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }

        public async Task<Response> GetAccountByEmail(string email)
        {
            try
            {
                var account = await context.Account.Where(x => x.Email.Equals(email)).FirstOrDefaultAsync();
                if (account is null)
                {
                    return new Response("This email is not correctly!", false, 0, null);
                }
                else
                {
                    return new Response("Success", true, 1, account);
                }
            }
            catch (Exception e)
            {
                return Response.CatchError(e.Message);
            }
        }
    }
}
