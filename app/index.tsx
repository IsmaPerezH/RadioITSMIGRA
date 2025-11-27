import React from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import RadioPlayer from "../components/radioPlay";
import StationInfo from "../components/stationInfo";
import { RADIO_CONFIG } from "../constants/config";


//Exportar la pantalla principal de la app
export default function HomeScreen() {
    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            <StatusBar barStyle={"light-content"} backgroundColor={RADIO_CONFIG.colors.background} />
            {/* Sección de la información */}
            <StationInfo />

            {/* Sección del reproductor */}
            <RadioPlayer />
        </ScrollView>

    );

}


//Definimos un ahoja de estilos
const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: RADIO_CONFIG.colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        backgroundColor: RADIO_CONFIG.colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: RADIO_CONFIG.colors.background,
    }
});