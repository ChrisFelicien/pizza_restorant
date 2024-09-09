import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="grid items-center justify-center gap-y-4">
      <Link to="/menu" type={"small"} className="text-blue-700 mt-8">
        &larr; Back to menu
      </Link>

      <p className="grid justify-center mt-24">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
