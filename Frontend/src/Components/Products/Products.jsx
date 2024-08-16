import { Button } from "@material-tailwind/react";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Products() {
  const [data, setData] = useState([]); // Initialize as an empty array
  const refs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v2/products');
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
<<<<<<< HEAD
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10 w-full px-4 sm:px-6 md:px-10 py-5 lg:px-24">
        {data.map((item, index) => (
          <div
            key={index}
            ref={(el) => (refs.current[index] = el)}
            className=" p-4 transition-transform duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard key={data._id} product={item} />
          </div>
        ))}
=======
      <div className="grid justify-center items-center md:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10 w-full px-4 sm:px-6 md:px-10 py-5 lg:px-24">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true}}
            >
              <ProductCard />
            </motion.div>
          ))}
>>>>>>> d86d9e9304e3b7f3b207d58f5e40995ec4d40bff
      </div>

      <div className="flex justify-center mt-5">
        <Button>See More</Button>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======
   
>>>>>>> d86d9e9304e3b7f3b207d58f5e40995ec4d40bff
