import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
        
      );
      
      
      if (existingIndex >= 0) {
        
        if (state.cartItems[existingIndex].quantity < 5) {
          state.cartItems[existingIndex] = {
            ...state.cartItems[existingIndex],
            quantity: state.cartItems[existingIndex].quantity + 1,
          };

          toast.info("Increased product quantity", {
            position: "bottom-left",
          });
        } else {
          toast.warning("Maximum quantity reached (5)", {
            position: "bottom-left",
          });
        }
      } else {
        let tempProductItem = { ...action.payload,quantity:1};
        state.cartItems.push(tempProductItem);
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }



      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );

        state.cartItems = nextCartItems;

        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem._id === action.payload._id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item._id !== cartItem._id
          );

          state.cartItems = nextCartItems;

          toast.error("Product removed from cart", {
            position: "bottom-left",
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    




    


    


    getTotals(state, action) {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
    
          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;
  
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
    
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = parseFloat(total.toFixed(2));
    },
   
    
    



    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      
    },
  },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
  cartSlice.actions;

  
    export default cartSlice.reducer;


