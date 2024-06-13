/** @format */
import { Typewriter } from "react-simple-typewriter";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import "./slide.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { useEffect, useState } from "react";

const Slider = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  console.log(products);
  return (
    <div>
      <Swiper
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Autoplay, Pagination]}
        loop={true}>
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${product?.image})`, backgroundPosition: 'center', backgroundSize: 'cover',}} className="slide ">
              <div
                data-aos="fade-down"
                data-aos-duration="1000"
                className=" text-white md:w-[70%] mx-auto text-center">
                <h2 className="md:text-2xl lg:text-6xl leading-snug text-2xl font-bold mb-3">
                  <span className="text-[#66BC89]">Welcome to .</span>
                  <Typewriter
                    loop
                    cursor
                    words={["Parma", "Care", "Medicine", "Product"]}
                    cursorStyle="|"
                  />
                </h2>

                <p className="mb-5 hidden md:block text-white">
                  Step into a world where the beauty of nature intertwines with
                  exquisite craftsmanship. At TimberGem, we celebrate the
                  timeless elegance of wood through our curated collection of
                  handcrafted treasures.
                </p>
                <a
                  href="#hospitality"
                  className="py-2 px-4 border border-[#66BC89] rounded-lg font-bold">
                  Explore Now
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
     
      </Swiper>
    </div>
  );
};

export default Slider;
