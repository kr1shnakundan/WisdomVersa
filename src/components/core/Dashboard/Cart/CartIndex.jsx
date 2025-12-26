import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
import HighlightText from "../../HomePage/HighlightText";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="mx-auto w-11/12 max-w-[1200px] py-10 text-richblack-5">
      
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-semibold">My Cart</h2>
        <p className="mt-2 text-richblack-400 font-medium border-b border-richblack-700 pb-3">
          <HighlightText text={totalItems} /> Courses in Cart
        </p>
      </div>

      {/* Content */}
      {total > 0 ? (
        <section className="flex flex-col-reverse gap-8 lg:flex-row">
          {/* Left: Cart Items */}
          <div className="flex-1">
            <RenderCartCourses />
          </div>

          {/* Right: Total */}
          <div className="w-full lg:w-[300px]">
            <RenderTotalAmount />
          </div>
        </section>
      ) : (
        <p className="mt-20 text-center text-2xl text-richblack-300">
          Your cart is empty
        </p>
      )}
    </div>
  );
}
