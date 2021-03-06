﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStoreAPI.BUS.Logic;
using BookStoreAPI.Helper;
using BookStoreAPI.Models;
using BookStoreAPI.Models.Objects;
using Microsoft.AspNetCore.Http;

namespace BookStoreAPI.BUS.Control
{
    public class LoginBAL
    {
        private AccountBAL accountBal;
        private UserBAL userBal;
        private CartBAL cartBal;
        private FaceBookAccountBAL faceBookAccountBal;

        public LoginBAL()
        {
            this.accountBal = new AccountBAL();
            this.userBal = new UserBAL();
            this.cartBal = new CartBAL();
            this.faceBookAccountBal = new FaceBookAccountBAL();
        }

        public async Task<Response> Login(string username, string password)
        {
            return await accountBal.Login(username, password);
        }

        public async Task<Response> LoginByGoogle(string email)
        {
            return await accountBal.CheckGoogleAccount(email);
        }

        public async Task<Response> Signup(User user)
        {
            user = await SettingFullFields(user);
            var checkAccount = await accountBal.CheckAccount(user.Account);
            if (checkAccount.Status is true)
            {
                var checkCreateUser = await this.userBal.Create(user);
                return checkCreateUser;
            }
            else
            {
                return checkAccount;
            }
        }

        public async Task<User> SettingFullFields(User user)
        {
            var nextID = int.Parse((await userBal.GetNextID()).Obj.ToString());
            user.Id = nextID;
            user.Account.Id = nextID;
            string salt = CryptographyHelper.CreateSalt(32);
            user.Account.Salt = salt;
            user.Account.Password = CryptographyHelper.GenerateHash(user.Account.Password, salt);
            user.Account.CreatedDateTime = DateTime.Now;
            user.Account.State = "Available";
            return await Task.FromResult<User>(user);
        }

        public async Task<User> SettingFielsFaceBook(User user)
        {
            var nextID = int.Parse((await userBal.GetNextID()).Obj.ToString());
            user.Id = nextID;
            user.FaceBookAccount.Id = nextID;
            return await Task.FromResult<User>(user);
        }

        public async Task<Response> LoginWithFaceBook(string facebookID)
        {
            return await faceBookAccountBal.CheckAccount(facebookID);
        }

        public async Task<Response> SignupWithFacebook(User user)
        {
            user = await SettingFielsFaceBook(user);
            return await this.userBal.Create(user);
        }

        public async Task<User> SettingFielsGoogle(User user)
        {
            var nextID = int.Parse((await userBal.GetNextID()).Obj.ToString());
            user.Id = nextID;
            return await Task.FromResult<User>(user);
        }

        public async Task<Response> SignupWithGoogle(User user)
        {
            user = await SettingFielsGoogle(user);
            return await this.userBal.Create(user);
        }
    }
}
