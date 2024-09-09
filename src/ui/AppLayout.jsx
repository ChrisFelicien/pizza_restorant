import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "./../features/cart/CartOverview";
import Loader from "./Loader";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      {isLoading && <Loader />}

      <Header />

      <div className="bg-slate-100/2">
        <main className="max-w-3xl mx-auto">
          <Outlet />
        </main>
      </div>

      <footer>
        <CartOverview />
      </footer>
    </div>
  );
};

export default AppLayout;
