import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProducts = createAsyncThunk("products/fetchProducts",async()=>{
    const result = await axios.get("https://dummyjson.com/products")

    localStorage.setItem("allProducts",JSON.stringify(result.data.products))
    
    return result.data.products
    //products is the array we need

})

const productSlice= createSlice({
    name:"products",
    initialState:{
        allproducts:[],
        allproductsDummy:[],
        loading:false,
        error:""
    },
    reducers:{
        searchProduct:(state,action)=>{
            state.allproducts = state.allproductsDummy.filter(item=>item.title.toLowerCase().includes(action.payload))
        }
        

    },
    // to handle async operartions(just for this project) as reducer cant handle asynchronous one
    //mainly used for api call

    extraReducers:(builder)=>{

        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.allproducts=action.payload
            state.allproductsDummy=action.payload
            state.loading=false
            state.error=""
        })
        builder.addCase(fetchProducts.pending,(state,action)=>{
            state.allproducts=[]
            state.allproductsDummy=[]
            state.loading=true
            state.error=""
        })
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.allproducts=[]
            state.allproductsDummy=[]
            state.loading=false
            state.error="API Call failed..."
        })
        
    }

})

export const {searchProduct} = productSlice.actions

export default productSlice.reducer


// reducer uses only synchronous operation, while need api call (a asynchronous one)