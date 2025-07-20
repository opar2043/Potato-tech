import React, { useEffect, useState } from "react";
import useOrder from "../../Hook/useOrder";

const Order = () => {
  // const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, isLoading, refetch] = useOrder([]) || [];

  // useEffect(() => {
  //   fetch("/order.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setOrders(data);
  //     });
  // }, []);

  function handleView(orderObj) {
    setSelectedOrder(orderObj); // ✅ Set selected order
    document.getElementById("my_modal_3").showModal();
  }

  //   cusname,
  // mobile,
  // district,
  // address,
  // imageTrx: data.data?.url || "",
  // image,
  // trx,
  // email,
  // division,
  // upzila,
  // totalTaka,
  // name,
  // thana

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
              <section>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                  <div className="mx-auto max-w-3xl">
                    <header className="text-center">
                      <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                        Order Summary
                      </h1>
                    </header>

                    <div className="mt-8">
                      <ul className="space-y-4">
                        <li className="flex items-center gap-4">
                          <img
                            src={selectedOrder.imageTrx}
                            alt="Transaction"
                            className="size-16 rounded-sm object-cover"
                          />

                          <div>
                            <h3 className=" text-gray-900">
                              {selectedOrder.name}
                            </h3>
                            <dl className="mt-0.5 space-y-px text-[12px] text-gray-600">
                              <div>
                                <dt className="inline">Customer:</dt>
                                <dd className="inline">
                                  {" "}
                                  {selectedOrder.cusname || "N/A"}
                                </dd>
                              </div>
                              <div>
                                <dt className="inline">Transaction:</dt>
                                <dd className="inline font-semibold bg-gray-400/35 border border-gray-300 ml-1 rounded-md py-1 px-3 text-gray-700">
                                  {" "}
                                  {selectedOrder.trx}
                                </dd>
                              </div>
                              <div>
                                <dt className="inline">Methode:</dt>
                                <dd className="inline  ml-1 rounded-md py-1 px-3 text-gray-700">
                                  {" "}
                                  {selectedOrder.method}
                                </dd>
                              </div>
                            </dl>
                          </div>

                          <div className="divider bg-black"></div>

                          <div className="flex flex-1 items-center justify-end gap-2">
                            <span className="text-sm text-gray-700">
                              Quantity: {selectedOrder.item || 1}
                            </span>
                            <span className="text-xs text-gray-700">
                              {selectedOrder.totalTaka || 0} TK
                            </span>
                          </div>
                        </li>
                      </ul>

                      <div className="mt-8 flex justify-end border-t border-gray-100 pt-8 gap-3">
                        <div>
                          <img src={selectedOrder.imageTrx} alt="" />
                        </div>

                        <div className="w-screen max-w-lg space-y-4">
                          <dl className="space-y-0.5 text-sm text-gray-700">
                            <div className="flex justify-between">
                              <dt>Customer</dt>
                              <dd>{selectedOrder.cusname || "N/A"}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt>Mobile</dt>
                              <dd>{selectedOrder.mobile}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt>Email</dt>
                              <dd>{selectedOrder.email || "N/A"}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt>Address</dt>
                              <dd>
                                {selectedOrder.address}, {selectedOrder.upzila},{" "}
                                {selectedOrder.district}
                              </dd>
                            </div>
                            <div className="flex justify-between !text-base font-medium">
                              <dt>Total</dt>
                              <dd>{selectedOrder.totalTaka || 0} TK</dd>
                            </div>
                          </dl>

                          <div className="flex justify-end">
                            <p className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600">
                              Payment Recieved
                            </p>
                          </div>
                        </div>
                      </div>
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
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                    Product
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
                      <td className="px-6 py-4 text-gray-600 font-medium">
                        ({idx + 1}) {item?.date}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 ">
                          <img
                            src={item.imageTrx}
                            alt="Transaction"
                            className="w-14 h-14 rounded object-cover border border-gray-300 shadow-sm"
                          />
                          <p className="font-semibold text-xs text-gray-800">
                            {item.name}
                          </p>
                        </div>
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
