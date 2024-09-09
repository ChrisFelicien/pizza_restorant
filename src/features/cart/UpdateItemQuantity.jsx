import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { increaseItemQuantity, decreaseItemQuantity } from "./cartSlice";

const UpdateItemQuantity = ({ pizzaId, currentQuantity }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-1 items-center md:gap-3">
      <Button
        type="round"
        handleClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span>
        {currentQuantity}
      </span>
      <Button
        type="round"
        handleClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
};

export default UpdateItemQuantity;
