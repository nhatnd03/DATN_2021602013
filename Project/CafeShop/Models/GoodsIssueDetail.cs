﻿using System;
using System.Collections.Generic;

namespace CafeShop.Models
{
    public partial class GoodsIssueDetail
    {
        public int Id { get; set; }
        public int? GoodIssueId { get; set; }
        public int? MaterialId { get; set; }
        public decimal? Quantity { get; set; }
        public string? Decription { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? UpdatedBy { get; set; }
        public bool? IsDelete { get; set; }
    }
}
