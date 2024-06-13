/** @format */

import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  console.log(category);
  const { category: cate, image, medicineCount } = category;
  return (
    <div className="flex gap-5 items-center p-2 border-2 border-[#66BC89] rounded-md">
      <div className="w-1/2 ">
        <figure>
          <img
            className="rounded-md"
            src={image}
            alt="Movie"
          />
        </figure>
      </div>
      <div className="flex-1 space-y-2">
        <h2 className=""> <span className="font-semibold">Name :</span> {cate}</h2>
        <h4><span className="font-semibold">Total Medicine :</span> {medicineCount}</h4>
        <div className="justify-end">
          <Link to={`/category/${cate}`} className="py-2 px-5 bg-[#66BC89] text-white font-semibold rounded-xl">More..</Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
