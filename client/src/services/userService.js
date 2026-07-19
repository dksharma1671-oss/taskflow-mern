import api from "./api";

export const getProfile = () => api.get("/user/profile");

// FormData use karte hain kyunki profile image bhi ja sakti hai
export const updateProfile = (formData) =>
  api.put("/user/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const changePassword = (data) => api.put("/user/password", data);
