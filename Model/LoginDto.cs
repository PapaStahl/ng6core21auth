using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace ngtemplate.Model
{
    public class LoginDto
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }

        [JsonProperty("rememberMe")]
        public bool RememberMe { get; set; }
    }
}
