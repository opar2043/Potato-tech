import React from "react";
import { motion } from "framer-motion";
const About = () => {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.5, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="bg-gray-50 py-10 px-4 my-10"
    >
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-4xl font-extrabold mb-3 text-blue-700 text-center">
          About Tech Potato
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6 italic">
          Your ultimate destination for performance-focused peripherals
        </p>

        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">Tech Potato</span> –
          your one-stop shop for top-tier keyboards and mice. Whether you're a
          gamer chasing milliseconds, a coder seeking comfort, or just love a
          clean desk setup, Tech Potato brings you a perfect mix of function,
          style, and innovation.
        </p>

        <p className="mt-5 text-gray-700 text-lg leading-relaxed">
          Explore our curated range of mechanical keyboards, ergonomic mice, RGB
          gadgets, and more. With trusted brands, unbeatable prices, and a
          community-driven mission, we’re here to help you level up your desk
          experience. Tech Potato isn’t just a store — it’s where tech meets
          taste.
        </p>
      </div>
    </motion.div>
  );
};

export default About;
