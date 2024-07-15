/** @format */

import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./discount.css";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const DisCountProducts = () => {
  const [products, setProducts] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosPublic.get("/discount-products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching discount products:", error);
      }
    };
    getData();
  }, [axiosPublic]);
  console.log(products);
  return (
    <div className="my-20 px-2 md:px-5">
      <SectionTitle
        subTitle={"Discount products"}
        title={"Today's Top Deals"}></SectionTitle>
      <div>
        <Swiper
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            type: "fraction",
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper my-5 h-full w-full">
          {products?.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="card image-full shadow-xl">
                <div className="h-[300px] rounded-xl">
                <img
                className="object-fill"
                    src={product?.image}
                    alt="image"
                  />
                </div>
                <div className="card-body">
                  <h2 className=""><span className="font-semibold">Name : </span>{product.name}</h2>
                  <p><span className="font-semibold">Category : </span>{product.category}</p>
                  <p><span className="font-semibold">Description : </span>{product.description}</p>
                  <div className="card-actions justify-center ">
                    <button className="btn btn-sm bg-[#66BC89] border-[#66BC89] border text-white font-semibold">Buy Now</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DisCountProducts;
