/** @format */
import { useEffect, useState } from "react";

const useMenu = () => {
  const [populer, setPopuler] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch("https://parma-care-client.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => {
        setPopuler(data);
        setLoading(false)
      });
  }, []);
  return [populer,setPopuler, loading]
};
export default useMenu;
