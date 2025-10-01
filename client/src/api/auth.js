
import axiosClient from "./axiosClient";

export const register = async(userData) => {
  const res= await axiosClient.post("/auth/register", userData);
    return res.data;  
}

export const login = async (credentials) => {
 const res=await  axiosClient.post("/auth/login", credentials);
    return res.data;  
}
