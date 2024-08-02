/** @format */

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./about.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import SectionTitle from "./SectionTitle/SectionTitle";

const About = () => {
  return (
    <div className="w-1/2 mx-auto">
      <SectionTitle
        title={"Testimonial"}
        subTitle={"Our client review"}></SectionTitle>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper">
        <SwiperSlide>
          <div className="border border-[#66BC89]">
            <div className="space-y-2 p-5 rounded-lg border-2 border-[#66BC89]">
              <div className="w-[200px] mx-auto">
                <img
                  className="rounded-xl"
                  src="https://i.ibb.co/B67h8Q6/christian-buehner-DIt-Ylc26z-VI-unsplash-1.jpg"
                  alt=""
                />
              </div>
              <h2 className="text-lg font-semibold">Name: Sarah Johnson</h2>
              <h5>
                <span className="font-semibold">Position:</span> Marketing
                Manager
              </h5>
              <h6>
                <span className="font-semibold">Company:</span> ABC Corp
              </h6>
              <p>
                Using this service has transformed our business. The
                user-friendly interface and excellent customer support have made
                it easy to integrate into our daily operations. We have seen a
                significant increase in productivity and efficiency. Highly
                recommend!
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="border border-[#66BC89]">
            <div className="space-y-2 p-5 rounded-lg border-2 border-[#66BC89]">
            <div className="w-[200px] mx-auto">
                <img
                  className="rounded-xl"
                  src="https://i.ibb.co/qDkV1GP/jonas-kakaroto-KIPqvv-TOC1s-unsplash.jpg"
                  alt=""
                />
              </div>
              <h2 className="text-lg font-semibold">Name: Sarah Johnson</h2>
              <h5>
                <span className="font-semibold">Position:</span> Marketing
                Manager
              </h5>
              <h6>
                <span className="font-semibold">Company:</span> ABC Corp
              </h6>
              <p>
                Using this service has transformed our business. The
                user-friendly interface and excellent customer support have made
                it easy to integrate into our daily operations. We have seen a
                significant increase in productivity and efficiency. Highly
                recommend!
              </p>
            </div>
          </div>
        </SwiperSlide>
        
      </Swiper>
    </div>
  );
};

export default About;
