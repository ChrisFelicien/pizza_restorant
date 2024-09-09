import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOder, {
  action as createOrderAction
} from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import orderLoader from "./features/order/orderLoader";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { action as orderAction } from "./features/order/UpdateOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/order/new",
        element: <CreateOder />,
        action: createOrderAction
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        action: orderAction,
        errorElement: <Error />
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
