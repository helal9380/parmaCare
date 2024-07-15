import About from "../../Components/About";
import Category from "./Category/Category";
import DisCountProducts from "./DisCountProducts/DisCountProducts";
import Slider from "./Slider/Slider";
import Testimonials from "./Testimolials/Testimonials";


const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Category></Category>
            <DisCountProducts></DisCountProducts>
            <About></About>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;