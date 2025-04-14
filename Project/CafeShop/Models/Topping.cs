﻿using System;
using System.Collections.Generic;

namespace CafeShop.Models
{
    public partial class Topping
    {
        public int Id { get; set; }
        public string? ToppingCode { get; set; }
        public string? ToppingName { get; set; }
        public decimal? ToppingPrice { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        public bool IsDelete { get; set; }
    }
}
