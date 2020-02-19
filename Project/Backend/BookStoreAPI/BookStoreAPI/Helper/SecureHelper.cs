using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.DependencyInjection;

namespace BookStoreAPI.Helper
{
    public class SecureHelper
    {
        private static ProtectRepository protect = new ProtectRepository();

        public static string GetSecureOutput(string input)
        {
            return protect.SecureOutput(input);
        }

        public static string GetOriginalInput(string secureInput)
        {
            return protect.OriginalInput(secureInput);
        }
    }

    public class ProtectRepository
    {
        private ServiceCollection service;
        private IServiceProvider serviceProtect;
        private ProtectClass instance;

        public ProtectRepository()
        {
            service = new ServiceCollection();
            service.AddDataProtection();
            serviceProtect = service.BuildServiceProvider();
            instance = ActivatorUtilities.CreateInstance<ProtectClass>(serviceProtect);
        }

        public string SecureOutput(string input)
        {
            return instance.GetSecureOutput(input);
        }

        public string OriginalInput(string secureInput)
        {
            return instance.GetOriginalInput(secureInput);
        }
    }

    public class ProtectClass
    {
        IDataProtector iPro;

        public ProtectClass(IDataProtectionProvider provider)
        {
            iPro = provider.CreateProtector("SecureHelper");
        }

        public string GetSecureOutput(string input)
        {
            return iPro.Protect(input);
        }

        public string GetOriginalInput(string secureInput)
        {
            return iPro.Unprotect(secureInput);
        }
    }
}
