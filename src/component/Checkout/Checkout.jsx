// import React, { useEffect, useState } from "react";
// import useAxios from "../Hook/useAxios";
// import Swal from "sweetalert2";
// import { Link, useParams } from "react-router-dom";

// const img_hosting = "f00f7709983a82bfc1ca5153ef794386";
// const img_api_key = `https://api.imgbb.com/1/upload?key=${img_hosting}`;

// const Checkout = () => {
//   const axiosSecure = useAxios();
//   const { id } = useParams();
//   const [product, setProduct] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [division , setDivision] = useState('Dhaka')

//   useEffect(() => {
//     fetch("/product.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setProduct(data);
//       });
//   }, [id]);

//   const myProduct = product.find((pro) => pro._id == id) || {};
//   const { name, price, description, category, image } = myProduct || {};

//   const total = price * quantity;

//   function handleAdd(e) {
//     e.preventDefault();
//     const cusname = e.target.name.value;
//     const mobile = e.target.mobile.value;
//     const district = e.target.district.value;
//     const trx = e.target.trx.value;
//     const email = e.target.email.value;
//     const upzila = e.target.upzila.value;
//     const address = e.target.address.value;
//     const imageTrx = e.target.imageTrx.files[0];

//     const data = new FormData();
//     data.append("imageTrx", imageTrx);

//     fetch(img_api_key, {
//       method: "POST",
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         const orderObj = {
//           cusname,
//           mobile,
//           district,
//           address,
//           imageTrx: data.data.url || 'dnjnefjfnjnj',
//           image,
//           trx,
//           email,
//           division,
//           upzila
//         };

//         console.log(orderObj);

//         axiosSecure.post("/orders", orderObj).then(() => {
//           Swal.fire({
//             title: "Order Placed",
//             icon: "success",
//           })
//         });
//       });

//     // e.target.reset();
//   }

//   return (
//     <div className="min-h-screen gap-3 flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-white  items-center justify-center py-10 px-4">
//       <form
//         onSubmit={handleAdd}
//         className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl space-y-6"
//       >
//         <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
//           Checkout Page
//         </h2>

//         <div className="flex flex-col md:flex-row gap-1 ">
//         {/* Name */}
//         <div className="w-full">
//           <label className="block text-sm font-semibold text-gray-700">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             requipink
//             placeholder="Your full name"
//             className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>
//                   <div className="w-full">
//             <label className="block text-sm font-semibold text-gray-700">
//               E-mail
//             </label>
//             <input
//               type="email"
//               name="email"
//               requipink
//               placeholder="Gmail "
//               className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//         </div>

//         <div className="flex flex-col md:flex-row gap-1 ">
//           {/* Mobile */}
//           <div className="w-full">
//             <label className="block text-sm font-semibold text-gray-700">
//               Mobile
//             </label>
//             <input
//               type="text"
//               name="mobile"
//               requipink
//               placeholder="e.g. 01XXXXXXXXX"
//               className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           {/* trx */}
//           <div className="w-full">
//             <label className="block text-sm font-semibold text-gray-700">
//               Transection ID
//             </label>
//             <input
//               type="text"
//               name="trx"
//               requipink
//               placeholder="Submit Your Transection ID"
//               className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row gap-1 ">
//           {/* District */}
//           <div className="w-full">
//             <label className="block text-sm font-semibold text-gray-700">
//               District
//             </label>
//             <select
//               name="district"
//               requipink
//               onChange={e=>setDivision(e.target.value)}
//               className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             >
//               <option value="">Select your division</option>
//               <option value="Dhaka">Dhaka</option>
//               <option value="Chattogram">Chattogram</option>
//               <option value="Rajshahi">Rajshahi</option>
//               <option value="Khulna">Khulna</option>
//               <option value="Barisal">Barisal</option>
//               <option value="Sylhet">Sylhet</option>
//               <option value="Rangpur">Rangpur</option>
//               <option value="Mymensingh">Mymensingh</option>
//             </select>
//           </div>

//           <div className="w-full">
//             <label className="block text-sm font-semibold text-gray-700">
//               Upozila
//             </label>
//             <input
//               type="text"
//               name="upzila"
//               requipink
//               placeholder="Write Upozila Name"
//               className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
//         </div>

//         {/* Address */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700">
//             Address
//           </label>
//           <textarea
//             name="address"
//             rows="3"
//             requipink
//             placeholder="Your full delivery address..."
//             className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           ></textarea>
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label className="block text-sm font-semibold text-gray-700">
//             Upload Image (Bkash Payment Screen Shoot)
//           </label>
//           <input
//             type="file"
//             name="imageTrx"
//             accept="image/*"
//             requipink
//             className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />
//         </div>

//         {/* Submit */}
//         <div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-700 transition"
//           >
//             Place Order
//           </button>
//         </div>
//       </form>

//       <div
//         className="relative w-full h-full md:w-2/3 border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
//         aria-modal="true"
//         role="dialog"
//         tabIndex="-1"
//       >
//         <div className="mt-4 space-y-6">
//           <h2>Make Payment Frist then Fill The Form</h2>
//           <ul className="space-y-4">
//             <li className="flex items-center gap-4">
//               <img
//                 alt=""
//                 src={image}
//                 className="size-16 rounded-sm object-cover"
//               />

//               <div>
//                 <h3 className="text-sm text-gray-900 font-semibold">{name}</h3>

//                 <dl className="mt-0.5 space-y-px text-[13px] text-gray-600">
//                   <div>
//                     <dt className="inline">Price: {price} tk</dt>
//                   </div>
//                 </dl>
//               </div>

//               <div className="flex flex-1 items-center justify-end gap-2">

//                 <form>
//                   <label  className="">
//                     {" "}
//                     Quantity{" "}
//                   </label>

//                   <input
//                     type="number"
//                     min="1"
//                     placeholder="1"
//                     onChange={(e) => setQuantity(e.target.value)}
//                     className="h-10 w-16 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-hidden [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
//                   />
//                 </form>
//               </div>
//             </li>

//             <div className="divider"></div>
//             <div className="flex justify-between">
//               <p>Payable Amount: </p>
//               <p>{total} TK</p>
//             </div>
//           </ul>

//           <div className="space-y-4 text-center">
//             <p

//               className="block rounded-sm border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
//             >
//               01814482832
//             </p>

//             <p

//               className="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
//             >
//               Make Payment to Bkash
//             </p>

//             <Link
//               to={"/allproducts"}
//               className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
//             >
//               Back To All Products Page
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useEffect, useState } from "react";
import useAxios from "../Hook/useAxios";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";

