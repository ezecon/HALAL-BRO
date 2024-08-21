import { Button, Option, Select } from "@material-tailwind/react";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ComNavbar from "../Layoout/CommonNavbar/ComNavbar";
import { Link } from "react-router-dom";

export default function Products({ isHome }) {
  const [data, setData] = useState([]); // Initialize as an empty array
  const refs = useRef([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://halal-bro-server.vercel.app/api/v2/products");
        if (res.status === 200 && Array.isArray(res.data.data)) {
          setData(res.data.data);
          console.log(res.data.data); // Log fetched data
        } else {
          console.error("Unexpected data format:", res.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Empty dependency array to run effect only once

  useEffect(() => {
    // Define the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in", "scale-up");
            // Optionally unobserve the element after animation
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe each element
    refs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // Clean up observer on component unmount
    return () => {
      refs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [data]); // Dependency on data to apply observer after data is fetched

  if (loading) {
    return  <div className="flex flex-col justify-center items-center h-screen bg-black gap-y-4"><span className="loader1"></span><span className="text-white font-bold common">Products Loading...</span></div>;
  }

  return (
    <div>
      {!isHome && <ComNavbar />}
      <div className="flex flex-col items-center w-full">
        <h1 className="heading new-amsterdam-regular text-4xl sm:text-5xl md:text-6xl text-center m-10">
          PRODUCTS
        </h1>

        <div className="container mx-auto">
          {!isHome && (
            <div className="w-72">
              <Select label="Select Category">
                <Option value="Pant">Pant</Option>
                <Option value="Shirt">Shirt</Option>
                <Option value="T-Shirt">T-Shirt</Option>
                <Option value="Slipper">Slipper</Option>
              </Select>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {isHome
              ? data.slice(0, 10).map((item, index) => (
                  <div
                    key={item._id}
                    ref={(el) => (refs.current[index] = el)}
                    className="p-4 transition-transform duration-500 flex"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard product={item} className="hero-loop" />
                  </div>
                ))
              : data.map((item, index) => (
                  <div
                    key={item._id}
                    ref={(el) => (refs.current[index] = el)}
                    className="p-4 transition-transform duration-500 flex"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard product={item} className="hero-loop" />
                  </div>
                ))}
          </div>
        </div>
        {isHome && (
          <div className="flex justify-center mt-5">
            <Link to="/products">
              <Button>See More</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
