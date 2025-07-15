import React, { useEffect, useState } from "react";
import useAxios from "../Hook/useAxios";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import useCart from "../Hook/useCart";

const img_hosting = "f00f7709983a82bfc1ca5153ef794386";
const img_api_key = `https://api.imgbb.com/1/upload?key=${img_hosting}`;

const Checkout = () => {
  const axiosSecure = useAxios();
  const { id } = useParams();
  // const [product, setProduct] = useState([]);
  const [division, setDivision] = useState("Dhaka");

  const [cart, isLoading, refetch] = useCart() || [];

  // useEffect(() => {
  //   fetch("/addcart.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProduct(data);
  //     });
  // }, [id]);

  const myProduct = cart?.find((pro) => pro._id == id) || {};
  const { name, price, image } = myProduct || {};

  const totalTaka = cart?.reduce((total, item) => total + item.price, 0) || 0;

  function handleAdd(e) {
    e.preventDefault();
    const cusname = e.target.cusname.value;
    const mobile = e.target.mobile.value;
    const district = e.target.district.value;
    const trx = e.target.trx.value;
    const email = e.target.email.value;
    const upzila = e.target.upzila.value;
    const thana = e.target.thana.value;
    const address = e.target.address.value;
    const imageTrx = e.target.imageTrx.files[0];

    const data = new FormData();
    data.append("image", imageTrx);

    fetch(img_api_key, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        const orderObj = {
          cusname,
          mobile,
          district,
          address,
          imageTrx: data.data?.url || "",
          image,
          trx,
          email,
          division,
          upzila,
          totalTaka,
          name,
          thana,
          item: cart.length,
        };

        // console.log(orderObj);

        axiosSecure.post("/orders", orderObj).then(() => {
          Swal.fire({
            title: "Order Placed",
            icon: "success",
          });
        });
      });
  }

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
          .delete(`/add-to-cart/${id}`)
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your Item has been deleted.",
              icon: "success",
            });
            refetch();
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="min-h-screen gap-3 flex flex-col md:flex-row bg-gradient-to-br from-white to-pink-50 items-center justify-center py-10 px-4">
      <div className="relative w-full h-full md:w-2/3 border border-pink-300 bg-pink-50 px-4 py-8 sm:px-6 lg:px-8 rounded-xl">
        <div className="mt-4 space-y-6">
          <h2 className="text-lg font-semibold text-pink-700">
            Make Payment First then Fill The Form
          </h2>
          <div className="flex flex-col  border-pink-200">
            <p className="text-lg border-b-2 border-pink-200 font-semibold text-pink-700">
              Delivery Charge
            </p>
            <p className="text-sm mt-2 text-pink-600">- Inside Dhaka: 80 TK</p>
            <p className="text-sm  text-pink-600">- Outside Dhaka: 150 TK</p>
            <p className="text-sm  text-pink-600">- Close to Dhaka: 120 TK</p>
          </div>

          {cart ? (
            cart.map((pro, idx) => (
              <ul key={idx} className="space-y-4">
                <li className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <img
                      alt=""
                      src={pro.image}
                      className="size-16 rounded object-cover border"
                    />
                    <p className="text-xs text-gray-600">{pro.name}</p>
                  </div>

                  <div className="flex gap-2 items-center justify-center">
                    <p className="text-gray-700"> {pro?.price} TK</p>
                    <button
                      onClick={() => handleDelete(pro._id)}
                      className="text-red-600 font-bold p-3 hover:bg-red-100 rounded-md btn btn-xs"
                    >
                      <FaTrash></FaTrash>
                    </button>
                  </div>
                </li>
              </ul>
            ))
          ) : (
            <p className="text-center text-red-600">Cart is Empty</p>
          )}
          <div className="border-t border-pink-200 pt-2"></div>
          <div className="flex justify-between text-gray-700 font-medium">
            <p>Payable Amount:</p>
            <p>{totalTaka?.toFixed(2)} TK</p>
          </div>

          <div className="space-y-4 text-center">
            <p
              onClick={() => {
                navigator.clipboard.writeText("01905045531");
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Number Copied",
                  showConfirmButton: false,
                  timer: 1000,
                });
              }}
              className="cursor-pointer block rounded border font-bold border-pink-400 px-5 py-3 text-sm text-pink-600 hover:ring-1 hover:ring-pink-400 transition"
            >
              01905045531
            </p>

            <p className="block rounded bg-pink-600 px-5 py-3 text-sm text-white hover:bg-pink-700">
              Make Payment
            </p>
            <Link
              to={"/allproducts"}
              className="inline-block text-sm text-pink-500 underline underline-offset-4 hover:text-pink-700"
            >
              Back To All Products Page
            </Link>
          </div>
        </div>
      </div>
      {/* Other section */}
      <form
        onSubmit={handleAdd}
        className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-pink-200"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-4">
          Payment Page
        </h2>

        <div className="flex flex-col md:flex-row gap-1">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="cusname"
              requipink
              placeholder="Your full name"
              className="w-full mt-1 p-3 border border-pink-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              requipink
              placeholder="Gmail"
              className="w-full mt-1 p-3 border border-pink-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-1">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              requipink
              placeholder="e.g. 01XXXXXXXXX"
              className="w-full mt-1 p-3 border border-pink-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">
              Transaction ID
            </label>
            <input
              type="text"
              name="trx"
              requipink
              placeholder="Submit Your Transaction ID"
              className="w-full mt-1 p-3 border border-pink-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-1">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">
              District
            </label>
            <select
              name="district"
              requipink
              onChange={(e) => setDivision(e.target.value)}
              className="w-full mt-1 p-3 border border-pink-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
            >
              <option value="">Select your division</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Khulna">Khulna</option>
              <option value="Barisal">Barisal</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">
              Upozila
            </label>
            <input
              type="text"
              name="upzila"
              requipink
              placeholder="Write Upozila Name"
              className="w-full mt-1 p-3 border border-pink-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">
              Thana
            </label>
            <input
              type="text"
              name="thana"
              requipink
              placeholder="Write Thana Name"
              className="w-full mt-1 p-3 border border-pink-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Address
          </label>
          <textarea
            name="address"
            rows="3"
            requipink
            placeholder="Your full delivery address..."
            className="w-full mt-1 p-3 border border-pink-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Upload Image ( Payment Screenshot)
          </label>
          <input
            type="file"
            name="imageTrx"
            accept="image/*"
            requipink
            className="w-full mt-1 p-3 border border-pink-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-pink-700 transition"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
