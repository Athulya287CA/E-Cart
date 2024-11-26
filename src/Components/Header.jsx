import React, { useEffect, useState } from 'react'
import { Badge, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../Redux/slice/productSlice'

function Header({insideHome}) {

  const dispatch = useDispatch()

  const {wishlist} = useSelector(state => state.wishListReducer)
  const[wishlistCount,setWishlistCount] = useState(0)

  const cart = useSelector( state => state.cartReducer)
  const[cartCount,setCartCount] =useState(0)

  useEffect(()=>{
    setWishlistCount(wishlist.length)
    setCartCount(cart.length)
  },[wishlist,cart])



  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" fixed='top' >
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{textDecoration:'none', color:"white"}}>
              <img src="https://cdn-icons-png.freepik.com/512/2762/2762901.png" style={{width:"2rem"}} alt="" /> E-Cart</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        

        {/* search bar be needed only in home page noi in other pages so wwe pass insideHome ad prop in homepage */}
          {insideHome&&<Form.Control
              type="text"
              placeholder="Search"
              className="ms-5 w-25"
              onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))}
            />}

          <Nav className="ms-auto">
            <Nav.Link className='btn btn-dark rounded border border-light m-2'>
                <Link to={'./wishlist'} style={{textDecoration:"none" , color:"white"}}> 
                <i className="fa-solid fa-heart text-light p-1" ></i>
                Wishlist
                <Badge bg="secondary rounded ms-2">{wishlistCount}</Badge>
                </Link>
               </Nav.Link>
            <Nav.Link className='btn btn-dark rounded border border-light m-2'>
            <Link to={'./cart'} style={{textDecoration:"none" , color:"white"}}> 
            <i className="fa-solid fa-cart-shopping p-1"></i>
            Cart
            <Badge bg="secondary rounded ms-2">{cartCount}</Badge>
            </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
