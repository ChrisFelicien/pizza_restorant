import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients, isLoading }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className=" list-none mb-4 px-6 ">
      <div className="flex gap-2 flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>
          {formatCurrency(totalPrice)}
        </p>
      </div>
      <p className="flex gap-2 text-stone-500 opacity-45 text-sm italic capitalize">
        {isLoading ? "Loading ingredients." : ingredients?.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
