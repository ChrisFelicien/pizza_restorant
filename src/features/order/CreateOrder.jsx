// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import {  useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from './../cart/EmptyCart'
import store from './../../store'
import {formatCurrency} from './../../utils/helpers' 
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";


// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// 
function CreateOrder() {
  
  const [withPriority, setWithPriority] = useState(false);
  const {username, status:addressStatus, position, address, error: errorAdress} = useSelector(state => state.user)
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const formError = useActionData();
  const isSubmitting = navigation.state === "submitting";
  const totalPrice = useSelector(getTotalPrice);
  const priority = withPriority ? totalPrice * 0.2 : 0;
  const priceAmount = totalPrice + priority;
  const dispatch = useDispatch();
  const isLoadingPosition = addressStatus === 'loading';
  


  if(!cart.length){
    return <EmptyCart />
  }
 
  const handleClick = (e) => {
    
    e.preventDefault()
    dispatch(fetchAddress())
  }

  return (
    <div className="px-4 py-6">
     
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let us go!</h2>

      <Form method='POST'>
        <div className="flex gap-2 flex-col sm:flex-row sm:items-center mb-4">
          <label className="sm:basis-40">First Name</label>
          <input type='text' name='customer' defaultValue={username}  className="input grow " placeholder="Please fill your first name" required />
        </div>

        <div className="flex gap-2 flex-col sm:flex-row sm:items-center mb-4">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow ">
            <input type='tel' name='phone' className="input w-full" placeholder="Please fill your phone number" required />
            {formError?.phone && <p className="text-xs text-red-500 bg-red-300/25 py-1 pl-1 rounded-md mt-2">{formError.phone}</p>}
          </div>
        </div>

        <div className="flex gap-2 flex-col sm:flex-row sm:items-center mb-4 relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow flex flex-col">
            <input type='text ' name='address' placeholder="fill your address please" defaultValue={address} className="input grow" disabled={isLoadingPosition } required />
          {addressStatus === 'error' && <p className="text-xs text-red-500 bg-red-300/25 py-1 pl-1 rounded-md mt-2">{errorAdress}</p>}
            
          </div>

          {
            !position.longitude && !position.latitude &&
            <span className={`${addressStatus === 'loading' ? 'cursor-not-allowed' : ''} absolute right-[2px] top-[1px] z-10`}>
          <Button type='small' handleClick={handleClick} disabled={isLoadingPosition || isSubmitting} >{isLoadingPosition && 'Loading address' ||'Get address'}</Button>
          </span>
          }
        </div>

        <div className="flex items-center gap-2 mb-12">
          <input
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="w-6 h-6 accent-yellow-400 focus:ring focus:ring-yellow-300 focus:ring-offset-2"
          />
          <label htmlFor='priority' className="text-sm font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />

          <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude},${position.longitude}` : ''} />

          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting ? "Placing order...." : `Order now ${formatCurrency(priceAmount)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority ? true : false,
  };

  

  const error = {};

  if (!isValidPhone(order.phone))
    error.phone =
      "Please provide a valid phone number we can need it to contact you";

  if (Object.keys(error).length > 0) return error;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;

