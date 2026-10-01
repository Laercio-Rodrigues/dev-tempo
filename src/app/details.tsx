
import { WeatherCard } from "@/components/weatherCard";
import { getCurrentWeather } from "@/services/weatherServices";
import { detailsStyles } from "@/styles/details.stylles";
import { WeatherData } from "@/types/weather";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ScrollView = Renderiza tudo na tela (poucos itens)
// FlatList = Renderiza por demanda (muitos itens)

export default function Details() {
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { cityName } = useLocalSearchParams<{ cityName: string }>();

  useEffect(() => {
    if (cityName) getWeatherData();
  }, [cityName]);

  const getWeatherData = async () => {
    setLoading(true);
    setError(null);

    const result = await getCurrentWeather(cityName as string);

    setLoading(false);

    if (result.success) {
      console.log(result.data)

      setWeatherData(result.data);
    } else {
      setError(result.error);
    }
  };

  return (
    <SafeAreaView style={detailsStyles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={detailsStyles.container}>
        <TouchableOpacity style={detailsStyles.backButton}>
          <Text
            style={detailsStyles.backButtonText}
            onPress={() => router.back()}
          >
            Voltar
          </Text>
        </TouchableOpacity>

        <View>
          <Text style={detailsStyles.title}>Clima Atual</Text>
          <Text style={detailsStyles.subTitle}>Buscando: {cityName}</Text>
        </View>

        {loading && (
          <View style={detailsStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={detailsStyles.loadingText}>Carregando...</Text>
          </View>
        )}


        {!loading && !error && weatherData && (
          <WeatherCard weather={weatherData}/>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
