import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import axiosRequest from "../utils/axiosRequest";
import { destroyToken, saveToken } from "../utils/token";

export const Login = createAsyncThunk(
  "LoginSlice/Login",
  async ({ login, navigate }, { rejectWithValue }) => {
    try {
      const { data } = await axiosRequest.post(
        `api/Account/login`,
        login,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.statusCode === 200) {
        // Убедитесь, что структура данных соответствует ожидаемой для saveToken
        saveToken(data.data); 
        toast.success("Успешная авторизация!");
        // Задержка перед перенаправлением, чтобы уведомление успело отобразиться
        setTimeout(() => {
          navigate("/");
        }, 500);
      }

      return data.data; 
    } catch (error) {
      toast.error("Ошибка авторизации: " + (error.response?.data?.message || "Неверный логин или пароль"));
      console.error("Ошибка при входе:", error.message);
      return rejectWithValue(error.response?.data?.message || "Ошибка авторизации");
    }
  }
);

export const LogOut = (navigate) => {
  try {
    destroyToken();
    toast.success("Вы успешно вышли из системы");
    navigate("/login"); // Изменено с "/admin" на "/login"
  } catch (error) {
    toast.error("Ошибка при выходе: " + error.message);
    console.log(error.message);
  }
};