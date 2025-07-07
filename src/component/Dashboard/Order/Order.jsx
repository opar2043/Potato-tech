import React, { useEffect, useState } from "react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // ✅ Fix: state for modal data

  useEffect(() => {
    fetch("/order.json")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);

  function handleView(orderObj) {
    setSelectedOrder(orderObj); // ✅ Set selected order
    document.getElementById("my_modal_3").showModal();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10 drop-shadow">
          📦 All Order
        </h2>

        {/* ✅ Modal */}
<dialog id="my_modal_3" className="modal backdrop-blur-sm">
  <div className="modal-box rounded-2xl shadow-2xl border border-blue-200 bg-white/80 backdrop-blur-md transition-all duration-300">

    {/* Close Button */}
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-red-100">
        ✕
      </button>
    </form>

    {selectedOrder && (
      <section>
        <div className="px-4 py-6">
          <header className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-blue-800 drop-shadow-sm">
              🧾 Order Summary
            </h1>
            <p className="text-sm text-gray-600 mt-1">Details of the selected order</p>
          </header>

          <div className="card bg-white rounded-xl shadow-md overflow-hidden">
            <figure className="px-6 pt-6">
              <img
                src={selectedOrder.imageTrx}
                alt="Transaction"
                className="rounded-xl w-full max-h-60 object-cover border border-gray-200 shadow-sm"
              />
            </figure>

            <div className="card-body space-y-2">
              <h2 className="card-title text-pink-600 text-xl">
                {selectedOrder.name || "Product Name"}
              </h2>

              <ul className="text-sm text-gray-700 space-y-1 grid grid-cols-2 gap-1">
                <li><strong>👤 Customer:</strong> {selectedOrder.cusname || "N/A"}</li>
                <li><strong>📞 Mobile:</strong> {selectedOrder.mobile}</li>
                <li><strong>📧 Email:</strong> {selectedOrder.email || "N/A"}</li>
                <li><strong>🔁 Transaction ID:</strong> {selectedOrder.trx}</li>
                <li><strong>💰 Amount:</strong> ${selectedOrder.amount || 0}</li>
                <li><strong>🛒 Item Count:</strong> {selectedOrder.item || 0}</li>
                <li><strong>📍 Address:</strong> {selectedOrder.address}</li>
                <li><strong>🗺️ Upazila:</strong> {selectedOrder.upzila}</li>
                <li><strong>🏙️ District:</strong> {selectedOrder.district}</li>
                <li><strong>🌐 Division:</strong> {selectedOrder.division}</li>
              </ul>

              <div className="card-actions justify-end mt-4">
                <span className="badge badge-success badge-lg text-white px-4 py-2">
                  ✅ Paid
                </span>
                <span className="badge badge-info badge-lg px-4 py-2">
                  📍 {selectedOrder.division}
                </span>
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
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                  #
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                  Product
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
                orders.map((item, idx) => (
                  <tr
                    key={item._id}
                    className="hover:bg-blue-50 transition duration-200"
                  >
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.imageTrx}
                          alt="Transaction"
                          className="w-14 h-14 rounded object-cover border border-gray-300 shadow-sm"
                        />
                        <p className="font-semibold text-gray-800">
                          {item.name}
                        </p>
                      </div>
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
        </div>
      </div>
    </div>
  );
};

export default Order;
