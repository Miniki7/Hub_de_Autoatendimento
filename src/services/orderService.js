import { API_URL } from "./api";

export async function getOrdersByUser(userId) {
  
    const response = await fetch(
        `${API_URL}/pedidos?usuarioId=${userId}`
    );
  
    return response.json();
}

export async function requestRefund(orderId) {

  const orderResponse = await fetch(
    `${API_URL}/pedidos/${orderId}`
  );

  const order = await orderResponse.json();

  const userResponse = await fetch(
    `${API_URL}/usuarios/${order.usuarioId}`
  );

  const user = await userResponse.json();

  await fetch(`${API_URL}/pedidos/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      status: "reembolso_solicitado"
    })
  });

  await fetch(`${API_URL}/usuarios/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      carteira_saldo: user.carteira_saldo + order.valor_pago
    })
  });


  return true;
}