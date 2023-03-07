using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]  // using System.ComponentModel.DataAnnotations.Schema; This give a table a new name diff from the class name
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        // Navigation properties
        public int ProductId { get; set; }
        public Product Product { get; set; }
        //to fully dependency 
        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}