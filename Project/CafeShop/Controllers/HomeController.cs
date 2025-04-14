﻿using CafeShop.Models;
using CafeShop.Models.DTOs;
using CafeShop.Config;
using Microsoft.AspNetCore.Mvc;
using CafeShop.Config;
using System.Diagnostics;
using CafeShop.Repository;

namespace CafeShop.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public ProductRepository _productRepo = new ProductRepository();
        public ProductTypeRepository _productTypeRepo = new ProductTypeRepository();
        public AccountRepository _accRepo = new AccountRepository();

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            Account acc = _accRepo.GetByID(HttpContext.Session.GetInt32("AccountId") ?? 0) ?? new Account();
            ViewBag.Account = acc;

            DateTime currentDate = DateTime.Now;
            DateTime dateLastMonth = currentDate.AddDays(-360);
            DateTime dateStart = new DateTime(dateLastMonth.Year,dateLastMonth.Month, dateLastMonth.Day, 0,0,0);
            DateTime dateEnd = new DateTime(currentDate.Year, currentDate.Month, currentDate.Day, 23, 59, 59);
            List<ProductDto> data = SQLHelper<ProductDto>.ProcedureToList("spGetTop4BestSale", new string[] { "@topSale", "@DateStart", "@DateEnd" }, new object[] {4, dateStart, dateEnd });
            ViewBag.TopSeller = data;
            List<ProductDto> lst = SQLHelper<ProductDto>.ProcedureToList("spGetTop4ProductNew", new string[] { }, new object[] { });
            ViewBag.TopNew = lst;

            List<ProductType> lstProductType = _productTypeRepo.GetAll().Take(3).ToList();
            ViewBag.ProductType = lstProductType;
            List<ProductDto> lstProduct1 = SQLHelper<ProductDto>.ProcedureToList("spGetTop3ProductByProductTypeID", new string[] { "@ProductTypeID" }, new object[] { 5 });
            List<ProductDto> lstProduct2 = SQLHelper<ProductDto>.ProcedureToList("spGetTop3ProductByProductTypeID", new string[] { "@ProductTypeID" }, new object[] { 4 });
            List<ProductDto> lstProduct3 = SQLHelper<ProductDto>.ProcedureToList("spGetTop3ProductByProductTypeID", new string[] { "@ProductTypeID" }, new object[] { 2 });
            ViewBag.lstProduct1 = lstProduct1;
            ViewBag.lstProduct2 = lstProduct2;
            ViewBag.lstProduct3 = lstProduct3;
            return View("Index1");

        }
        [HttpGet]
        public IActionResult Privacy()
        {
            HttpContext.Session.Remove("AccountId");
            HttpContext.Session.Remove("AccountRole");
            HttpContext.Session.Remove("FullName");
            HttpContext.Session.Clear();

            return View();
        }

        //[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        //public IActionResult Error()
        //{
        //    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        //}

        [HttpPost]        
        public IActionResult Privacy(string Email = "", string PassWord = "")
        {
            string passwordHash = MaHoaMD5.EncryptPassword(PassWord);
            Account acc =_accRepo.GetAll().FirstOrDefault(x=>x.Email.ToLower() == Email.ToLower() && x.Password == passwordHash && x.IsDelete == false) ?? new Account();
            if (acc.Id <= 0)
            {
                ViewBag.Error = "Tài khoản hoặc mật khẩu không chính xác!";
                return View();
            }
            if (acc.IsActive == 0)
            {
                ViewBag.Error = "Tài khoản đã bị khóa! Không thể đăng nhập!";
                return View();
            }
            HttpContext.Session.SetInt32("AccountId", acc.Id);
            HttpContext.Session.SetInt32("AccountRole", acc.Role);
            HttpContext.Session.SetString("FullName", acc.FullName ?? "");
            if(acc.Role > 1)
            {
               return RedirectToAction("Index", "Admin");
            }
            else return  RedirectToAction("Index", "Home");
        }
    }
}
