import About from "../../Components/About";
import Category from "./Category/Category";
import Slider from "./Slider/Slider";


const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Category></Category>
            <About></About>
        </div>
    );
};

export default Home;