/** @format */

import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import CategoryCard from "./CategoryCard/CategoryCard";

const Category = () => {

  const [category, seCategory] = useState([]);

  useEffect(() => {
    fetch('https://parma-care-client.vercel.app/categories')
    .then(res => res.json())
    .then(data => seCategory(data))
  }, []);

  return (
    <div>
      <SectionTitle
        title={"Producta"}
        subTitle={"All Category"}></SectionTitle>
      <div className="grid md:grid-cols-2 gap-5 max-w-screen-lg mx-auto">
        {
            category.map(item => <CategoryCard key={item._id} category={item}></CategoryCard>)
        }
      </div>
    </div>
  );
};

export default Category;
