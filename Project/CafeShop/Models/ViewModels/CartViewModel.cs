using System.Collections.Generic;

namespace CafeShop.Models.ViewModels
{
    public class CartViewModel
    {
        public List<CartItemViewModel> CartItems { get; set; }
        public decimal SubTotal { get; set; }
        public decimal DeliveryFee { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
    }

    public class CartItemViewModel
    {
        public Cart CartItem { get; set; }
        public Product Product { get; set; }
        public ProductDetail ProductDetail { get; set; }
        public List<Topping> Toppings { get; set; }
        public decimal ItemTotal { get; set; }
    }
}