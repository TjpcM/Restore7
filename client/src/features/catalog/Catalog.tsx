import { List } from "@mui/icons-material";
import { Avatar, Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useState, useEffect } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";


/* interface Props{
  products:Product[];
  addProduct: () => void;
}
 */
export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  
  return (
    <>
      <ProductList products={products}/>
      <Button variant="contained" >Add Product</Button>
    </>
  );
}

