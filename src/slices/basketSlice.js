import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {

      const itemId = action.payload?.id

       const index = state.items?.findIndex((item)=>item.id === itemId)
       if(index  > -1){
        const newBasket = [...state.items]
        newBasket[index].quantity += 1
        newBasket[index].subtotal += parseFloat(newBasket[index].price)

        state.items = newBasket



    
       }else{
        state.items = [...state.items, action.payload]
  

       }
      
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((basketItem)=>basketItem.id === action.payload?.id)
      const newBasket = [...state.items]


      if(index >= 0){
        // item exist in basket
        newBasket.splice(index, 1);

      }else{
        // Can't removed product from basket
        console.warn(`Can't remove the product (id ${action.payload.id}) as its not id`)
      };
      state.items = newBasket;

    },
    decrementItemQTYFromBasket: (state, action)=>{
      const itemId = action.payload.id
       const index = state.items.findIndex((item)=> item.id == itemId)
      const newBasket = [...state.items]
      if (newBasket[index].quantity > 1){
        newBasket[index].quantity -= 1
        newBasket[index].subtotal -=  parseFloat(newBasket[index].price)

      }else{
        newBasket.splice(index, 1)
      }
      state.items = newBasket;


    }

  },
});

export const { addToBasket, removeFromBasket, decrementItemQTYFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total, item)=> 
total + item?.subtotal, 0)
export default basketSlice.reducer;
