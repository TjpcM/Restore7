import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import {  addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import BasketSummary from "./BasketSummary";

  
    const tableHead=[{title:'Product' ,alignment:'left'},
                     {title:'Price'   ,alignment:'right'},
                     {title:'Quantity',alignment:'center'},
                     {title:'Subtotal',alignment:'right'},
                     {title:''        ,alignment:'right'}]


                  
  /*                   
        {Object.entries(tableHead).map((cell,aligns) =><TableCell key={cell}  sx ={{aligns}}   >{cell}</TableCell>)}
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"> </TableCell>

    let tableHeadMap = new Map<string, string>([
      ["Product", "left"],
      ["Price", "Right"],
      ['Quantity','right'],
      ['Subtotal','right'],
      ['','center']
  ]);
          */

   export default function BasketPage() {
  //  const {basket,setBasket, removeItem} = useStoreContext();
  const {basket,status} = useAppSelector(state  => state.basket);
  const dispatch = useAppDispatch();
  
    if (!basket) return <Typography variant ='h3'>Your basket is empty</Typography>

    return(
      <>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} >
          
          <TableHead >
            <TableRow >
            {tableHead.map(({title, alignment}) => (<TableCell variant="head" key={title} sx={{alignItems:{alignment}}}  >{title}  </TableCell>))}
           </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map(item => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display='flex' alignItems='center'>
                    <img src={item.pictureUrl} alt={item.name} style={{height:20, marginRight:20}} />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{currencyFormat(item.price,'£')}</TableCell>
                <TableCell align="center">
                  <LoadingButton 
                    loading={status === 'pendingRemoveItem' + item.productId + 'rem'} 
                    onClick ={() => dispatch(removeBasketItemAsync({productId:item.productId,quantity:1, name:'rem'}))}  
                    color='error'
                    >
                    <Remove/>
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton 
                    loading={status === 'pendingAddItem' + item.productId } 
                    onClick ={() => dispatch(addBasketItemAsync({productId:item.productId, quantity: item.quantity}))}  
                    color='secondary'
                  >
                    <Add/>
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{currencyFormat((item.price * item.quantity),'£')}</TableCell>
                <TableCell align="right">
                  <LoadingButton 
                     loading={status === 'pendingRemoveItem' + item.productId + 'del'}
                     onClick ={() => dispatch(removeBasketItemAsync({productId:item.productId, quantity: item.quantity,name:'del'}))}  
                     color='error'
                  >
                    <Delete/>
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item  xs={6}/>
        <Grid item xs={6}>
           <BasketSummary />
           <Button
             component ={Link}
             to = '/checkout'
             variant = 'contained'
             size='large'
             fullWidth
           >
             Checkout
           </Button>
        </Grid>
      </Grid>
    </>
      
    )
}