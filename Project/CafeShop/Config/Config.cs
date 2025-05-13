namespace CafeShop.Config
{
    public static class Config
    {
        private const string strUrlServer = @"https://localhost:7080/";
        public static string Connection()
        {
            string conn = @"Data Source=MSI;Initial Catalog=CafeShop;User ID=sa;Password=1;";
            return conn;
        }
        public static string getAPIkey()
        {
            string apikey = "sk-bcba55d7981d4466a646d08a49eb012b";
            return apikey;
        }
        public static string getAPIUrl()
        {
            string apiUrl = "https://api.deepseek.com/v1/chat/completions";
            return apiUrl;
        }

        public static string ImageUrl()
        {
            string imageUrl = strUrlServer;
            return imageUrl;
        }

        public static string ProductImageUrl()
        {
            string imageUrl = $"{strUrlServer}Images/Product/";
            return imageUrl;
        }

        public static string GoodsReceiptUrl()
        {
            string imageUrl = $"{strUrlServer}GoodsReceipt/";
            return imageUrl;
        }

        public static string GoodsIssuetUrl()
        {
            string imageUrl = $"{strUrlServer}GoodsIssues/";
            return imageUrl;
        }
    }
}
