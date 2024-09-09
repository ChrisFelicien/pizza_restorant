import { formatCurrency } from "./../../utils/helpers";
import { useSelector } from "react-redux";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentItemQuantityById } from "./cartSlice.js";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentItemQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="text-sm sm:flex-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:flex-1">
        <p className="text-sm">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      <div className="flex items-center gap-8">
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId}>Delete item</DeleteItem>
      </div>
    </li>
  );
}

export default CartItem;
