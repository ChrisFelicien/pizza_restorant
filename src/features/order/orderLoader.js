import { getOrder } from "../../services/apiRestaurant";

 const loader = async ({ params }) => {
 
    const order = await getOrder(params?.orderId);
  
    return order;
  };


  export default loader
  