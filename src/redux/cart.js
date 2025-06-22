function cart(state = [], action) {
  switch (action.type) {
    case "ADD_ITEM":
      if (state.length === 0) {
        return [{ ...action.payload, quantity: 1 }];
      }
      const found = state.find((item) => item.id === action.payload.id);

      if (!found) {
        return [...state, { ...action.payload, quantity: 1 }];
      }

      return state.map((item) => {
        if (item.id !== action.payload.id) {
          return item;
        }
        return { ...action.payload, quantity: ++item.quantity };
      });

    case "REDUCE_QUANTITY":
      const itemToRemove = state.find((item) => item.id === action.payload.id);
      if (itemToRemove.quantity > 1) {
        return state.map((item) => {
          if (item.id === action.payload.id && item.quantity > 1) {
            return { ...action.payload, quantity: --item.quantity };
          }
          return item;
        });
      }
      return state.filter((item) => item.id !== action.payload.id);

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);
    case "REMOVE_ALL_ITEMS":
      return [];
    default:
      return state;
  }
}

export default cart;
