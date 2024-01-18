"use client";

import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "@/components/AppContext";
import Image from "next/image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MenuItem from "@/components/menu/MenuItem";
import AddToCartButton from "@/components/menu/AddToCartButton";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";


export default function ProductDetailPage({ params }) {
  
  const id = params.id;
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const session = useSession();
  const { status } = session;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await handleItem(id);
        setResults(res);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const handleItem = async (id) => {
    const response = await fetch(`http://localhost:3000/api/product?id=${id}`);
    const results = await response.json();
    console.log(results);
    return results;
  };

  async function handleAddToCartButtonClick() {
    if (status === "authenticated") {
      addToCart(results?.menuItem);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Successfully added!");
    } else {
      toast.error("Not authenticated! Please login!");
    }
  }

  return (
    <div className="w-full">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center mt-5">
          <SkeletonTheme width="400px" height="50px">
            <Skeleton count={6} />
          </SkeletonTheme>
        </div>
      ) : (
        <>
          <div className="p-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-5xl mx-auto md:space-x-6">
            <Image
              src={results?.menuItem?.image}
              width={500}
              height={300}
              alt="image"
              className="rounded-lg"
              style={{ maxWidth: "100%", height: "100%" }}
            />
            <div className="p-2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {results?.menuItem?.name}
              </h2>
              <p className="flex items-center text-lg">
                <span className="font-semibold mr-1">Authors : </span>
                {results?.menuItem?.authors}{" "}
              </p>
              <p className="mb-3 text-lg">
                <span className="font-semibold mr-1">Description : </span>
                {results?.menuItem?.description}
              </p>
              <p className=" text-lg">
                <span className="font-semibold mr-1">Category : </span>
                {results?.menuItem?.category}
              </p>
              <p className="flex items-center text-lg">
                <span className="font-semibold mr-1">Price : </span>
                {results?.menuItem?.basePrice}{" "}
              </p>
            </div>
          </div>{" "}
          <div className="w-56 flex items-center">
            <AddToCartButton
              onClick={handleAddToCartButtonClick}
              basePrice={results?.menuItem?.basePrice}
            />
          </div>
          <div className="p-4 md:pt-8 items-center content-center max-w-5xl mx-auto md:space-x-6">
            <h2 className="text-2xl font-semibold mr-1 p-2">Relative</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {results?.relative?.map((item) => (
                <MenuItem key={item._id} {...item} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
