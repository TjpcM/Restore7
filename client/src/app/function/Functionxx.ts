import { useEffect, useState } from "react";
import { Product } from "../models/product";

export function addProduct0() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      fetch("http://localhost:5000/api/products")
        .then((response) => response.json())
        .then((data) => setProducts(data));
    }, []);
  
    setProducts([
      ...products,
      {
        id: 1,
        name: "product3",
        price: 300.0,
        brand: "some brand",
        description: "some description",
        pictureUrl: "http://picsum.photos/200",
      },
    ]);
  }
 export function addProduct() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      fetch("http://localhost:5000/api/products")
        .then((response) => response.json())
        .then((data) => setProducts(data));
    }, []);
  
    setProducts((prevState:Product[]) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: "product" + (prevState.length + 1),
        price: 300,
        brand: "some brand",
        description: "some description",
        pictureUrl: "http://picsum.photos/200"
      },
    ]);
  }
