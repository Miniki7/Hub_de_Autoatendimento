import { useOrders } from "../../hooks/useOrders";
import { useRefund } from "../../hooks/useRefund";
import { useUser } from "../../hooks/useUser";

export default function Dashboard() {

  const { refund } = useRefund();

  const user = useUser("2"); 
  const orders = useOrders("2");

  return (

    <div>

      <h1>Dashboard</h1>

      <button
        onClick={() => refund("101")}
      >
        Testar Reembolso Pedido 101
      </button>

      <button
        onClick={() => {console.log(user)}}
      >
        Testar Usuarios
      </button>

      <button
        onClick={() => console.log(orders)}
      >
       Testar Pedidos
      </button>

    </div>

  );

}