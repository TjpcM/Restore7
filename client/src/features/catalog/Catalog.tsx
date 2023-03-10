import { Button } from "@mui/material";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";


/* interface Props{
  products:Product[];
  addProduct: () => void;
}
 */
export default function Catalog() {
  //const [products, setProducts] = useState<Product[]>([]);
  const products = useAppSelector(productSelectors.selectAll); //productSelectors is from createEntityAdapter<Product>()
  const {productsLoaded, status} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded,dispatch]);

  if (status.includes('pending')) return <LoadingComponent  message='Loading products...'/>
  return (
    <>
      <ProductList products={products}/>
      <Button variant="contained" >Add Product</Button>
    </>
  );
}