const img_hosting = "f00f7709983a82bfc1ca5153ef794386";
const img_api_key = `https://api.imgbb.com/1/upload?key=${img_hosting}`;

const Checkout = () => {
  const axiosSecure = useAxios();
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [division, setDivision] = useState("Dhaka");
  const [item , setItem] = useState(1)

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  const myProduct = product.find((pro) => pro._id == id) || {};
  const { name, price, image } = myProduct || {} ;
  const total = price * quantity;
  const amount = price * item;

  function handleAdd(e) {
    e.preventDefault();
    const cusname = e.target.cusname.value;
    const mobile = e.target.mobile.value;
    const district = e.target.district.value;
    const trx = e.target.trx.value;
    const email = e.target.email.value;
    const upzila = e.target.upzila.value;
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
          item,
          amount,
          name
        };

        console.log(orderObj);

        axiosSecure.post("/orders", orderObj).then(() => {
          Swal.fire({
            title: "Order Placed",
            icon: "success",
          });
        });
      });
  }

  return (
    <div className="min-h-screen gap-3 flex flex-col md:flex-row bg-gradient-to-br from-white to-pink-50 items-center justify-center py-10 px-4">
      <form
        onSubmit={handleAdd}
        className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-pink-200"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-4">
          bKash Payment Page
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
              Quantity
            </label>

            <input
              type="number"
              name="quantiy"
              requipink
              onChange={e=> setItem(e.target.value)}
              placeholder="product quantity"
              className="w-full mt-1 p-3 border border-pink-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              requipink
              disabled
              defaultValue={name}
              placeholder="Product Name"
              className="w-full mt-1 p-3 border bg-gray-100 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
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
            Upload Image (Bkash Payment Screenshot)
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

      <div className="relative w-full h-full md:w-2/3 border border-pink-300 bg-pink-50 px-4 py-8 sm:px-6 lg:px-8 rounded-xl">
        <div className="mt-4 space-y-6">
          <h2 className="text-lg font-semibold text-pink-700">
            Make Payment First then Fill The Form
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <img
                alt=""
                src={image}
                className="size-16 rounded object-cover border"
              />
              <div>
                <h3 className="text-sm text-gray-900 font-semibold">{name}</h3>
                <dl className="mt-0.5 space-y-px text-[13px] text-gray-600">
                  <div>
                    <dt className="inline">Price: {price} tk</dt>
                  </div>
                </dl>
              </div>
              <div className="flex flex-1 items-center justify-end gap-2">
                <form>
                  <label className="text-sm text-gray-600">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="1"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="h-10 w-16 rounded border border-gray-300 bg-white text-center text-sm focus:ring-2 focus:ring-pink-300"
                  />
                </form>
              </div>
            </li>
            <div className="border-t border-pink-200 pt-2"></div>
            <div className="flex justify-between text-gray-700 font-medium">
              <p>Payable Amount:</p>
              <p>{total} TK</p>
            </div>
          </ul>

          <div className="space-y-4 text-center">
            <p
              onClick={() => {
                navigator.clipboard.writeText("01814482832");
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
              01814482832
            </p>

            <p className="block rounded bg-pink-600 px-5 py-3 text-sm text-white hover:bg-pink-700">
              Make Payment to Bkash
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
    </div>
  );
};

export default Checkout;
