import React, { useEffect, useState } from "react";
import useOrder from "../../Hook/useOrder";

const Order = () => {
  // const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, isLoading, refetch] = useOrder([]) || [];

const cartItems = orders?.flatMap(order =>
  order.cart?.map(item => ({
    name: item.name,
    image: item.image
  }))
) || [];

console.log(cartItems);
  // useEffect(() => {
  //   fetch("/order.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setOrders(data);
  //     });
  // }, []);

  function handleView(orderObj) {
    setSelectedOrder(orderObj); 
    document.getElementById("my_modal_3").showModal();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10 drop-shadow">
          📦 All Order
        </h2>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box w-11/12 max-w-4xl p-0">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

{selectedOrder && (
  <section className="max-h-[90vh] overflow-y-auto">
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <header className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
            🧾 Order Summary
          </h1>
        </header>

        {/* Cart Items Grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-5">
          {selectedOrder.cart.map((item, i) => (
            <div
              key={i}
              className="flex items-center bg-blue-50 rounded-lg p-4 shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded mr-4 border"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>

              </div>
            </div>
          ))}
        </div>

        {/* Transaction & Customer Info */}
        <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700">
          <div className="space-y-2">
            <p>
              <strong>Customer:</strong> {selectedOrder.cusname}
            </p>
            <p>
              <strong>Mobile:</strong> {selectedOrder.mobile}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder.email}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {selectedOrder.address}, {selectedOrder.upzila},{" "}
              {selectedOrder.district}
            </p>
          </div>

          <div className="space-y-2">
            <p>
              <strong>Payment Method:</strong> {selectedOrder.method}
            </p>
            <p>
              <strong>Transaction ID:</strong>{" "}
              <span className="bg-gray-200 px-2 py-1 rounded text-gray-800 font-mono">
                {selectedOrder.trx}
              </span>
            </p>
            <p>
              <strong>Total Items:</strong> {selectedOrder.item}
            </p>
            <p>
              <strong>Total Amount:</strong>{" "}
              <span className="text-lg font-semibold text-green-600">
                {selectedOrder.totalTaka} TK
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <span className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600">
             Payment Received
          </span>
        </div>
      </div>
    </div>
  </section>
)}

          </div>
        </dialog>

        {/* ✅ Orders Table */}
        <div className="overflow-x-auto rounded-xl shadow-2xl bg-white p-6">
          {orders ? (
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                    Trx No.
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                {orders.length > 0 ? (
                  orders.slice().reverse().map((item, idx) => (
                    <tr
                      key={item._id}
                      className="hover:bg-blue-50 transition duration-200"
                    >
                                            <td className="px-6 py-4">
                        <div className="flex items-center gap-1 ">
                          ({idx + 1}.)
                          <img
                            src={item.imageTrx}
                            alt="Transaction"
                            className="w-14 h-14 rounded object-cover border border-gray-300 shadow-sm"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-medium">
                         {item?.date}
                      </td>

                      <td className="font-semibold text-gray-800">
                        {item.trx}
                      </td>
                      <td className="font-semibold text-gray-800">
                        {item.cusname || "Random Customer"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-6">
                          <button
                            title="View Order"
                            onClick={() => handleView(item)}
                            className="text-blue-600 underline hover:text-blue-800 hover:scale-110 transition-transform"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-6 text-gray-500 font-medium"
                    >
                      No items available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No Order Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
