// HomeScreen.tsx
import endpoints from '@/app/const/endpoints';
import { useRequest } from '@/app/hooks/useRequest';
import { useSocketIO } from '@/app/hooks/useWebSocket';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getToken } from '../../utils/functions';

// IMPORTACIÓN CORRECTA - Basado en lo que vemos en la consola
import { TwilioVideo } from 'react-native-twilio-video-webrtc';

// También podrías importar las vistas si las necesitas
// import { TwilioVideoLocalView, TwilioVideoParticipantView } from 'react-native-twilio-video-webrtc';

const HomeScreen = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [status, setStatus] = useState('Esperando...');
  const [participants, setParticipants] = useState<Array<any>>([]);
  const { handleRequest } = useRequest();
  const [roomName, setroomName] = useState("prueba");
  const [token, setToken] = useState<string | null>(null);
  const { connect, joinPatient } = useSocketIO();

  const twilioVideoRef = useRef<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);

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

      const { patient } = (await getToken()).decoded;
      joinPatient(patient[0].id);

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

      twilioVideoRef.current.connect({
        roomName: "prueba",
        accessToken: testToken,
        cameraType: "front",
        dominantSpeakerEnabled: true,
        // IMPORTANTE: Asegúrate de que estos nombres coincidan con la versión de tu librería
        enableVideo: isVideoEnabled,
        enableAudio: isAudioEnabled,
        // Algunas versiones de Twilio para RN requieren encoding parameters
        encodingParameters: {
          enableH264Codec: true,
          audioBitrate: 1,
          videoBitrate: 1,
        },
        enableNetworkQualityReporting: false,

      });


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
  };

  const onParticipantAddedVideoTrack = ({ participant, track }: any) => {
    console.log('Participante añadido:', participant.identity, track);

    setParticipants(prev => {
      const exists = prev.find((p: any) => p.sid === participant.sid);
      if (!exists) {
        return [...prev, {
          sid: participant.sid,
          identity: participant.identity,
          videoTrackSid: track?.trackSid,
          audioTrackSid: track?.trackSid,
        }];
      }
      return prev;
    });
  };

  const onParticipantRemovedVideoTrack = ({ participant, track }: any) => {
    console.log('Participante removido:', participant.identity);
    setParticipants(prev => prev.filter((p: any) => p.sid !== participant.sid));

    if (participants.length <= 1) {
      setStatus('Esperando al doctor...');
    }
  };

  const onRoomParticipantDidConnect = ({ participant }: any) => {
    console.log('Participante conectado:', participant.identity);
  };

  const onRoomParticipantDidDisconnect = ({ participant }: any) => {
    console.log('Participante desconectado:', participant.identity);
    setParticipants(prev => prev.filter((p: any) => p.sid !== participant.sid));
  };

  const toggleAudio = () => {
    if (twilioVideoRef.current) {
      const newAudioState = !isAudioEnabled;
      setIsAudioEnabled(newAudioState);

      // Usar !! para asegurar boolean
      twilioVideoRef.current.setLocalAudioEnabled(!!newAudioState);
    }
  };

  const toggleVideo = () => {
    if (twilioVideoRef.current) {
      const newVideoState = !isVideoEnabled;
      setIsVideoEnabled(newVideoState);

      // Usar !! para asegurar boolean
      twilioVideoRef.current.setLocalVideoEnabled(!!newVideoState);
    }
  };

  const disconnect = () => {
    if (twilioVideoRef.current) {
      console.log('Desconectando...');
      twilioVideoRef.current.disconnect();
    }
    setParticipants([]);
    setStatus('Desconectado');
    setIsConnecting(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Consulta Médica</Text>
        <Text style={styles.status}>{status}</Text>
      </View>

      {/* Contenedor de video */}
      <View style={styles.videoContainer}>
        {participants.length > 0 ? (
          participants.map(participant => (
            <View key={participant.sid} style={styles.participantContainer}>
              <View style={styles.videoDisplay}>
                <Text style={styles.videoText}>
                  {participant.identity} conectado
                </Text>
              </View>
              <View style={styles.participantOverlay}>
                <Text style={styles.participantName}>{participant.identity}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.placeholderContainer}>
            <MaterialIcons
              name={isConnecting ? 'hourglass-empty' : 'videocam'}
              size={60}
              color={'#fff'}
            />
            <Text style={styles.placeholderText}>
              {isConnecting ? 'Conectando...' : 'Listo para conectar'}
            </Text>
            {participants.length === 0 && !isConnecting && (
              <Text style={styles.placeholderSubtext}>
                Presiona el botón verde para unirte a la sala
              </Text>
            )}
          </View>
        )}
      </View>

      {/* Controles */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.controlButton,
            !isAudioEnabled && styles.controlButtonMuted
          ]}
          onPress={toggleAudio}
          disabled={isConnecting}
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
            styles.leaveButton,
          ]}
          onPress={disconnect}
          disabled={isConnecting}
        >
          <MaterialIcons name='call-end' size={24} color={'white'} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.controlButton,
            !isVideoEnabled && styles.controlButtonMuted
          ]}
          onPress={toggleVideo}
          disabled={isConnecting}
        >
          <MaterialIcons
            name={isVideoEnabled ? 'videocam' : 'videocam-off'}
            size={24}
            color={'white'}
          />
        </TouchableOpacity>

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
            size={24}
            color={'white'}
          />
        </TouchableOpacity>
      </View>

      {/* Componente TwilioVideo - IMPORTANTE: Ya está correctamente importado */}
      <TwilioVideo
        ref={twilioVideoRef}
        onRoomDidConnect={onRoomDidConnect}
        onRoomDidDisconnect={onRoomDidDisconnect}
        onParticipantAddedVideoTrack={onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={onParticipantRemovedVideoTrack}
        onRoomParticipantDidConnect={onRoomParticipantDidConnect}
        onRoomParticipantDidDisconnect={onRoomParticipantDidDisconnect}
        // Agregar listeners para debugging
        onCameraDidStart={() => console.log('Cámara iniciada')}
        onCameraDidStopRunning={() => console.log('Cámara detenida')}
        onStatsReceived={(data: any) => console.log('Stats:', data)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
  },
  videoContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  participantContainer: {
    flex: 1,
    position: 'relative',
  },
  videoDisplay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
  },
  videoText: {
    color: 'white',
    fontSize: 16,
  },
  participantOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
  },
  participantName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  placeholderText: {
    color: 'white',
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  },
  placeholderSubtext: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonMuted: {
    backgroundColor: '#ff5757',
  },
  controlButtonDisabled: {
    backgroundColor: '#666',
    opacity: 0.5,
  },
  leaveButton: {
    backgroundColor: '#ff5757',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  connectButton: {
    backgroundColor: '#4CAF50',
  },
});

export default HomeScreen;