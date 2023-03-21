using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController:BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context )
        {
            _context = context;
            
        }
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) return NotFound();

            return basket.MapBasketToDto();
        }


        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        { 
 
            //get the basket or create it
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null) basket = CreateBasket();
            //get product
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails{Title = "Product Not Found"});
            //add item to basket
            basket.AddItem(product, quantity);
            //save the changes
            var result = await _context.SaveChangesAsync() > 0;

           if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());
           // provide location header in response where to find the created resource

           return BadRequest(new ProblemDetails{Title="Problem saving item to basket"});
        }
//And the new resource is returned in the body of the message and its location, either being the URL

//of the request or the content of a location header.

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            //get the basket
             var  basket = await RetrieveBasket(GetBuyerId());
             if (basket == null) return NotFound();

            //remove the item or reduce quantity
             basket.RemoveItem(productId,  quantity);         
            //save the changes

            var result = await _context.SaveChangesAsync() > 0;
            if (result )  return Ok();

            return BadRequest(new ProblemDetails{Title= "Problem when removing item from the basket"});

        }
        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if(string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Baskets
                    .Include(i => i.Items)
                    .ThenInclude(p => p.Product)
                    .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }
        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }

        private Basket CreateBasket()
        {
           
            var buyerId = User.Identity?.Name;

            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            }

            var basket = new Basket{BuyerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }

    }
}