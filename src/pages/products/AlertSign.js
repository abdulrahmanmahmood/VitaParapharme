import React from 'react';
import StarRating from '../rate/StarRating';
import { FaMinus  , FaPlus} from 'react-icons/fa';
import { useState } from 'react';
import { addToCart } from "../../rtk/slices/Cart-slice";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import './detailsDialog.css';

const AlertSign = ({ isOpen, onCancel, product , rating}) => {
  const dispatch = useDispatch();
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup')) {
      onCancel();
    }
  };

  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

const handleAddToCart = () => {
  const cartItem = {
    productId: product.id,
    poster : product.poster ,
    title: product.title,
    quantity: quantity,
    price: product.price,
  };

  dispatch(addToCart(cartItem));
  setQuantity(0);
    setTotalPrice(0);
};


   
    return (
      <>
        {isOpen && (
          <div className="popup" onClick={handleOverlayClick}>
            <div className="popup-contentDetails">
           <div className='details'>
            <div className='imgdetails'>
            {product.poster && (
                  <img
                    className="productImg"
                    src={`data:image/png;base64,${product.poster}`}
                    alt="Product poster"
                  />
                )}
            </div>
            <div className='infodetails'>
            <h1 >{product.title}</h1>
                    <hr />
                    <p className="lead">
                    Dealing with dry skin is enough to leave anyone 
frustrated, frazzled and, well, flaky. Even worse,
chronic dryness is associated with a disrupted 
skin barrier. “Without an optimal barrier function 
your skin becomes more vulnerable to minor 
trauma and infections, and it will take longer to
heal,” says Dr. Hadley King, a board-certified 

                    </p>

                    
                    <div className='rate'>
                         <StarRating rating={rating} />
                    </div>

                    <div className='counter-flex'>
                  <h1>{product.price * quantity} $</h1>
               
                <div className="counter">
                  <button onClick={handleDecrement}>
                    <FaMinus />
                  </button>
                  <span>{quantity}</span>
                  <button onClick={handleIncrement}>
                    <FaPlus />
                  </button>
                </div>
                <div className="review">
                <button onClick={handleAddToCart}>Add to Cart</button>
              </div>
                </div>
            </div>
           </div>

            
          </div>
          </div>
        )}
      </>
    );
  };

export default AlertSign;