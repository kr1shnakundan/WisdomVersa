import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'

//------------------------------------------Cart and it's component is not checked in working phase----------------
export default function Cart () {
    const {total , totalItems} = useSelector((state)=>state.Cart || { total: 0 })
  return (
    <div>
        <h2>My Cart</h2>
        <p>
            {totalItems} Courses in Cart
        </p>

        {total > 0 ? (
            <section>
            <RenderCartCourses/>
            <RenderTotalAmount />
            </section>
        ):(
            <p className="mt-14 text-center text-3xl text-richblack-100">
            Your cart is empty
            </p>
        )}
    </div>
  )
}