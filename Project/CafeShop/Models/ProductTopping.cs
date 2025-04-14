﻿using System;
using System.Collections.Generic;

namespace CafeShop.Models
{
    public partial class ProductTopping
    {
        public int Id { get; set; }
        public int? ToppingId { get; set; }
        public int? ProductId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? UpdatedBy { get; set; }
    }
}
