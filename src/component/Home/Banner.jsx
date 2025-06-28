

const Banner = () => {

    return (
        <div className="w-full bg-[#fff]  rounded-md relative">

            {/* header */}
            <header
                className="flex lg:flex-row flex-col items-center gap-12 lg:gap-0 justify-between px-8 mt-10 md:gap-4">

                <div className="w-full dark:text-slate-950 lg:w-[45%]">
                    <p>Hi there!</p>
                    <h1 className="text-[40px] sm:text-[60px] font-semibold leading-[45px] sm:leading-[70px]">
                        <span className="text-col">Potato Tech</span> is here to be Your Tech partner</h1>
                </div>

                <div className="w-full md:w-1/2 rounded-md">
                    <img src="/public/Potato Tech logo.png" alt="image" className=" rounded "/>
                </div>
            </header>

            {/* <section className="px-8 pb-[30px] mt-8">
                <h1 className="text-[1.3rem] font-semibold">Our Service</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-10 w-[70%]">
                    <div>
                        <img src="https://i.ibb.co/z721j8b/Vector.png" alt="Vector" className="w-[30px]"/>
                        <h4 className="text-[1.1rem] dark:text-[#abc2d3] mt-3">Branding</h4>
                        <p className="text-[0.9rem] text-gray-500 mt-1 dark:text-slate-400">Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit.</p>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/Qn78BRJ/Ui-Design.png" alt="Vector"
                             className="w-[30px]"/>
                        <h4 className="text-[1.1rem] dark:text-[#abc2d3] mt-3">UI/UX</h4>
                        <p className="text-[0.9rem] text-gray-500 mt-1 dark:text-slate-400">Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.</p>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/GcsvXxk/Product.png" alt="Vector"
                             className="w-[30px]"/>
                        <h4 className="text-[1.1rem] dark:text-[#abc2d3] mt-3">Product Design</h4>
                        <p className="text-[0.9rem] text-gray-500 mt-1 dark:text-slate-400">Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.</p>
                    </div>
                </div>
            </section> */}

            {/* right blur shadow */}
            <div className="w-[100px] h-[100px] bg-color blur-[90px] absolute bottom-[80px] right-[80px]"></div>
        </div>
    );
};

export default Banner;
                    