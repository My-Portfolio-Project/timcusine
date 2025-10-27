import { create } from "zustand";
import { API_URL } from "../hooks/Api";
import { CartProps } from "../interface/cart.interface";
import { DishProps } from "../interface/dish.interface";

interface CartState {
  carts: CartProps[];
  loading: boolean;
  message: string;
  total: number;
  subtotal: number;

  // Methods
  fetchCart: (userId: string) => Promise<any>;
  addToCart: ( dish: DishProps ) => Promise<any>;
  updateCart: (cartId: string, quantity: number) => Promise<any>;
  removeCart: (cartId: string) => Promise<any>;
  getCartTotal: () => void;
  clearCarts: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  carts: [],
  message: "",
  total: 0,
  subtotal: 0,
  loading: false,

  // 🛒 Fetch all cart items for a user
  fetchCart: async (userId) => {
    set({ loading: true });
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        set({ carts: data, loading: false });
        get().getCartTotal();
        return { success: true, carts: data };
      } else {
        set({ loading: false, message: data?.message || "Failed to fetch cart" });
        return { success: false };
      }
    } catch (error: any) {
      console.error("Fetch carts error:", error);
      set({ loading: false, message: error?.message });
      return { success: false };
    }
  },

  // ➕ Add dish to cart
addToCart: async (dish) => {
  set({ loading: true });
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        dishId: dish.id,
      }),
    });
    console.log('Dishes details', dish);
    //  console.log('User id', userId);

    const data = await response.json();

    if (response.ok) {
      set((state) => {
        const existingItem = state.carts.find(
          (item) => item.dish.id === dish.id
        );

        let updatedCarts: CartProps[];

        if (existingItem) {
          updatedCarts = state.carts.map((item) =>
            item.dish.id === dish.id
              ? { ...item, quantity: item.quantity + 1 } // increase by 1
              : item
          );
        } else {
          updatedCarts = [...state.carts, { id: data.id, dish, quantity: 1 }];
        }

        return { carts: updatedCarts, loading: false };
      });

      get().getCartTotal();
      return { success: true, cart: data };
    } else {
      set({ loading: false, message: data?.message || "Failed to add to cart" });
      return { success: false };
    }
  } catch (error: any) {
    console.error("Add to cart error:", error);
    set({ loading: false, message: error?.message });
    return { success: false };
  }
},

  // 🔄 Update cart item quantity
  updateCart: async (cartId, quantity) => {
    set({ loading: true });
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/cart/${cartId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      const data = await response.json();

      if (response.ok) {
        set((state) => {
          const updated = state.carts.map((item) =>
            item.id === cartId ? { ...item, quantity } : item
          );
          return { carts: updated, loading: false };
        });

        get().getCartTotal();
        return { success: true, cart: data };
      } else {
        set({ loading: false, message: data?.message || "Failed to update cart" });
        return { success: false };
      }
    } catch (error: any) {
      console.error("Update cart error:", error);
      set({ loading: false, message: error?.message });
      return { success: false };
    }
  },

  // 🗑️ Remove cart item
  removeCart: async (cartId) => {
    set({ loading: true });
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/cart/${cartId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        set((state) => ({
          carts: state.carts.filter((item) => item.id !== cartId),
          loading: false,
        }));
        get().getCartTotal();
        return { success: true };
      } else {
        set({ loading: false, message: data?.message || "Failed to remove cart" });
        return { success: false };
      }
    } catch (error: any) {
      console.error("Remove cart error:", error);
      set({ loading: false, message: error?.message });
      return { success: false };
    }
  },

  // 💰 Calculate totals
  getCartTotal: () => {
    const { carts } = get();
    const subtotal = carts.reduce(
      (sum : any, item: any) => sum + (item.dish.price || 0) * (item.quantity || 1),
      0
    );
    const total = subtotal; // Add delivery fee, tax, etc. if needed
    set({ subtotal, total });
  },


  clearCarts: () => {
    set({carts: [] , total:0,subtotal:0})
  }
}));
