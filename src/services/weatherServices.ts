import { WeatherData } from "@/types/weather";
import axios from "axios";

export type WeatherResult =
  | { success: true; data: WeatherData }
  | { success: false; error: string };

const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (
  cityName: string,
): Promise<WeatherResult> => {
  try {
    const trimmedCity = cityName.trim();
    if (!trimmedCity) {
      return {
        success: false,
        error: "Cidade não encontrada",
      };
    }

    const response = await axios.get<WeatherData>(`${BASE_URL}/weather`, {
      params: {
        q: trimmedCity,
        appid: API_KEY,
        lang: "pt_br",
        units: "metric",
      },
      timeout: 10000,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.log("ERRO DETALHADO DA API:", error.response?.data || error.message);
    return {
      success: false,
      error: "Erro ao buscar clima",
    };
  }
};

export const getWeatherIcon = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}