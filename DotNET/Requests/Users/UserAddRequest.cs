using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.Users
{
    public class UserAddRequest
    {
        //   @FirstName nvarchar(50)
        //      ,@LastName nvarchar(50)
        //      ,@Email nvarchar(50)
        //,@Password nvarchar(50)
        //      ,@AvatarUrl nvarchar(50)
        //      ,@TenantId nvarchar(50)

        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        
        [Required]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string PasswordConfirm { get; set; } //check Sql DB Proc
        [Required]
        public string AvatarUrl { get; set; }
        [Required]
        public string TenantId { get; set; }

    }
}
