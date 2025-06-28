// import React, { useEffect, useState } from 'react'
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import { Rating } from "@smastrom/react-rating";
// import "@smastrom/react-rating/style.css";
// import Swal from 'sweetalert2';
// import Title from '../Shared/Title';
// import { GoCodeReview } from 'react-icons/go';

// const Review = () => {
//     const [review , setReviews] = useState();
//     const [rating , setrating] = useState(5);
//     const user = true;
//     useEffect(()=>{
//         fetch('/review.json')
//         .then(res => res.json())
//         .then(data => setReviews(data))
//     },[])

//     function handleSubmit(e){
//         e.preventDefault()
//     document.getElementById("my_modal_1").close();
//     e.target.reset()
//     }


//       function handleClose(){
//     Swal.fire({
//       title: "Log In Frist",
//       icon: "error",
//       draggable: true
//     });
//   }
//   return (
//     <div>
//         <div className="mt-5 md:mt-24">
//       {/* <Toaster position="top-center" /> */}
//       {/* Modal Start */}
//       {/* Open the modal using document.getElementById('ID').showModal() method */}

//       <dialog id="my_modal_1" className="modal">
//         <div className="modal-box">
//           {/* Form start */}
//           <div className="card bg-base-100 w-full shrink-0 shadow-2xl justify-center border">
//             <form onSubmit={handleSubmit} className="card-body w-full">
//             <form method="dialog">
//       {/* if there is a button in form, it will close the modal */}
//       <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//     </form>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Rating</span>
//                 </label>
//                 <select onChange={e=> setrating(e.target.value)} className="select select-bordered" required>
//                   <option value="">Select a rating</option>
//                   <option value='1'>1 - Poor</option>
//                   <option value="2">2 - Fair</option>
//                   <option value="3">3 - Good</option>
//                   <option value="4">4 - Very Good</option>
//                   <option value="5">5 - Excellent</option>
//                 </select>
//               </div>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Review</span>
//                 </label>
//                 <textarea
//                   className="textarea textarea-bordered"
//                   rows="4"
//                   name="review"
//                   placeholder="Write your review here..."
//                   required
//                 ></textarea>
//               </div>

//               <button className="btn form-control btn-primary">Submit Review</button>
//             </form>
//           </div>

//           {/* Form finished */}
//         </div>
//       </dialog>
//       {/* Modal Finished */}

//       <Title head={"Our Customers"} head2={"Review"}></Title>
//       <div className="md:w-3/4 w-full mx-auto">
//         <Swiper
//           spaceBetween={30}
//           centeredSlides={true}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           pagination={{
//             clickable: true,
//           }}
//           navigation={true}
//           modules={[Autoplay, Pagination, Navigation]}
//           className="mySwiper"
//         >
//           {review &&
//             review.map((item, idx) => (
//               <SwiperSlide
//                 key={idx}
//                 className="bg-white shadow-md rounded-lg p-6 text-center my-3"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-20 h-20 mx-auto rounded-full border-2 border-indigo-500"
//                 />
//                 <h3 className="mt-3 text-lg font-semibold text-gray-800 mb-2">
//                   <span className="px-2 py-1 text-xs bg-slate-800 rounded-full text-white">
//                     {idx + 1}
//                   </span>{" "}
//                   {item.name}
//                 </h3>
//                 <div className="w-40 mx-auto">
//                   <Rating
//                     value={item.rating}
//                     edit={false}
//                     size={2}
//                     activeColor="#ffd700"
//                   />
//                 </div>
//                 <p className="mt-3 text-gray-600 text-sm">{item.review}</p>
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       </div>
//       {
//         !user ? 
//         <div className="flex justify-end mr-16 ">
//         <button onClick={handleClose}  className="btn bg-slate-900 text-white hover:text-black btn-wide"> <GoCodeReview /> Review US</button>
//         </div>
//          :
//         <div className="flex justify-end mr-16 ">
//         <button
//           className="btn btn-wide bg-slate-900 text-white hover:text-black"
//           onClick={() => document.getElementById("my_modal_1").showModal()}
//         >
//           <GoCodeReview />
//           Review US
//         </button>
//       </div>
//       }
//     </div>
//     </div>
//   )
// }

// export default Review




import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Swal from 'sweetalert2';
import Title from '../Shared/Title';
import { GoCodeReview } from 'react-icons/go';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const user = true;

  useEffect(() => {
    fetch('/review.json')
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    document.getElementById("my_modal_1").close();
    e.target.reset();

    Swal.fire({
      icon: 'success',
      title: 'Thank you!',
      text: 'Your review has been submitted.',
      timer: 2000,
      showConfirmButton: false
    });
  }

  function handleClose() {
    Swal.fire({
      title: "Please log in first",
      icon: "error"
    });
  }

  return (
    <div className="mt-10 md:mt-24 px-4">
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box relative">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-4">Submit Your Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Rating</span>
              </label>
              <select
                onChange={e => setRating(parseInt(e.target.value))}
                className="select select-bordered w-full"
                required
              >
                <option value="">Select a rating</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Review</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows="4"
                name="review"
                placeholder="Write your review here..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full">Submit</button>
          </form>
        </div>
      </dialog>

      <Title head={"Our Customers"} head2={"Review"} />

      <div className="md:w-3/4 w-full mx-auto">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {reviews.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white p-6 rounded-xl shadow-md text-center space-y-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 mx-auto rounded-full border-2 border-blue-500"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  <span className="text-xs bg-gray-800 text-white rounded-full px-2 py-0.5 mr-2">
                    #{idx + 1}
                  </span>
                  {item.name}
                </h3>
                <div className="flex justify-center">
                  <Rating value={item.rating} readOnly style={{ maxWidth: 120 }} />
                </div>
                <p className="text-gray-600 text-sm">{item.review}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={
            user
              ? () => document.getElementById("my_modal_1").showModal()
              : handleClose
          }
          className="btn btn-wide bg-slate-900 text-white hover:bg-white hover:text-black flex items-center gap-2"
        >
          <GoCodeReview className="text-xl" /> Review Us
        </button>
      </div>
    </div>
  );
};

export default Review;
