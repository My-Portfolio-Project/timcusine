import { create } from 'zustand';
import { API_URL } from '../hooks/Api';
import toast from 'react-hot-toast';
import { OrderProps } from '../interface/order.interface';

interface OrderStore {
  orders: OrderProps[];           
  selectedOrder: OrderProps | null; 
  totalPage: number;
  loading: boolean;

  fetchAll: (page?: number, limit?: number) => Promise<void>;
  fetchSingle: (id: string) => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  selectedOrder: null,
  totalPage: 1,
  loading: false,

  
  fetchAll: async (page = 1, limit = 10) => {
    set({ loading: true });
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${API_URL}/order?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to fetch orders');

      set({
        orders: data.orders || [],
        totalPage: data.totalPage || 1,
        loading: false,
      });
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast.error(error.message || 'Error fetching orders');
      set({ loading: false });
    }
  },

  // ✅ Fetch single order by ID
  fetchSingle: async (id: string) => {
    set({ loading: true });
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${API_URL}/order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to fetch order');

      set({ selectedOrder: data.order, loading: false });
    } catch (error: any) {
      console.error('Error fetching order:', error);
      toast.error(error.message || 'Error fetching order');
      set({ loading: false });
    }
  },
}));
