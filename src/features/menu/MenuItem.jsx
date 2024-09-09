import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import Button from "./../../ui/Button";
import { addToCart } from "./../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import { getCurrentItemQuantityById } from "./../cart/cartSlice";
import UpdateItemQuantity from "./../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();

  const isInCart = useSelector(getCurrentItemQuantityById(id));
  const currentQuantity = useSelector(getCurrentItemQuantityById(id));

  const handleAddToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1
    };

    dispatch(addToCart(newItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 w-24 ${soldOut ? "opacity-75 grayscale" : ""} `}
      />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">
          {name}
        </p>
        <p className="text-sm italic text-stone-500 capitalize">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut
            ? <p className="text-sm">
                {formatCurrency(unitPrice)}
              </p>
            : <p className="text-sm uppercase text-stone-500">Sold out</p>}

          {!soldOut &&
            (isInCart
              ? <div className="flex gap-4 items-center sm:gap-8">
                  <UpdateItemQuantity
                    pizzaId={id}
                    currentQuantity={currentQuantity}
                  />
                  <DeleteItem pizzaId={id} handleClick={() => dispatch()}>
                    Remove to cart
                  </DeleteItem>
                </div>
              : <Button type="small" handleClick={handleAddToCart}>
                  Add to cart
                </Button>)}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
