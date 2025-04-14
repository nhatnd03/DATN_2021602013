using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CafeShop.Models.ViewModels
{
    public class CheckoutViewModel
    {
        // Customer Information
        [Required(ErrorMessage = "Full name is required")]
        public string FullName { get; set; }
        
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }
        
        [Required(ErrorMessage = "Phone number is required")]
        public string PhoneNumber { get; set; }
        
        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; }
        
        public string City { get; set; }
        
        public string Country { get; set; }
        
        public string PostalCode { get; set; }
        
        public string Note { get; set; }
        
        // Payment Information
        [Required(ErrorMessage = "Payment method is required")]
        public string PaymentMethod { get; set; }
        
        // Order Summary
        public CartViewModel CartSummary { get; set; }
    }
}