/** @format */

import { FaLongArrowAltRight } from "react-icons/fa";

const About = () => {
  return (
    <div>
 
      <div className="text-center">
        <h2 className="text-3xl font-semibold my-4">
          About 
          <span className="text-[#b65a18]">Us</span>
        </h2>
        <p className="md:w-1/2 mx-auto mb-5">
        Barbiturates are a class of depressant drugs that are chemically derived from barbituric acid. They are effective when used medically as anxiolytics, hypnotics, {" "}
        </p>
      </div>
      <div className="md:flex justify-center">
        <div className="md:w-1/2">
          <img
            src="https://i.ibb.co/0t9Pj6D/apostolos-vamvouras-t-Un-Mg-IHHTQY-unsplash.jpg"
            alt=""
          />
        </div>
        <div className="md:w-1/2">
          <div className=" text-white bg-[#4f311b] right-0 w-full h-full">
            <div className="px-10 py-5">
              <h2 className="">Parma Care</h2>
              <p>
              Barbiturates are a class of depressant drugs that are chemically derived from barbituric acid. They are effective when used medically as anxiolytics, hypnotics, and anticonvulsants, but have physical and psychological addiction potential as well as overdose potential among other possible adverse
              </p>
            
              <div className="flex justify-between">
                <p className="flex gap-3 items-center">
                  {" "}
                  <FaLongArrowAltRight /> <span>Complete Savety Analysis</span>
                </p>
                <p className="flex gap-3 items-center">
                  {" "}
                  <FaLongArrowAltRight /> <span>Open 7 days a week</span>
                </p>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
