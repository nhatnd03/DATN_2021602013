using System.Collections.Generic;

namespace CafeShop.Models.ViewModels
{
    public class ShopViewModel
    {
        public List<ProductType> ProductTypes { get; set; }
        public List<ProductViewModel> Products { get; set; }
        public List<ProductSize> ProductSizes { get; set; }
    }

    public class ProductViewModel
    {
        public Product Product { get; set; }
        public List<ProductDetail> ProductDetails { get; set; }
        public List<Topping> AvailableToppings { get; set; }
        public List<ProductImage> ProductImages { get; set; }
        public List<ProductSize> AvailableSizes { get; set; }
        public List<ProductTopping> ProductToppings { get; set; }
    }
}