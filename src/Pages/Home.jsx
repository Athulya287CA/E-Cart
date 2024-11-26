import React, { startTransition, useEffect } from 'react'
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../Redux/slice/productSlice'
import Header from '../Components/Header'
import { addToWishlist } from '../Redux/slice/wishListSlice'
import { addToCart } from '../Redux/slice/cartSlice'





function Home() {

  const dispatch = useDispatch()

  const{allproducts,loading,error}=useSelector(state=>state.productReducer)

  const {wishlist} = useSelector(state=>state.wishListReducer)

  const cart = useSelector( (state)=>state.cartReducer)

  const handleWishlist = (product) => {
    const existingProduct = wishlist?.find(item=>item.id==product.id)

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

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])

  return (
    <>
     <Header insideHome/>

      {/* add card */}
      <div style={{marginTop:"9rem"}} className="container-fluid">
        {
          loading? <div className="text-center mt-5">
            <Spinner animation="border" variant="secondary" />
          </div>:
          <Row >
            {allproducts?.length>0?allproducts.map(product=>(
              <Col className='d-flex justify-content-around mt-4'  key={product?.id}>
              <Card  style={{ width: '18rem' }}>
            <Link to={`/view/${product?.id}`}><Card.Img variant="top" width={"100%"} src={product?.thumbnail} /></Link>
          
            <Card.Body>
              <Card.Title>{product?.title.slice(0,20)}...</Card.Title>
              <Card.Text>
                {product.description.slice(0,20)}...
              </Card.Text>
              <div className="d-flex justify-content-between">
                  <Button className='btn btn-light' onClick={()=>handleWishlist(product)}>
                  <i className="fa-solid fa-heart" style={{color: '#e01010'}}></i>
                  </Button>
                  <Button className='btn btn-light' onClick={()=>handleCart(product)} >
                      <i className='fa-solid fa-cart-shopping text-primary'></i>
                  </Button>
              </div>
              
            </Card.Body>
          </Card>
              </Col>
            )) : <p className='text-danger'>Nothing to Display</p>
          }
            
          </Row>
        }
      </div>
    </>
  )
}

export default Home
