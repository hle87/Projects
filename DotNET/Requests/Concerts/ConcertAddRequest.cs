using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Sabio.Models.Requests.Concerts
{
    public class ConcertAddRequest
    {
  //      @Name nvarchar(500)
		//,@Description nvarchar(500)
		//,@IsFree bit
  //      , @Address nvarchar(500)
		//,@Cost int
		//,@DateOfEvent datetime2(7)
		//,@Id int OUTPUT

		public string Name { get; set; }
        public string Description { get; set; }
        public bool IsFree { get; set; }
        public string Address { get; set; }
        public int Cost { get; set; }
        public DateTime DateOfEvent { get; set; }
    }
}
