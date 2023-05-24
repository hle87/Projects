using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Friends
{
    public class FriendAddRequest
    {
        //   @Title nvarchar(50)
        //      ,@Bio nvarchar(50)
        //      ,@Summary nvarchar(128)
        //      ,@Headline nvarchar(50)
        //      ,@Slug nvarchar(50)
        //      ,@StatusId int
        //      ,@PrimaryImageUrl nvarchar(128)
        //,@UserId int
        //,@Id int OUTPUT
        //public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Bio { get; set; }
        [Required]
        public string Summary { get; set; }
        [Required]
        public string Headline { get; set; }
        [Required]
        public string Slug { get; set; }
        [Required]
        [Range(1, 9000000)]
        public int StatusId { get; set; }
        [Required]
        public string PrimaryImageUrl { get; set; }
        //public int UserId { get; set; }
    }
}
