import React from "react";
import Title from "../Shared/Title";
import { FaBolt, FaCheckCircle, FaHandshake, FaTruck } from "react-icons/fa";

const Achivment = () => {
  return (
    <div className="my-8 md:my-20 px-4 w-full  mx-auto">
      <Title head={"We"} head2={"Ensure"} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
        {/* Quality */}
        <div className="flex  flex-col items-center text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
          <FaCheckCircle className="text-pink-500 text-5xl mb-4" />
          <h2 className="text-xl font-semibold">Quality</h2>
          <p className="text-gray-600 mt-2">
            We maintain premium product quality and service assurance.
          </p>
        </div>

        {/* Honesty */}
        <div className="flex  flex-col items-center text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
          <FaHandshake className="text-blue-500 text-5xl mb-4" />
          <h2 className="text-xl font-semibold">Honesty</h2>
          <p className="text-gray-600 mt-2">
            Transparency and integrity are at the core of our service.
          </p>
        </div>

        {/* Fast Delivery */}
        <div className="flex  flex-col items-center text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
          <FaTruck className="text-green-500 text-5xl mb-4" />
          <h2 className="text-xl font-semibold">Fast Delivery</h2>
          <p className="text-gray-600 mt-2">
            We ensure timely and reliable delivery to your doorstep.
          </p>
        </div>

        {/* Fast Response */}
        <div className="flex  flex-col items-center text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
          <FaBolt className="text-yellow-500 text-5xl mb-4" />{" "}
          {/* ⚡ Better icon for speed */}
          <h2 className="text-xl font-semibold">Fast Response</h2>
          <p className="text-gray-600 mt-2">
            Our team is always ready to respond quickly to your needs and
            questions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Achivment;
