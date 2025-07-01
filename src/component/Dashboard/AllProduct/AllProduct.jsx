import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxios from "../../Hook/useAxios";
import Swal from "sweetalert2";


const AllBook = () => {
  const [products , setProducts] = useState([]);
  const axiosSecure = useAxios()

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



   function handleEdit(){

  }

  return (
    <div className=" min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8"> All Items</h2>

      <div className="overflow-x-auto shadow-lg rounded-xl bg-white p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Author</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((item, idx) => (
                <tr key={item._id} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-3 text-sm text-gray-600">{idx + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{item.category}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-4">

                      <button
                        title="Delete"
                        className="text-blue-600 hover:text-blue-800 transition"
                        onClick={() => handleDelete(item._id)}
                      >
                        <FaEdit></FaEdit>
                      </button>
                       <button
                        className="text-red-600 hover:text-red-800 transition"
                        onClick={() => handleEdit(item._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No items available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBook;