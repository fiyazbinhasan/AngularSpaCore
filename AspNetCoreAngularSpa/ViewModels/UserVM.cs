using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreAngularSpa.ViewModels
{
    public class UserVM
    {
        public string Name { get; set; }
        public IFormFile Avatar { get; set; }
    }
}
