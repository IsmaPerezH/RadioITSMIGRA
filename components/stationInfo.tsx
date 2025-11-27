import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RADIO_CONFIG } from '../constants/config';



export default function StationInfo() {
// define dos funciones que utilizan el Linking API para interactuar con el sistema operativo del teléfono:

  const handleWebsitePress = () => {// Abre el sitio web de la estación
    Linking.openURL(RADIO_CONFIG.Station.website);
  };

  const handleCallPress = () => {
    Linking.openURL(`tel:${RADIO_CONFIG.Station.phone}`);
  };

  const handleWhatsAppPress = () => {
    const phoneNumber = RADIO_CONFIG.Station.phone.replace(/\D/g, '');
    const whatsappURL = `https://wa.me/${phoneNumber}`;
    Linking.openURL(whatsappURL);
  };

  return (
    <View style={styles.container}>
      {/* Logo y nombre */}
      <View style={styles.header}>
        <Image 
          source={RADIO_CONFIG.Station.logo} 
          style={styles.logo}
          resizeMode="contain"
        />
        {/* escala la imagen para que quepa completamente dentro del área sin distorsionarla */}
        <View style={styles.titleContainer}>
          <Text style={styles.stationName}>{RADIO_CONFIG.Station.name}</Text>
          <Text style={styles.slogan}>{RADIO_CONFIG.Station.slogan}</Text>
        </View>
      </View>

      {/* Información de contacto */}
      <View style={styles.contactContainer}>
{/* TouchableOpacity: Se utiliza en lugar de un Button simple porque permite más personalización de estilo. */}
        <TouchableOpacity style={styles.contactButton} onPress={handleWebsitePress}>
          <Ionicons name="globe" size={16} color={RADIO_CONFIG.colors.text} />
          <Text style={styles.contactText}>Sitio Web</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactButton} onPress={handleWhatsAppPress}>
          <Ionicons name="logo-whatsapp" size={16} color={RADIO_CONFIG.colors.text} />
          <Text style={styles.contactText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>

      {/* Mensaje de bienvenida */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Bienvenido</Text>
        <Text style={styles.welcomeText}>
          Al aire desde las 7:00 hrs hasta las 19:00 hrs, con el compromiso de  promover el conocimiento, la cultura y la formación integral de nuestra comunidad. 
          ¡Gracias por escucharnos!.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  stationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: RADIO_CONFIG.colors.text,
    marginBottom: 4,
  },
  slogan: {
    fontSize: 16,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  contactText: {
    color: RADIO_CONFIG.colors.text,
    marginLeft: 8,
    fontSize: 14,
  },
  welcomeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: RADIO_CONFIG.colors.primary,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: RADIO_CONFIG.colors.text,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  }
});
