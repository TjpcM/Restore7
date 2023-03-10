import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

const productAdapter = createEntityAdapter<Product>(); // this shape data and generates reducers and selectors to deal with this data

export const fetchProductsAsync = createAsyncThunk<Product[]>(
  'catalog/fetchProductsAsync',
  async (_, thunkAPI) =>{
    try {
        return await agent.Catalog.list();
    } catch (error:any) {
        return thunkAPI.rejectWithValue({error:error.data})
    }
  }
);

//thunkAPI allowas to catch the error and pass from inner function and trapp it to outter function 
export const fetchProductAsync = createAsyncThunk<Product, number>(
  'catalog/fetchProductAsync',
  async (productId, thunkAPI) =>{
    try {
        return await agent.Catalog.details(productId);
    } catch (error:any) {
        return thunkAPI.rejectWithValue({error: error.data })
    }
  }
)

export const catalogSlice = createSlice({
    name:'catalog',
    initialState: productAdapter.getInitialState({
        productsLoaded:false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers:(builder =>{
      builder.addCase(fetchProductsAsync.pending,(state) =>{
        state.status = 'pendingFetchProducts';
      });
      builder.addCase(fetchProductsAsync.fulfilled, (state, action) =>{
        productAdapter.setAll(state,action.payload);
        state.status = 'idle';
        state.productsLoaded = true;
      });
      builder.addCase(fetchProductsAsync.rejected, (state,action) => {
        console.log(action.payload);
        state.status = 'idle';
      });
      builder.addCase(fetchProductAsync.pending, (state) =>{
        state.status = 'pendingFetchProduct';
      });
      builder.addCase(fetchProductAsync.fulfilled, (state,action) =>{
        productAdapter.upsertOne(state, action.payload);
        state.status ='idle';
      });
      builder.addCase(fetchProductAsync.rejected, (state, action) =>{
        console.log(action);
        state.status = 'idle';
      });
    })
})

export const productSelectors = productAdapter.getSelectors((state:RootState) => state.catalog);