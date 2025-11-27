// Componente Principal (components/RadioPlayer.tsx)
// se integra la lógica de reproducción (useRadioPlayer) con los controles visuales botón de Play/Pause, volumen, indicadores de estado
// typescript
// Importación de bibliotecas y componentes necesarios
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de iconos para React Native
import React, { useEffect, useState } from 'react'; // React y hooks esenciales
import {
  ActivityIndicator, // Componente para mostrar spinner de carga
  Dimensions, // API para obtener dimensiones de la pantalla
  StyleSheet, // API para crear estilos en React Native
  Text, // Componente para mostrar texto
  TouchableOpacity, // Componente para áreas clickeables con feedback
  View // Componente contenedor similar a div en web
} from 'react-native';
import { useRadioPlayer } from '../hooks/userRadioPlayer'; // Hook personalizado para la lógica del reproductor

// Obtenemos las dimensiones de la pantalla del dispositivo
const { width, height } = Dimensions.get('window');

// Componente principal RadioPlayer como función por defecto
export default function RadioPlayer() {
  // Destructuración del hook personalizado que maneja el estado del reproductor
  const { 
    isPlaying, // Booleano: true si la radio está reproduciéndose
    isLoading, // Booleano: true si está cargando/conectando
    error, // String: mensaje de error si existe algún problema
    togglePlayback, // Función: alterna entre play/pause
    volume, // Número: nivel de volumen entre 0 y 1
    setVolume // Función: actualiza el nivel de volumen
  } = useRadioPlayer();

  // Estado local para almacenar y actualizar la hora actual
  const [currentTime, setCurrentTime] = useState(new Date());

  // Efecto secundario que se ejecuta al montar el componente
  useEffect(() => {
    // Crea un intervalo que se ejecuta cada 1000ms (1 segundo)
    const interval = setInterval(() => {
      setCurrentTime(new Date()); // Actualiza la hora actual
    }, 1000);

    // Función de cleanup que se ejecuta al desmontar el componente
    return () => clearInterval(interval); // Limpia el intervalo para evitar memory leaks
  }, []); // Array de dependencias vacío = se ejecuta solo una vez al montar

  // Función para formatear la hora en formato HH:MM
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', // Hora en 2 dígitos (01-23)
      minute: '2-digit' // Minutos en 2 dígitos (00-59)
    });
  };

  // Función para formatear la fecha en español extenso
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', // Día de la semana completo (lunes, martes...)
      year: 'numeric', // Año en 4 dígitos
      month: 'long', // Mes completo (enero, febrero...)
      day: 'numeric' // Día del mes (1-31)
    });
  };

  // Retorno del JSX que define la interfaz de usuario
  return (
    <View style={styles.container}>
      {/* Sección superior que muestra la hora y fecha actual */}
      <View style={styles.timeSection}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Text style={styles.dateText}>{formatDate(currentTime)}</Text>
      </View>

      {/* Sección central con todos los controles del reproductor */}
      <View style={styles.playerSection}>

        {/* Botón para play/pause con feedback táctil */}
        <TouchableOpacity
          style={[
            styles.playButton, // Estilo base del botón
            isPlaying && styles.playingButton // Estilo adicional cuando está reproduciendo
          ]}
          onPress={togglePlayback} // Ejecuta la función al presionar
          disabled={isLoading} // Deshabilita el botón durante la carga
        >
          {isLoading ? (
            // Muestra spinner de carga si está cargando
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            // Muestra icono de play o pause según el estado
            <Ionicons 
              name={isPlaying ? "pause" : "play"} // Icono dinámico
              size={28} 
              color="#FFFFFF" 
            />
          )}
        </TouchableOpacity>

        {/* Contenedor para los controles de volumen */}
        <View style={styles.volumeContainer}>
          {/* Botón para disminuir volumen */}
          <TouchableOpacity 
            style={styles.volumeButton}
            onPress={() => setVolume(Math.max(0, volume - 0.2))} // Reduce volumen en 0.2, mínimo 0
          >
            <Ionicons 
              name="volume-medium" 
              size={24} 
              color={volume > 0 ? "#FFFFFF" : "#94A3B8"} // Color gris si volumen es 0
            />
          </TouchableOpacity>

          {/* Contenedor de la barra de volumen y texto */}
          <View style={styles.volumeBarContainer}>
            {/* Barra de fondo del volumen */}
            <View style={styles.volumeBar}>
              {/* Nivel actual de volumen que se ajusta dinámicamente */}
              <View 
                style={[
                  styles.volumeLevel, 
                  { width: `${volume * 100}%` } // Ancho porcentual basado en el volumen (0-100%)
                ]} 
              />
            </View>
            {/* Texto que muestra el porcentaje de volumen */}
            <Text style={styles.volumeText}>{Math.round(volume * 100)}%</Text>
          </View>

          {/* Botón para aumentar volumen */}
          <TouchableOpacity 
            style={styles.volumeButton}
            onPress={() => setVolume(Math.min(1, volume + 0.2))} // Aumenta volumen en 0.2, máximo 1
          >
            <Ionicons 
              name="volume-high" 
              size={24} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>

        {/* Contenedor del indicador de estado de conexión */}
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusIndicator, // Estilo base del indicador
            isLoading && styles.statusLoading, // Estilo adicional cuando está cargando
            isPlaying && !isLoading && styles.statusPlaying // Estilo adicional cuando está reproduciendo
          ]}>
            {/* Texto que cambia según el estado del reproductor */}
            <Text style={styles.statusText}>
              {isLoading ? 'CONECTANDO' : isPlaying ? 'EN VIVO' : 'LISTO'}
            </Text>
          </View>
        </View>
      </View>

      {/* Mensaje de error que solo se muestra cuando hay un error */}
      {error && (
        <View style={styles.errorContainer}>
          <Ionicons name="warning" size={16} color="#FEF3C7" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

// Objeto de estilos usando StyleSheet.create para mejor rendimiento
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo el espacio disponible
    backgroundColor: '#0F172A', // Color de fondo azul oscuro
  },
  timeSection: {
    height: '30%', // Ocupa el 30% de la altura del contenedor
    justifyContent: 'center', // Centra verticalmente el contenido
    alignItems: 'center', // Centra horizontalmente el contenido
    paddingTop: 40 // Espacio interno superior
  },
  timeText: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 48, // Tamaño grande para la hora
    fontWeight: '300', // Peso de fuente ligero
    fontVariant: ['tabular-nums'], // Usa números de ancho fijo para mejor alineación
  },
  dateText: {
    color: '#94A3B8', // Color gris azulado
    fontSize: 16,
    textAlign: 'center', // Texto centrado
    marginBottom: 15, // Margen inferior
    textTransform: 'capitalize', // Primera letra de cada palabra en mayúscula
  },
  playerSection: {
    flex: 1, // Ocupa el espacio restante (70%)
    justifyContent: 'flex-start', // Alinea contenido al inicio
    alignItems: 'center', // Centra horizontalmente
    paddingHorizontal: 20, // Padding lateral
    paddingTop: 15, // Padding superior
  },
  playButton: {
    width: 80, // Ancho fijo
    height: 80, // Alto fijo
    borderRadius: 40, // Radio de borde = mitad del alto/ancho = círculo perfecto
    backgroundColor: '#1E40AF', // Color azul
    justifyContent: 'center', // Centra icono verticalmente
    alignItems: 'center', // Centra icono horizontalmente
    marginBottom: 15, // Espacio inferior
    shadowColor: '#1E40AF', // Color de la sombra
    shadowOffset: {
      width: 0, // Sin desplazamiento horizontal
      height: 6, // Desplazamiento vertical de 6px
    },
    shadowOpacity: 0.4, // Opacidad de la sombra
    shadowRadius: 12, // Difuminado de la sombra
    elevation: 6, // Sombra en Android
  },
  playingButton: {
    backgroundColor: '#DC2626', // Color rojo cuando está reproduciendo
    shadowColor: '#DC2626', // Sombra roja
    transform: [{ scale: 1.05 }], // Efecto de escala ligeramente mayor
  },
  volumeContainer: {
    flexDirection: 'row', // Disposición horizontal
    alignItems: 'center', // Centra verticalmente
    justifyContent: 'center', // Centra horizontalmente
    width: '100%', // Ancho completo
    marginBottom: 30, // Espacio inferior
    paddingHorizontal: 20, // Padding lateral
  },
  volumeButton: {
    padding: 10, // Espacio interno
    borderRadius: 20, // Bordes redondeados
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fondo semitransparente
    width: 44, // Ancho fijo
    height: 44, // Alto fijo
    justifyContent: 'center', // Centra icono verticalmente
    alignItems: 'center', // Centra icono horizontalmente
  },
  volumeBarContainer: {
    flex: 1, // Ocupa todo el espacio disponible entre los botones
    alignItems: 'center', // Centra horizontalmente
    marginHorizontal: 15, // Margen lateral
  },
  volumeBar: {
    width: '100%', // Ancho completo del contenedor
    height: 6, // Alto delgado
    backgroundColor: '#334155', // Color de fondo de la barra
    borderRadius: 3, // Bordes redondeados
    marginBottom: 5, // Espacio inferior
    overflow: 'hidden', // Oculta el contenido que se sale
  },
  volumeLevel: {
    height: '100%', // Mismo alto que la barra contenedora
    backgroundColor: '#1E40AF', // Color azul para el nivel
    borderRadius: 3, // Mismo radio que la barra
  },
  volumeText: {
    color: '#94A3B8', // Color gris azulado
    fontSize: 12, // Tamaño pequeño
    fontWeight: '500', // Peso de fuente medio
  },
  statusContainer: {
    alignItems: 'center', // Centra horizontalmente
    paddingBottom: 60 // Espacio inferior grande
  },
  statusIndicator: {
    backgroundColor: '#334155', // Color gris oscuro por defecto
    paddingHorizontal: 20, // Padding lateral
    paddingVertical: 10, // Padding vertical
    borderRadius: 20, // Bordes muy redondeados
    minWidth: 120, // Ancho mínimo para consistencia
  },
  statusLoading: {
    backgroundColor: '#F59E0B', // Color ámbar durante carga
  },
  statusPlaying: {
    backgroundColor: '#10B981', // Color verde durante reproducción
  },
  statusText: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 14, // Tamaño estándar
    fontWeight: 'bold', // Texto en negrita
    textAlign: 'center', // Centrado
  },
  errorContainer: {
    position: 'absolute', // Posicionamiento absoluto respecto al contenedor padre
    bottom: 30, // 30px desde el fondo
    left: 20, // 20px desde la izquierda
    right: 20, // 20px desde la derecha
    flexDirection: 'row', // Disposición horizontal
    alignItems: 'center', // Centra verticalmente
    justifyContent: 'center', // Centra horizontalmente
    backgroundColor: '#92400E', // Color de fondo naranja oscuro
    padding: 12, // Padding interno
    borderRadius: 8, // Bordes redondeados
  },
  errorText: {
    color: '#FEF3C7', // Color amarillo claro
    fontSize: 14, // Tamaño estándar
    marginLeft: 8, // Margen a la izquierda del icono
  },
});

