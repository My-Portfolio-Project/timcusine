import { create } from "zustand";
import { API_URL } from "../hooks/Api";
import { useAuthStore } from "./authStore";
import { UserProps } from "../interface/user.interface";



interface UserState {
  loading: boolean;
  message: string;
  users: UserProps[];
  user: UserProps | null;

  // Actions
  createUser: (payload: {
    fullName: string;
    email: string;
    password: string;
    role?: string;
  }) => Promise<{ success: boolean; message: string }>;

  userProfile: () => Promise<{ success: boolean; message: string }>;

  fetchAllUsers: () => Promise<{ success: boolean; users?: UserProps[] }>;

  fetchSingleUser: (id: string) => Promise<{ success: boolean; user?: UserProps }>;

  updateUser: (
    id: string,
    data: Partial<UserProps>
  ) => Promise<{ success: boolean; message: string }>;

  deleteUser: (id: string) => Promise<{ success: boolean; message: string }>;
}

export const useUserStore = create<UserState>((set) => ({
  loading: false,
  message: "",
  users: [],
  user: null,

  // CREATE USER
  createUser: async ({ fullName, email, password, role }) => {
    set({ loading: true });
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        set({ loading: false, message: data.message || "User created" });
        return { success: true, message: data.message };
      } else {
        set({
          loading: false,
          message: data?.message || "User creation failed",
        });
        return { success: false, message: data?.message };
      }
    } catch (error: any) {
      console.error("Create user error:", error);
      set({ loading: false, message: error?.message || "Error creating user" });
      return { success: false, message: error?.message };
    }
  },

  // FETCH PROFILE (logged-in user)
  userProfile: async () => {
    set({ loading: true });
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        useAuthStore.getState().setUser(data); // Save to auth store if needed
        set({ user: data, loading: false, message: "Profile fetched" });
        return { success: true, message: "Profile fetched" };
      } else {
        set({
          loading: false,
          message: data?.message || "Failed to fetch profile",
        });
        return { success: false, message: data?.message };
      }
    } catch (error: any) {
      console.error("User profile error:", error);
      set({
        loading: false,
        message: error?.message || "Error fetching profile",
      });
      return { success: false, message: error?.message };
    }
  },

  // FETCH ALL USERS
  fetchAllUsers: async () => {
    set({ loading: true });
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/user/all`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.ok) {
        set({ users: data, loading: false });
        return { success: true, users: data };
      } else {
        set({ loading: false, message: data?.message });
        return { success: false };
      }
    } catch (error: any) {
      console.error("Fetch all users error:", error);
      set({ loading: false, message: error?.message });
      return { success: false };
    }
  },

  // FETCH SINGLE USER
  fetchSingleUser: async (id) => {
    set({ loading: true });
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.ok) {
        set({ user: data, loading: false });
        return { success: true, user: data };
      } else {
        set({ loading: false, message: data?.message });
        return { success: false };
      }
    } catch (error: any) {
      console.error("Fetch single user error:", error);
      set({ loading: false, message: error?.message });
      return { success: false };
    }
  },

  // UPDATE USER
  updateUser: async (id, data) => {
    set({ loading: true });
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok) {
        set({ message: resData.message, loading: false });
        return { success: true, message: resData.message };
      } else {
        set({ loading: false, message: resData?.message });
        return { success: false, message: resData?.message };
      }
    } catch (error: any) {
      console.error("Update user error:", error);
      set({ loading: false, message: error?.message });
      return { success: false, message: error?.message };
    }
  },

  // DELETE USER
  deleteUser: async (id) => {
    set({ loading: true });
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.ok) {
        set({ message: data.message, loading: false });
        return { success: true, message: data.message };
      } else {
        set({ loading: false, message: data?.message });
        return { success: false, message: data?.message };
      }
    } catch (error: any) {
      console.error("Delete user error:", error);
      set({ loading: false, message: error?.message });
      return { success: false, message: error?.message };
    }
  },
}));
