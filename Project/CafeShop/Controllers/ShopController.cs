﻿using CafeShop.Models;
using CafeShop.Models.DTOs;
using CafeShop.Config;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using System.Diagnostics.CodeAnalysis;
using CafeShop.Repository;
using API.Config;

namespace CafeShop.Controllers
{
    public class ShopController : Controller
    {
        public AccountRepository _accRepo = new AccountRepository();
        public ProductTypeRepository _prType = new ProductTypeRepository();
        public ProductRepository _prRepo = new ProductRepository();
        public ProductImageRepository _prImg = new ProductImageRepository();
        public ProductDetailsRepository _prDt = new ProductDetailsRepository();

        public IActionResult Index()
        {
            Account acc = _accRepo.GetByID(HttpContext.Session.GetInt32("AccountId") ?? 0) ?? new Account();
            ViewBag.Account = acc;
            return View("Index1");
        }
        public JsonResult GetAllProductType()
        {
            List<ProductType> Coffe = SQLHelper<ProductType>.SqlToList("SELECT * FROM ProductType WHERE GroupTypeID = 1");
            List<ProductType> MilkTea = SQLHelper<ProductType>.SqlToList("SELECT * FROM ProductType WHERE ID = 2");
            List<ProductType> greenTea = SQLHelper<ProductType>.SqlToList("SELECT * FROM ProductType WHERE ID = 3");
            List<ProductType> Prosty = SQLHelper<ProductType>.SqlToList("SELECT * FROM ProductType WHERE ID = 6");
            List<ProductType> Snack = SQLHelper<ProductType>.SqlToList("SELECT * FROM ProductType WHERE ID = 8");

            return Json(new { Coffe, MilkTea, greenTea, Prosty, Snack });
        }
        public JsonResult GetALlProduct(int typeId = 0, string request = "", int pageNumber = 1)
        {
            List<ProductDto> data = SQLHelper<ProductDto>.ProcedureToList("spGetAllProductClient", new string[] { "@typeId", "@Request", "@PageNumber" }, new object[] { typeId, request, pageNumber });
            PaginationDto total = SQLHelper<PaginationDto>.ProcedureToModel("spGetAllTotalProductClient", new string[] { "@typeId", "@Request" }, new object[] { typeId, request });
            return Json(new { status = 1, message = "", result = new { data , total } });

        }

        public IActionResult IndexDetails(int prId)
        {
            Account acc = _accRepo.GetByID(HttpContext.Session.GetInt32("AccountId") ?? 0) ?? new Account();
            ViewBag.Account = acc;

            ViewBag.Product = _prRepo.GetByID(prId);

            List<ProductImage> lstImg = SQLHelper<ProductImage>.SqlToList($"select * from ProductImage where ProductID = {prId}");
            foreach (ProductImage img in lstImg)
            {
                img.ImageUrl = Config.Config.ProductImageUrl() + img.ImageUrl;
            }
            ViewBag.Avatar = lstImg[0];
            ViewBag.Image = lstImg;

            List<ProductSizeDto> lstSize = SQLHelper<ProductSizeDto>.ProcedureToList("spGetProductSizeById", new string[] { "@ProductId" }, new object[] { prId });
            ViewBag.ProductSize = lstSize;
            ViewBag.PriceDefault = Convert.ToInt32(lstSize[0].Price).ToString("N0");

            List<Topping> lstTopping = SQLHelper<Topping>.SqlToList($"SELECT t.* FROM dbo.ProductTopping AS pt LEFT JOIN dbo.Topping AS t ON pt.ToppingID = t.ID WHERE ProductID = {prId}");
            ViewBag.Topping = lstTopping;

            List<ProductDto> lst = SQLHelper<ProductDto>.ProcedureToList("spGetAllProductClient", new string[] { "@typeId", "@Request", "@PageNumber" }, new object[] { ViewBag.Product.ProductTypeId, "", 1 });
            ViewBag.ProductRelated = lst.Where(p => p.Id != ViewBag.Product.Id);
            return View();
        }
    }
}
