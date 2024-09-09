import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { removeItem } from "./cartSlice";

const DeleteItem = ({ children, pizzaId }) => {
  const dispatch = useDispatch();

  return (
    <Button type="small" handleClick={() => dispatch(removeItem(pizzaId))}>
      {children}
    </Button>
  );
};

export default DeleteItem;
