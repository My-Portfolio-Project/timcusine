import { create } from "zustand";
import { UserProps } from "../interface/user.interface";
import { API_URL } from "../hooks/Api";

interface AuthState {
  user: UserProps | null; 
  setUser: (user: UserProps | null) => void;
  token: string | null;
  loading: boolean;
  message: string;
  register: (user: UserProps) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  verifyOtp: (email: string, token: string) => Promise<any>;
  requestOtp: (email: string) => Promise<any>;
  clearMessage: () => void; 
  // checkingAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  token: null,
  loading: false,
  message: "",

  // ✅ Register function
  register: async (user) => {
    set({ loading: true, message: "" });

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

        if (response.ok) {
      set({
        user: data.user,
        message: data?.message,
        loading: false,
        token: data?.token 
      });
      localStorage.setItem('token', data?.token)
      return { success: true, message: data?.message };
    } else {
      set({
        message: data?.message || data?.response?.message || "Login failed",
        loading: false,
      });
      return { success: false, message: data?.message || data?.response?.message };
    }
    } catch (error: any) {
      console.error("Registration error:", error?.message);
      set({
        loading: false,
        message: error?.message || "Registration failed",
      });

      return { success: false, message: error?.message };
    }
  },

  // ✅ Login function
login: async (email: string, password: string) => {
  set({ loading: true, message: "" });
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
  

    if (response.ok) {
      set({
        user: data.user,
        message: data?.message,
        loading: false,
        token: data?.token 
      });
      localStorage.setItem('token', data?.token)
      return { success: true, message: data?.message, user: data?.user  };
    } else {
      set({
        message: data?.message || data?.response?.message || "Login failed",
        loading: false,
      });
      return { success: false, message: data?.message || data?.response?.message };
    }
  } catch (error) {
    set({
      message: "Network error. Please try again.",
      loading: false,
    });
    return { success: false, message: "Network error. Please try again." };
  }
},

 // ✅ Verify-otp function
verifyOtp: async (email: string, token: string) => {
  set({ loading: true, message: "" });
const tokens  = localStorage.getItem("token")
// console.log('VErify-token', tokens)

  try {
    const response = await fetch(`${API_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens}`
       },
      body: JSON.stringify({ email, token }),
    });

    const data = await response.json();
  

    if (response.ok) {
      set({
        user: data.user,
        message: data?.message,
        loading: false,
        token: data?.token 
      });
      localStorage.setItem('token', data?.token)
      return { success: true, message: data?.message };
    } else {
      set({
        message: data?.message || data?.response?.message || "Login failed",
        loading: false,
      });
      return { success: false, message: data?.message || data?.response?.message };
    }
  } catch (error) {
    set({
      message: "Network error. Please try again.",
      loading: false,
    });
    return { success: false, message: "Network error. Please try again." };
  }
},

 // ✅ Request Otp function
requestOtp: async (email: string) => {
  set({ loading: true, message: "" });

  const tokens  = localStorage.getItem("token")
  // console.log('VErify-token', tokens)

  try {
    const response = await fetch(`${API_URL}/auth/request-otp`, {
      method: "POST",
      headers: { 
          "Content-Type": "application/json",   
          // "Authorization": `Bearer ${tokens}`
        },
      body: JSON.stringify({ email}),
    });

    const data = await response.json();
  
    if (response.ok) {
      set({
        user: data.user,
        message: data?.message,
        loading: false,
        token: data?.token 
      });
      localStorage.setItem('token', data?.token)
      return { success: true, message: data?.message };
    } else {
      set({
        message: data?.message || data?.response?.message || "Login failed",
        loading: false,
      });
      return { success: false, message: data?.message || data?.response?.message };
    }
  } catch (error) {
    set({
      message: "Network error. Please try again.",
      loading: false,
    });
    return { success: false, message: "Network error. Please try again." };
  }
},

// checkingAuth:() => {

//   if(!user) {

//   }

// },



    clearMessage: () => set({ message: "" }),

}));

