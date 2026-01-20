import { useSearchParams } from "react-router-dom";
import { Header } from '../components/Header';
import { OrderDetails } from "../components/WaiterPage/OrderDetails";
import { ItemsProvider } from "../contexts/ItemsContext";

export const WaiterPage = () => {

  const [searchParams] = useSearchParams();

  const table = searchParams.get("table");
  const token = searchParams.get("token");

  return (
    <>
      <ItemsProvider>
        <Header />
        <OrderDetails />
      </ItemsProvider>
    </>

  )
}
