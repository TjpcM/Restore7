import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
interface Props{
    products:Product[];
}

//spacing 1 = 8 pixel, xs -> how much x in 12 columns : x/12
export default function ProductList({products}:Props){
    return(
        <Grid container spacing={4}>
        {products.map(product => (
            <Grid item xs={3} key={product.id}>
              <ProductCard  product={product} />
            </Grid>
         ))}
      </Grid>
    )
}