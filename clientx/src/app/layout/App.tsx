import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import { Product } from "../models/product";

//class vs functional component
function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function addProduct0() {
    setProducts([
      ...products,
      {
        id: 1,
        name: 'product3',
        price: 300.0,
        brand: 'some brand',
        description: 'some description',
        pictureUrl: 'http://picsum.photos/200',
      },
    ]);
  }
  function addProduct() {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: 'product' + (prevState.length + 1),
        price: 300,
        brand: 'some brand',
        description: 'some description',
        pictureUrl: 'http://picsum.photos/200'
      },
    ]);
  }

  return (
    <>
      <Header/>
      <br></br>
      <Catalog products={products} addProduct={addProduct} />
    </>
  );
}

export default App;
