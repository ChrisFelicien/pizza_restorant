import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalQuantity, getTotalPrice } from "./cartSlice";
import { formatCurrency } from "./../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(state => getTotalQuantity(state));

  const totalPrice = useSelector(state => getTotalPrice(state));

  if (!totalCartQuantity) return null;

  return (
    <div className="flex justify-between items-center bg-stone-800 text-stone-200 px-4 py-4 text-sm sm:px-6 md:text-base ">
      <p className="text-stone-300 font-semibold uppercase space-x-4 text-sm  md:text-base">
        <span>
          {totalCartQuantity} pizzas
        </span>
        <span>
          {formatCurrency(totalPrice)}
        </span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
