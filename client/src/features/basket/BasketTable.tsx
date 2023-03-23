import { Remove, Add, Delete } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material"
import { BasketItem } from "../../app/models/basket"
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore"
import { currencyFormat } from "../../app/util/util"
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice"


interface Props {
    items:BasketItem[];
    isBasket?:boolean;
}
/*
const tableHead=[{title:'Product' ,alignment:'left'},
{title:'Price'   ,alignment:'right'},
{title:'Quantity',alignment:'center'},
{title:'Subtotal',alignment:'right'},
{title:''        ,alignment:'right'}]

{tableHead.map(({title, alignment}) => (<TableCell variant="head" key={title} sx={{alignItems:{alignment}}}  >{title}  </TableCell>))}

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

export default function BasketTable({items, isBasket=true}:Props){
    const {status} = useAppSelector(state  => state.basket);
    const dispatch = useAppDispatch();
        return (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  {isBasket &&
                    <TableCell align="right"> </TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow
                    key={item.productId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box display="flex" alignItems="center">
                        <img
                          src={item.pictureUrl}
                          alt={item.name}
                          style={{ height: 20, marginRight: 20 }}
                        />
                        <span>{item.name}</span>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {currencyFormat(item.price, "£")}
                    </TableCell>
                    <TableCell align="center">
                    {isBasket &&
                      <LoadingButton
                        loading={
                          status ===
                          "pendingRemoveItem" + item.productId + "rem"
                        }
                        onClick={() =>
                          dispatch(
                            removeBasketItemAsync({
                              productId: item.productId,
                              quantity: 1,
                              name: "rem",
                            })
                          )
                        }
                        color="error"
                      >
                        <Remove />
                      </LoadingButton>}
                      {item.quantity}
                      {isBasket &&
                      <LoadingButton
                        loading={status === "pendingAddItem" + item.productId}
                        onClick={() =>
                          dispatch(
                            addBasketItemAsync({
                              productId: item.productId,
                              quantity: item.quantity,
                            })
                          )
                        }
                        color="secondary"
                      >
                        <Add />
                      </LoadingButton>}
                    </TableCell>
                    <TableCell align="right">
                      {currencyFormat(item.price * item.quantity, "£")}
                    </TableCell>
                    {isBasket &&
                    <TableCell align="right">
                      <LoadingButton
                        loading={
                          status ===
                          "pendingRemoveItem" + item.productId + "del"
                        }
                        onClick={() =>
                          dispatch(
                            removeBasketItemAsync({
                              productId: item.productId,
                              quantity: item.quantity,
                              name: "del",
                            })
                          )
                        }
                        color="error"
                      >
                        <Delete />
                      </LoadingButton>
                    </TableCell>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
}