// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { useEffect } from "react";

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate
} from "../../utils/helpers";
import UpdateOrder from "./UpdateOrder";
import OderItem from './OrderItem'


function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart
  } = order;


  const fetcher = useFetcher();

  const deliveryIn = calcMinutesLeft(estimatedDelivery);



  useEffect(()=> {
    if(!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu')
  }, [fetcher]);


  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Status #{id} status</h2>

        <div className="flex items-center gap-2"> 
          {priority && <span className="bg-red-500 rounded-full py-1 px-3 text-xs uppercase font-semibold text-red-50 tracking-wide">Priority</span>}
          <span className="bg-green-500 rounded-full py-1 px-3 text-xs uppercase font-semibold text-green-50 tracking-wide">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y border-b">
        {
          cart.map(item => <OderItem key={item.pizzaId} item={item } isLoading={fetcher.state !== 'idle'} ingredients={fetcher.data?.find(el => el.id === item.pizzaId).ingredients} />)
        }  
      </ul>
        
      <div className="space-y-2 bg-slate-200 px-6 py-5"> 
        <p className="text-xm font-medium text-stone-600 flex justify-between">
          <span>Price pizza:</span><span> {formatCurrency(orderPrice)}</span>
        </p>
        {priority &&
          <p className="text-xm font-medium text-stone-600 flex justify-between">
            <span>Price priority:</span> <span>{formatCurrency(priorityPrice)}</span>
          </p>}
        <p className="text-xm font-bold text-stone-900 flex justify-between">
          <span>To pay on delivery:</span><span> {formatCurrency(orderPrice + priorityPrice)}</span>
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}


export default Order;
