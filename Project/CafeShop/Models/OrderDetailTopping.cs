using System;
using System.ComponentModel.DataAnnotations;

namespace CafeShop.Models
{
    public class OrderDetailTopping
    {
        public int ID { get; set; }
        
        public int OrderDetailId { get; set; }
        
        public int ToppingId { get; set; }
        
        public decimal Price { get; set; }
        
        public DateTime? CreatedDate { get; set; }
        
        public string CreatedBy { get; set; }
        
        public DateTime? UpdatedDate { get; set; }
        
        public string UpdatedBy { get; set; }
        
        public bool IsDelete { get; set; }
    }
}