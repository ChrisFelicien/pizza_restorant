// import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import { getCart, clearCart } from "./cartSlice";
import { getUsername } from "../user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";

function Cart() {
  const dispatch = useDispatch();
  const username = useSelector(getUsername);

  const cart = useSelector(getCart);

  // const cart = fakeCart;

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-8 text-xl font-semibold">
        Your cart, {username}
      </h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map(item => <CartItem key={item.pizzaId} item={item} />)}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type={"secondary"} handleClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetable",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15
//   }
// ];
