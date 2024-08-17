import { Button, Option, Select } from "@material-tailwind/react";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function AdminProducts() {
  const [data, setData] = useState([]); // Initialize as an empty array
  const refs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://halal-bro-server.vercel.app/api/v2/products');
        if (res.status === 200 && Array.isArray(res.data.data)) {
          setData(res.data.data);
          console.log(res.data.data); // Log fetched data
        } else {
          console.error("Unexpected data format:", res.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []); // Empty dependency array to run effect only once

  useEffect(() => {
    // Define the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in', 'scale-up');
          // Optionally unobserve the element after animation
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
      
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

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="heading new-amsterdam-regular text-4xl sm:text-5xl md:text-6xl text-center m-10">
        PRODUCTS
      </h1>

      <div className="container mx-auto px-4">
  <>
          <div className="w-72">
              <Select
                label="Select Category"
                
              >
                <Option value="Pant">Pant</Option>
                <Option value="Shirt">Shirt</Option>
                <Option value="T-Shirt">T-Shirt</Option>
                <Option value="Slipper">Slipper</Option>
              </Select>
            </div>
            </>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
         {
 <>
         
          {data.map((item, index) => (
          <div
            key={index}
            ref={(el) => (refs.current[index] = el)}
            className=" p-4 transition-transform duration-500 flex"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard key={data._id} product={item} className="hero-loop" />
          </div>
        ))}</>
        }

      </div>
      </div>

      <div className="flex justify-center mt-5">
        <Button>See More</Button>
      </div>
    </div>
  );
}
