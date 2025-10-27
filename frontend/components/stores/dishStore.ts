import { create } from 'zustand';
import { API_URL } from '../hooks/Api';
import { DishProps } from '../interface/dish.interface';
import toast, {} from 'react-hot-toast'

interface DishStore {
  dishes: DishProps[];
  totalPage: number;
  selectedDish: DishProps | null;
  loading: boolean;

  fetchAll: (page?: number, limit?: number) => Promise<void>;
  fetchSingle: (id: string) => Promise<void>;
  createDish: (dish: Partial<DishProps>) => Promise<any>;
  updateDish: (id: string, dish: Partial<DishProps>) => Promise<any>;
  deleteDish: (id: string) => Promise<any>;
  searchDish: (searchTerm: string) => Promise<any>;
}

export const useDishStore = create<DishStore>((set, get) => ({
  dishes: [],
  totalPage: 1,
  selectedDish: null,
  loading: false,

  fetchAll: async (page, limit) => {
    set({ loading: true });
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/dishes?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) set({ dishes: data.dishes, totalPage: data?.totalPage, loading: false });
      else throw new Error(data.message || 'Failed to fetch dishes');
    } catch (error: any) {
      console.error(error);
      set({ loading: false });
    }
  },

  fetchSingle: async (id: string) => {
    set({ loading: true });
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/dishes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) set({ selectedDish: data.dishes, loading: false });
      else throw new Error(data.message || 'Failed to fetch dish');
    } catch (error: any) {
      console.error(error);
      set({ loading: false });
    }
  },

  createDish: async (dish: Partial<DishProps>) => {
    set({ loading: true });
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/dishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dish)
      });
      const data = await res.json();

      if (!res.ok) {
        await get().fetchAll();
        set({ loading: false });
       throw new Error(data.message || 'Failed to create dish');
      }


        set({loading:false})
       return { message: 'Created successfully', success: true}
    } catch (error: any) {
      console.error(error);
      set({ loading: false });
    }
  },

  updateDish: async (id: string, dish: Partial<DishProps>) => {
    set({ loading: true });
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/dishes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dish)
      });
      const data = await res.json();
      if (res.ok) {
        await get().fetchAll();
        set({ loading: false });
           return { message: 'Created successfully', success: true}
      } else throw new Error(data.message || 'Failed to update dish');
    } catch (error: any) {
      console.error(error);
      set({ loading: false });
    }
  },

  deleteDish: async (id: string) => {
    set({ loading: true });
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/dish/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        await get().fetchAll();
        set({ loading: false });
               return { message: 'Created successfully', success: true}
      } else throw new Error(data.message || 'Failed to delete dish');
    } catch (error: any) {
      console.error(error);
      set({ loading: false });
    }
  },
  // ✅ New searchDish function
  searchDish: async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    set({ loading: true });

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/dishes/search?searchTerm=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        set({ dishes: data.data, loading: false });
      } else {
        console.error('Search failed:', data.message);
        set({ loading: false });
      }
    } catch (error: any) {
      console.error('Error searching dishes:', error);
      toast.error(error?.message || 'Error occured')
      set({ loading: false });
    }
  },

}));
