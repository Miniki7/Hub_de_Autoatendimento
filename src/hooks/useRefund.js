import { requestRefund } from "../services/orderService";

export function useRefund() {

  async function refund(orderId) {

    try {

      await requestRefund(orderId);

      alert("Reembolso solicitado!");

    } catch (error) {

      console.log(error);

    }

  }

  return { refund };

}