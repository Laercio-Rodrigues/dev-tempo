import { detailsStyles } from "@/styles/details.stylles";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ScrollView = Renderiza tudo na tela (poucos itens)
// FlatList = Renderiza por demanda (muitos itens)

export default function Details() {

    const router = useRouter()
    const {cityName} = useLocalSearchParams<{cityName: string}>()
    console.log(cityName)

    return (
        <SafeAreaView style={detailsStyles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <ScrollView style={detailsStyles.container}>
                <TouchableOpacity style={detailsStyles.backButton}>
                    <Text style={detailsStyles.backButtonText} onPress={() => router.back()}>
                         Voltar
                    </Text>
                </TouchableOpacity>

                <View>
                    <Text style={detailsStyles.title}>Clima Atual</Text>
                    <Text style={detailsStyles.subTitle}>Buscando: {cityName}</Text>
                </View>

                <View style={detailsStyles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4A90E2" />
                    <Text style={detailsStyles.loadingText}>Carregando...</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}