import React from 'react';
import {
  FaTools,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt,
  FaTimesCircle,
} from 'react-icons/fa';
import Title from '../Shared/Title';

const Policy = () => {
  return (
    <div className="w-full mx-auto px-6 py-12 text-gray-800">
      {/* Page Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-col flex justify-center items-center gap-3 mb-3">
          <FaShieldAlt className="text-4xl" />
          Warranty Policy – Potato Tech
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We’re committed to providing transparent and dependable after-sales support. Please review our warranty coverage by product category below.
        </p>
      </div>

      {/* General Warranty */}
      <div className="bg-white border-l-4 border-pink-500 shadow-md rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          🛡 General Product Warranty
        </h2>
        <p className="text-gray-700 text-base">All products come with a <strong>365-day warranty</strong> from the date of purchase.</p>
      </div>

      {/* Policy Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Instant Replacement */}
        <div className="bg-white border border-green-100 rounded-2xl p-6 shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3">
            <FaCheckCircle className="text-green-600 text-2xl" />
            <h3 className="text-xl font-semibold text-green-700">
              Instant Replacement (First 7 Days)
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            If your product has any issue within <strong>the first 7 days</strong> of purchase, you’re eligible for an <strong>instant replacement</strong>, subject to inspection and warranty conditions.
          </p>
        </div>

        {/* Repair First Policy */}
        <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-3">
            <FaTools className="text-blue-600 text-2xl" />
            <h3 className="text-xl font-semibold text-blue-700">
              Repair-First Policy (Day 8 to Day 365)
            </h3>
          </div>
          <ul className="text-gray-700 list-disc ml-5 space-y-2">
            <li>We will first attempt to repair the product by replacing faulty parts.</li>
            <li>If repair isn’t possible:
              <ul className="list-disc ml-5 space-y-1">
                <li>Same product replacement (if in stock).</li>
                <li>Offer a similar/higher-value product (customer pays difference).</li>
                <li>Option to wait for restock or receive 75% refund (per BCS rules).</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>


<div className="flex flex-col md:flex-row w-full gap-6 mt-10">
  {/* No Warranty Section */}
  <div className="flex-1 bg-white border border-red-100 rounded-2xl p-6 shadow-md">
    <div className="flex items-center gap-3 mb-3">
      <FaTimesCircle className="text-red-500 text-2xl" />
      <h3 className="text-xl font-semibold text-red-600">No Warranty On</h3>
    </div>
    <ul className="list-disc ml-6 text-gray-700 space-y-1">
      <li>Kit products</li>
      <li>Custom imported items</li>
      <li>Accessories like switches</li>
    </ul>
  </div>

  {/* Important Notes */}
  <div className="flex-1 bg-yellow-50 border border-yellow-300 rounded-2xl p-6 shadow-md mt-6 md:mt-0">
    <div className="flex items-center gap-3 mb-3">
      <FaExclamationTriangle className="text-yellow-600 text-2xl" />
      <h3 className="text-xl font-semibold text-yellow-800">Important Notes</h3>
    </div>
    <ul className="list-disc ml-6 text-gray-700 space-y-2">
      <li>
        Warranty is void in cases of:
        <ul className="list-disc ml-5 mt-1 space-y-1">
          <li>Physical damage</li>
          <li>Water or liquid damage</li>
          <li>Fungal, burn, or over-voltage damage</li>
          <li>Unauthorized repairs or modifications</li>
        </ul>
      </li>
      <li>
        <strong>Proof of purchase</strong> is required to claim warranty support.
      </li>
    </ul>
  </div>
</div>





    </div>
  );
};

export default Policy;
