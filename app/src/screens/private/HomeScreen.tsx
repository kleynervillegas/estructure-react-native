import endpoints from '@/app/const/endpoints';
import { useRequest } from '@/app/hooks/useRequest';
import { useSocketIO } from '@/app/hooks/useWebSocket';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TwilioVideo, TwilioVideoLocalView, TwilioVideoParticipantView } from 'react-native-twilio-video-webrtc';
import { getToken } from '../../utils/functions';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [status, setStatus] = useState('Esperando conexión...');
  const [participants, setParticipants] = useState<Array<any>>([]);
  const { handleRequest } = useRequest();
  const [token, setToken] = useState<string | null>(null);
  const { connect, joinPatient } = useSocketIO();
  const [callDuration, setCallDuration] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Nuevos estados para controles ocultos
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const controlsOpacityAnim = useRef(new Animated.Value(1)).current;

  const twilioVideoRef = useRef<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Configurar timeout para ocultar controles automáticamente
  const startControlsTimeout = () => {
    // Limpiar timeout existente
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = null;
    }
    
    // Ocultar controles después de 3 segundos si está conectado
    if (isConnected && !isMinimized) {
      controlsTimeoutRef.current = setTimeout(() => {
        hideControls();
      }, 3000);
    }
  };

  const showControls = () => {
    setControlsVisible(true);
    Animated.timing(controlsOpacityAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    startControlsTimeout();
  };

  const hideControls = () => {
    Animated.timing(controlsOpacityAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setControlsVisible(false);
    });
  };

  // Limpiar timeouts al desmontar
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, []);

  // Iniciar timeout al conectar o cambiar estado de minimizado
  useEffect(() => {
    if (isConnected && !isMinimized) {
      startControlsTimeout();
    } else {
      // Mostrar controles cuando no está conectado o está minimizado
      showControls();
    }
  }, [isConnected, isMinimized]);

  // Timer para la duración de la llamada
  useEffect(() => {
    if (isConnected) {
      durationIntervalRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }
      setCallDuration(0);
    }

    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }
    };
  }, [isConnected]);

  // Animación para minimizar/maximizar
  const toggleMinimize = () => {
    const newMinimizedState = !isMinimized;
    setIsMinimized(newMinimizedState);
    Animated.timing(slideAnim, {
      toValue: newMinimizedState ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    // Mostrar controles al minimizar/maximizar
    showControls();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Solicitar permisos
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      await connect();

      if (Platform.OS === 'android') {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        if (
          grants['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permisos concedidos');
        } else {
          setStatus('Permisos de cámara/micrófono denegados');
          Alert.alert('Permisos requeridos', 'Necesitas conceder permisos de cámara y micrófono');
        }
      } else {
        console.log('iOS - Los permisos se pedirán automáticamente');
      }
    } catch (err) {
      console.warn('Error en permisos:', err);
      setStatus('Error al solicitar permisos');
    }
  };

  const connectToRoom = async () => {
    if (isConnecting || !twilioVideoRef.current) {
      console.log('Ya se está conectando o ref no disponible');
      return;
    }

    try {
      setIsConnecting(true);
      setStatus('Obteniendo token...');

      // Verificar que getToken funcione correctamente
      const tokenData = await getToken();
      if (!tokenData || !tokenData.decoded || !tokenData.decoded.patient) {
        throw new Error('Error obteniendo token');
      }

      const { patient } = tokenData.decoded;
      if (patient && patient[0] && patient[0].id) {
        joinPatient(patient[0].id);
      }

      const response = await handleRequest({
        url: endpoints.createRoom,
        method: 'POST',
        data: {
          "roomName": "prueba",
          "identity": "123456"
        }
      });

      const testToken = response.data.data;
      setToken(testToken);

      setStatus('Conectando a la sala...');

      const connectParams = {
        roomName: "prueba",
        accessToken: testToken,
        cameraType: "front" as const,
        dominantSpeakerEnabled: true,
        enableVideo: isVideoEnabled,
        enableAudio: isAudioEnabled,
        encodingParameters: {
          enableH264Codec: true,
          audioBitrate: 16000,
          videoBitrate: 1500000,
        },
        enableNetworkQualityReporting: false,
      };

      console.log('Conectando con parámetros corregidos...');
      twilioVideoRef.current.connect(connectParams);

    } catch (error: any) {
      console.error('Error al conectar:', error);
      setStatus('Error al conectar');
      Alert.alert('Error', `Error al conectar: ${error.message || error}`);
      setIsConnecting(false);
    }
  };

  const onRoomDidConnect = ({ roomName, error }: any) => {
    console.log('onRoomDidConnect llamado:', { roomName, error });

    setIsConnecting(false);
    setIsConnected(true);

    if (error) {
      setStatus(`Error: ${error}`);
      Alert.alert('Error de conexión', error);
      return;
    }
    setStatus(`Conectado a: ${roomName}`);
  };

  const onRoomDidDisconnect = ({ roomName, error }: any) => {
    console.log('onRoomDidDisconnect llamado:', { roomName, error });
    setStatus('Desconectado');
    setParticipants([]);
    setIsConnecting(false);
    setIsConnected(false);
  };

  const onParticipantAddedVideoTrack = ({ participant, track }: any) => {
    console.log('Participante añadido:', participant?.identity, track);

    setParticipants(prev => {
      const exists = prev.find((p: any) => p.sid === participant.sid);
      if (!exists) {
        return [...prev, {
          sid: participant.sid,
          identity: participant.identity || 'Doctor',
          videoTrackSid: track?.trackSid,
          audioTrackSid: track?.trackSid,
        }];
      }
      return prev;
    });
  };

  const onParticipantRemovedVideoTrack = ({ participant, track }: any) => {
    console.log('Participante removido:', participant?.identity);
    setParticipants(prev => prev.filter((p: any) => p.sid !== participant?.sid));

    if (participants.length <= 1) {
      setStatus('Esperando al doctor...');
    }
  };

  const onRoomParticipantDidConnect = ({ participant }: any) => {
    console.log('Participante conectado:', participant?.identity);
  };

  const onRoomParticipantDidDisconnect = ({ participant }: any) => {
    console.log('Participante desconectado:', participant?.identity);
    setParticipants(prev => prev.filter((p: any) => p.sid !== participant?.sid));
  };

  const toggleAudio = () => {
    if (twilioVideoRef.current) {
      const newAudioState = !isAudioEnabled;
      setIsAudioEnabled(newAudioState);
      twilioVideoRef.current.setLocalAudioEnabled(!!newAudioState);
    }
    showControls(); // Mostrar controles al interactuar
  };

  const toggleVideo = () => {
    if (twilioVideoRef.current) {
      const newVideoState = !isVideoEnabled;
      setIsVideoEnabled(newVideoState);
      twilioVideoRef.current.setLocalVideoEnabled(!!newVideoState);
    }
    showControls(); // Mostrar controles al interactuar
  };

  const disconnect = () => {
    if (twilioVideoRef.current) {
      console.log('Desconectando...');
      twilioVideoRef.current.disconnect();
    }
    setParticipants([]);
    setStatus('Desconectado');
    setIsConnecting(false);
    setIsConnected(false);
  };

  const flipCamera = () => {
    if (twilioVideoRef.current) {
      twilioVideoRef.current.flipCamera();
    }
    showControls(); // Mostrar controles al interactuar
  };

  // Manejar toque en la pantalla para mostrar controles
  const handleScreenTouch = () => {
    if (isConnected && !isMinimized) {
      showControls();
    }
  };

  // Transformaciones para animación
  const minimizedTransform = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height * 0.6]
  });

  const minimizedScale = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.3]
  });

  // Calcular opacidad para controles
  const controlsContainerOpacity = Animated.multiply(
    controlsOpacityAnim,
    slideAnim.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [1, 0.3, 0]
    })
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Área táctil para mostrar controles */}
      <TouchableWithoutFeedback onPress={handleScreenTouch}>
        <View style={styles.touchArea} />
      </TouchableWithoutFeedback>

      {/* Header con información del doctor */}
      {isConnected && (
        <Animated.View style={[
          styles.header,
          {
            transform: [
              { translateY: minimizedTransform },
              { scale: minimizedScale }
            ],
            opacity: slideAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 0.5, 0]
            })
          }
        ]}>
          <View style={styles.doctorInfo}>
            <View style={styles.doctorAvatar}>
              <MaterialIcons name="person" size={40} color="#4a54eb" />
            </View>
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorName}>Dr. Fresh Smile</Text>
              <Text style={styles.doctorSpecialty}>Pediatric</Text>
            </View>
            <View style={styles.callTimer}>
              <MaterialIcons name="schedule" size={20} color="#fff" />
              <Text style={styles.timerText}>{formatTime(callDuration)}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.minimizeButton}
            onPress={toggleMinimize}
          >
            <MaterialIcons 
              name={isMinimized ? 'fullscreen' : 'minimize'} 
              size={24} 
              color="#fff" 
            />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Contenedor principal de video */}
      <Animated.View style={[
        styles.videoContainer,
        {
          transform: [
            { translateY: minimizedTransform },
            { scale: minimizedScale }
          ],
          borderRadius: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 20]
          })
        }
      ]}>
        {/* Video remoto (doctor) */}
        {participants.length > 0 ? (
          participants.map(participant => (
            <View key={participant.sid || 'default'} style={styles.remoteVideoContainer}>
              <TwilioVideoParticipantView
                style={styles.remoteVideo}
                trackIdentifier={{
                  participantSid: participant.sid,
                  videoTrackSid: participant.videoTrackSid
                }}
                scaleType="fill"
              />
              
              {/* Overlay con nombre del doctor (solo visible con controles) */}
              {controlsVisible && (
                <Animated.View style={[
                  styles.remoteVideoOverlay,
                  { opacity: controlsOpacityAnim }
                ]}>
                  <Text style={styles.remoteParticipantName}>
                    {participant.identity || 'Doctor'}
                  </Text>
                  <View style={styles.audioIndicator}>
                    <MaterialIcons 
                      name={isAudioEnabled ? 'mic' : 'mic-off'} 
                      size={16} 
                      color="#fff" 
                    />
                  </View>
                </Animated.View>
              )}
            </View>
          ))
        ) : (
          <View style={styles.placeholderContainer}>
            <MaterialIcons
              name={isConnecting ? 'hourglass-empty' : 'videocam-off'}
              size={80}
              color={'rgba(255,255,255,0.3)'}
            />
            <Text style={styles.placeholderTitle}>
              {isConnecting ? 'Conectando con el doctor...' : 'Esperando al doctor'}
            </Text>
            <Text style={styles.placeholderSubtitle}>
              {isConnecting ? 'Por favor espera unos momentos' : 'Presiona el botón verde para iniciar'}
            </Text>
            
            {!isConnected && !isConnecting && (
              <View style={styles.connectionInfo}>
                <View style={styles.infoItem}>
                  <MaterialIcons name="security" size={20} color="#4CAF50" />
                  <Text style={styles.infoText}>Conexión segura y encriptada</Text>
                </View>
                <View style={styles.infoItem}>
                  <MaterialIcons name="video-call" size={20} color="#4CAF50" />
                  <Text style={styles.infoText}>Calidad HD garantizada</Text>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Video local (PIP - Picture in Picture) */}
        {isVideoEnabled && (
          <Animated.View style={[
            styles.localVideoWrapper,
            {
              transform: [
                { translateY: minimizedTransform },
                { scale: minimizedScale }
              ]
            }
          ]}>
            <TwilioVideoLocalView
              enabled={isVideoEnabled}
              style={styles.localVideo}
              scaleType="fill"
            />
            
            {/* Overlay del video local (solo visible con controles) */}
            {controlsVisible && (
              <Animated.View style={[
                styles.localVideoOverlay,
                { opacity: controlsOpacityAnim }
              ]}>
                <Text style={styles.localParticipantName}>Tú</Text>
                <View style={styles.localVideoControls}>
                  <TouchableOpacity 
                    style={styles.smallControlButton}
                    onPress={flipCamera}
                  >
                    <MaterialIcons name="flip-camera-ios" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}
            
            {/* Indicador de audio local */}
            <View style={[
              styles.localAudioIndicator,
              !isAudioEnabled && styles.audioIndicatorMuted
            ]}>
              <MaterialIcons 
                name={isAudioEnabled ? 'mic' : 'mic-off'} 
                size={12} 
                color="#fff" 
              />
            </View>
          </Animated.View>
        )}
      </Animated.View>

      {/* Controles flotantes */}
      <Animated.View style={[
        styles.controlsContainer,
        {
          transform: [{ translateY: minimizedTransform }],
          opacity: controlsContainerOpacity,
        }
      ]}>
        {/* Controles principales */}
        <View style={styles.mainControls}>
          <TouchableOpacity
            style={[
              styles.controlButton,
              styles.audioButton,
              !isAudioEnabled && styles.controlButtonMuted
            ]}
            onPress={toggleAudio}
            disabled={!isConnected}
          >
            <MaterialIcons
              name={isAudioEnabled ? 'mic' : 'mic-off'}
              size={24}
              color={'white'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.controlButton,
              styles.videoButton,
              !isVideoEnabled && styles.controlButtonMuted
            ]}
            onPress={toggleVideo}
            disabled={!isConnected}
          >
            <MaterialIcons
              name={isVideoEnabled ? 'videocam' : 'videocam-off'}
              size={24}
              color={'white'}
            />
          </TouchableOpacity>

          {!isConnected ? (
            <TouchableOpacity
              style={[
                styles.controlButton,
                styles.connectButton,
                isConnecting && styles.controlButtonDisabled
              ]}
              onPress={connectToRoom}
              disabled={isConnecting}
            >
              <MaterialIcons
                name={isConnecting ? 'hourglass-empty' : 'call'}
                size={28}
                color={'white'}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.controlButton,
                styles.disconnectButton
              ]}
              onPress={disconnect}
            >
              <MaterialIcons name='call-end' size={28} color={'white'} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              styles.controlButton,
              styles.cameraFlipButton
            ]}
            onPress={flipCamera}
            disabled={!isConnected}
          >
            <MaterialIcons name='flip-camera-ios' size={24} color={'white'} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.controlButton,
              styles.moreButton
            ]}
            onPress={() => Alert.alert('Más opciones', 'Funcionalidades adicionales')}
          >
            <MaterialIcons name='more-vert' size={24} color={'white'} />
          </TouchableOpacity>
        </View>

        {/* Estado de conexión */}
        <View style={styles.statusContainer}>
          <View style={[
            styles.statusIndicator,
            isConnected ? styles.statusConnected : styles.statusDisconnected
          ]} />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </Animated.View>

      {/* Componente TwilioVideo (oculto) */}
      <TwilioVideo
        ref={twilioVideoRef}
        onRoomDidConnect={onRoomDidConnect}
        onRoomDidDisconnect={onRoomDidDisconnect}
        onParticipantAddedVideoTrack={onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={onParticipantRemovedVideoTrack}
        onRoomParticipantDidConnect={onRoomParticipantDidConnect}
        onRoomParticipantDidDisconnect={onRoomParticipantDidDisconnect}
        onCameraDidStart={() => console.log('Cámara iniciada')}
        onCameraDidStopRunning={() => console.log('Cámara detenida')}
        style={{ position: 'absolute', width: 0, height: 0 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f2b',
  },
  touchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(10, 15, 43, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    zIndex: 100,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4a54eb',
  },
  doctorDetails: {
    flex: 1,
    marginLeft: 15,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  callTimer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 84, 235, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#4a54eb',
  },
  timerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  minimizeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  remoteVideoContainer: {
    flex: 1,
    position: 'relative',
  },
  remoteVideo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  remoteVideoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  remoteParticipantName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  audioIndicator: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 30,
  },
  placeholderTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  placeholderSubtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  connectionInfo: {
    marginTop: 40,
    width: '100%',
    maxWidth: 300,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginLeft: 10,
  },
  localVideoWrapper: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 120,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  localVideo: {
    width: '100%',
    height: '100%',
  },
  localVideoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  localParticipantName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  localVideoControls: {
    flexDirection: 'row',
  },
  smallControlButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  localAudioIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  audioIndicatorMuted: {
    backgroundColor: '#ff5757',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(10, 15, 43, 0.95)',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 50,
  },
  mainControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  videoButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  connectButton: {
    backgroundColor: '#4CAF50',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  disconnectButton: {
    backgroundColor: '#ff5757',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  cameraFlipButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  moreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  controlButtonMuted: {
    backgroundColor: '#ff5757',
  },
  controlButtonDisabled: {
    opacity: 0.5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusConnected: {
    backgroundColor: '#4CAF50',
  },
  statusDisconnected: {
    backgroundColor: '#ff5757',
  },
  statusText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
});

export default HomeScreen;