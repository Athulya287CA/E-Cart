import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../Redux/slice/wishListSlice'
import { addToCart } from '../Redux/slice/cartSlice'


function View() {

  // useparams()

  const {id} = useParams()
  //can handle path related informations from components
  // {<Route path='/view/:id' element={<View/>}/> in app.jsx}

  // console.log(id)

  const[product,setProduct]=useState({})

  const {wishlist} = useSelector(state=>state.wishListReducer)
  const cart = useSelector( (state)=>state.cartReducer)

  const dispatch = useDispatch()

  useEffect(()=>{
    if (localStorage.getItem("allProducts")){
      const allProducts= JSON.parse(localStorage.getItem("allProducts"))
      setProduct(allProducts.find(item=>item.id==id))
      // console.log(product)
    }
    else{
      setProduct("")
    }
  },[])

  console.log(product);

  const handleWishlist = (product) => {
    const existingProduct = wishlist.find(item=>item.id==product.id)

    if (existingProduct){
      alert("Product already exist")
    }
    else{
      dispatch(addToWishlist(product))
    }
  }

  const handleCart = (product) => {
    const existingProduct = cart?.find(item=>item.id == product.id)
    if(existingProduct){
      alert("Items added to Cart 👍")
      dispatch(addToCart(product))
    }
    else{
      alert("Item added to Cart 👍")
      dispatch(addToCart(product))
    }
  }

  return (
    <>
      <Header/>
      

      <div className="container row" style={{marginTop:"9rem"}}>
        <div className="col-lg-1"></div>
        <div className="col-lg-4">
          <img width={"100%"} src={product.images} alt="" />
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-6 mt-5">
          <p>Pid: {product?.id}</p>
          <h1>{product?.title}</h1>
          <p className='mt-3'>{product?.description}</p>
          <h3>Price : <span className='text-danger fw-bolder'>${product?.price}</span></h3>
          <div className="d-flex justify-content-between mt-3">
            <Button className='btn btn-light border border-dark' onClick={()=>handleWishlist(product)}>
                  <i className="fa-solid fa-heart" style={{color: '#e01010'}}></i> Wishlist
            </Button>
            <Button className='btn btn-light border border-dark' onClick={()=>handleCart(product)} >
                      <i className='fa-solid fa-cart-shopping text-primary'></i> Cart
            </Button>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default View
