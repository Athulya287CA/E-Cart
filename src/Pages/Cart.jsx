import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { emptyCart, removeFromCart } from '../Redux/slice/cartSlice'
import { Link } from 'react-router-dom'


function Cart() {

  const cart = useSelector( (state)=>state.cartReducer )

  const dispatch = useDispatch()

  const[total,setTotal] =useState(0)

  useEffect(()=>{
    if(cart?.length>0 ){
      setTotal(cart?.map(product => product?.totalPrice).reduce((p1,p2)=>p1+p2))
    }
  },[cart])

  console.log(cart.totalPrice);
  
  return (
    <>

      <Header/>   

      <div style={{marginTop:"9rem"}}>
          
      {
        cart.length>0?(
        <div className="container row"  style={{marginTop:"9rem"}}>
      <div className="col-lg-1"></div>
        <div className="col-lg-7">
          <div className="table  shadow mt-5">
            <table className='table  w-100 text-center align-middle'>
              <tr className='table  table-primary '>
              <th>#</th>
              <th>Title</th>
              <th>Image</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Action</th>
            </tr>


            {cart?.map((product,index)=>(
              <tr>
                <td>{index+1}</td>
                <td>{product.title}</td>
                <td>
                  <img width={'100%'}  height={"100%"} src={product.thumbnail} alt="" />
                </td>
                <td><input type="text" readOnly value={product.quantity} style={{width:"2rem"}} className='rounded' /></td>
                <td>${product.totalPrice}</td>
                
                <td>
                  <button className='btn ' onClick={()=>dispatch(removeFromCart(product?.id))}><i className='fa-solid fa-trash text-danger'></i></button>
                </td>
                </tr>
              ))}
            
            </table>
            <div className="d-flex justify-content-between p-3">
              <button className='btn btn-danger' onClick={()=>dispatch(emptyCart())}>Empty Cart</button>
              <Link to='/' className='btn btn-success'>Shop More </Link>
              
          </div> 
            
          </div>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-3">
          <div className="card shadow mt-5 p-5 w-100">
            <h2 className='text-dark fw-bolder'>Cart summary</h2>
            <h5>Total Products:<span className='text-dark fw-bolder fs-4'>{cart?.length}</span></h5>
            <h5>Total price:<span className='text-danger fw-bolder fs-4'>{total.toFixed(2)}</span></h5>
            <div className="d-grid">
              <button className='btn btn-success mt-2'>Checkout</button>
            </div>
          </div>
          
        </div>
         

      </div>
      
    ) : 
      <div className="d-flex flex-column align-items-center">
      <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--wishlist-bucket-shopping-state-pack-design-development-illustrations-1800917.png?f=webp" alt="" />

      {/* https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6zpkYbeiUtsod_WwWhdNHenST73t5LEmnCWPQuqCMD33fuPN6xxO3OVXIHpuhoz3lBLQ&usqp=CAU */}
      <h3>Your Cart is empty ... </h3>
    </div>



      }

</div>
      
    </>
  )
}

export default Cart
