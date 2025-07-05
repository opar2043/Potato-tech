import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxios from "../../Hook/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllBook = () => {
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxios();

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Deelte this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/products/${id}`)
          .then((res) => {
            if (res.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Item has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
            // console.error(err);
          });
      }
    });
  };

  function handleEdit() {

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10 drop-shadow">
          📦 All Items
        </h2>

        <div className="overflow-x-auto rounded-xl shadow-2xl bg-white p-6">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                  #
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                  Author
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {products.length > 0 ? (
                products.map((item, idx) => (
                  <tr
                    key={item._id}
                    className="hover:bg-blue-50 transition duration-200"
                  >
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-6">
                        <button
                          title="Delete"
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform"
                        >
                          <FaTrash size={18} />
                        </button>
                        <Link to={`/dashboard/editproducts/${item._id}`}>
                          <button
                            title="Edit"
                            className="text-blue-600 hover:text-blue-800 hover:scale-110 transition-transform"
                          >
                            <FaEdit size={18} />
                          </button>
                        </Link>
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

export default AllBook;
