import { Button } from "@material-tailwind/react";
import ProductCard from "../ProductCard/ProductCard";
import { motion } from "framer-motion";

export default function Products() {
  return (
    <motion.div
      className="flex flex-col items-center w-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h1 className="heading new-amsterdam-regular text-4xl sm:text-5xl md:text-6xl text-center m-10">
        PRODUCTS
      </h1>
      <div className="grid justify-center items-center md:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10 w-full px-4 sm:px-6 md:px-10 py-5 lg:px-24">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: false }}
            >
              <ProductCard />
            </motion.div>
          ))}
      </div>

      <div className="flex justify-center mt-5">
        <Button>See More</Button>
      </div>
    </motion.div>
  );
}
   