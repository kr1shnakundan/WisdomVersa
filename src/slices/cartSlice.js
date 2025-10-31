import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? 
    JSON.parse(localStorage.getItem("totalItems"))
    :null
}

const cartSlice = createSlice({

    name:"cart",
    initialState:initialState,
    reducers:{

        //add to cart
        addToCart:(state,action)=>{
            const course = action.payload
            const index = state.cart.findIndex((item) => item._id === course._id)

            if(index >= 0 ){
                //if the items is already in the cart , do not modify the quantity
                toast.error("Course already in cart")
                return
            }

            //push course in cart
            state.cart.push(course)

            //update the total quantity and price
            state.totalItems++
            state.total += course.price

            //update to localStorage
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("total",JSON.stringify(state.total))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

            //show toast
            toast.success("Course added to cart")

        },
        
        //remove from Cart
        removeFromCart : (state,action) =>{
            const course = action.course
            const index = state.cart.findIndex((index)=> index._id === course._id)

            //if no course exist in the return error
            if(index >= 0 ){
                
                //decrease totalItems by 1
                state.totalItems--
                //remove the course price that was in the cart(not the modified after adding this course to cart) from the cart
                state.total -= state.cart[index].price
                //remove the course at the index position from the cart
                state.cart.splice(index,1)

                //remove from localstorage
                localStorage.setItem("cart",JSON.stringify(state.cart))
                localStorage.setItem("total",JSON.stringify(state.total))
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems))

                //send toast
                toast.success("Course removed from Cart")


            } else{
                toast.error("Nothing in cart")
                return
            }

        },

        //reset Cart
        resetCart : (state,action) =>{
            state.cart = []
            state.total = 0
            state.totalItems = 0
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.totalItems("totalItems")
        }
        
    }
});

export const {addToCart , removeFromCart , resetCart} = cartSlice.actions;
export default cartSlice.reducer;
