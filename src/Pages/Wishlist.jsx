import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromWishlist } from '../Redux/slice/wishListSlice'
import { addToCart } from '../Redux/slice/cartSlice'



function Wishlist() {

  const {wishlist} = useSelector(state=>state.wishListReducer)
  const cart = useSelector( (state)=>state.cartReducer)

  const handleCart = (product) =>{
    dispatch(addToCart(product))
    dispatch(removeFromWishlist(product?.id))
  }



  const dispatch = useDispatch()

  return (
    <>
      <Header/>

      <div  style={{marginTop:"9rem"}} className="container-fluid">
        <Row>
          {
            wishlist?.length>0?wishlist.map(product=>(
              <Col className='d-flex justify-content-around mt-4'  key={product?.id}>
              <Card  style={{ width: '18rem' }}>
            <Link to={`/view/${product?.id}`}><Card.Img variant="top" width={"100%"} src={product?.thumbnail} /></Link>
          
            <Card.Body>
              <Card.Title>{product?.title.slice(0,20)}...</Card.Title>
              <Card.Text>
                {product.description.slice(0,20)}...
              </Card.Text>
              <div className="d-flex justify-content-between">
                  <Button className='btn btn-light' onClick={()=>dispatch(removeFromWishlist(product?.id))}>
                  <i className="fa-solid fa-trash" style={{color: '#e01010'}}></i>
                  </Button>
                  <Button className='btn btn-light' onClick={()=>handleCart(product)}>
                      <i className='fa-solid fa-cart-shopping text-primary'></i>
                  </Button>
              </div>
              
            </Card.Body>
          </Card>
              </Col>
            )) : 
            <div className="d-flex flex-column align-items-center">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--wishlist-bucket-shopping-state-pack-design-development-illustrations-1800917.png?f=webp" alt="" />

              {/* https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6zpkYbeiUtsod_WwWhdNHenST73t5LEmnCWPQuqCMD33fuPN6xxO3OVXIHpuhoz3lBLQ&usqp=CAU */}
              <h3>Your Wishlist is empty ... </h3>
            </div>

          }
        </Row>
      </div>
    </>
  )
}

export default Wishlist
