using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.Addresses
{
    public class AddressAddRequest
    {
        [Required]
        [StringLength(100,MinimumLength = 2 )]
        public string LineOne { get; set; }
        [Required]
        [Range(1,900000)]
        public int SuiteNumber { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public bool IsActive { get; set; }
        [Required]
        [Range(-90, 90)]
        public double Lat { get; set; }
        [Required]
        [Range(-180, 180)]
        public double Long { get; set; }
    }
}
