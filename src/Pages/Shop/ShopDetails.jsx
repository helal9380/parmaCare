import { useLoaderData } from "react-router-dom";


const ShopDetails = () => {
    const data = useLoaderData()
    console.log(data);
    return (
        <div>
            <h2>this is shop page details</h2>
        </div>
    );
};

export default ShopDetails;