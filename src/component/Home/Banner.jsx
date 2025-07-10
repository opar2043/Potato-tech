import { motion } from "framer-motion";
import img from "../../assets/Potato Tech logo3.jpg";
const Banner = () => {
  return (
    <div className="w-full z-10 bg-[#fff]  rounded-md relative">
      {/* header */}
      <header className="flex lg:flex-row flex-col items-center gap-12 lg:gap-0 justify-between px-8 mt-10 md:gap-4">
        <motion.div
          initial={{ x: 25, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full dark:text-slate-950 lg:w-[45%]"
        >
          <p>Hi there!</p>
          <h1 className="text-[40px] sm:text-[60px] font-semibold leading-[45px] sm:leading-[70px]">
            <span className="text-col">Potato Tech</span> is here to be Your
            Tech partner
          </h1>
        </motion.div>

        <motion.div
          initial={{ x: -25, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 rounded-md"
        >
          {/* <img src="/public/Potato Tech logo.png" alt="image" className=" rounded "/> */}
          <img src={img} alt="image" className=" rounded " />
        </motion.div>
      </header>

      {/* right blur shadow */}
      <div className="w-[100px] h-[100px] bg-color blur-[90px] absolute bottom-[80px] right-[80px]"></div>
    </div>
  );
};

export default Banner;
