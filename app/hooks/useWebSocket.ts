// hooks/useSocketIO.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { io } from 'socket.io-client';

// Configuración base
const SOCKET_CONFIG = {
  URL_HOST: 'https://dev.midrtas.com:4444', // Cambia según tu entorno
  TRANSPORTS: ['websocket'] as const,
  PATH: '/ws',
  RECONNECTION: true,
  RECONNECTION_ATTEMPTS: Infinity,
  RECONNECTION_DELAY: 1000,
  TIMEOUT: 20000,
};

// Tipos TypeScript
interface SocketEvents {
  [key: string]: (...args: any[]) => void;
}

interface UseSocketIOReturn {
  socket: any | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => void;
  disconnect: () => void;
  emit: (event: string, data?: any) => boolean;
  on: (event: string, callback: (...args: any[]) => void) => () => void;
  off: (event: string, callback?: (...args: any[]) => void) => void;
  joinPatient: (username: string) => boolean;
}

const useSocketIO = (config?: Partial<typeof SOCKET_CONFIG>): UseSocketIOReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const socketRef = useRef<any | null>(null);
  const eventsRef = useRef<Map<string, ((...args: any[]) => void)[]>>(new Map());

  // Configuración completa
  const fullConfig = {
    ...SOCKET_CONFIG,
    ...config,
  };

  // Función para conectar
  const connect = useCallback( async() => {
    try {
      if (socketRef.current?.connected) {
        console.log('Socket ya está conectado');
        return;
      }

      // Si ya existe un socket, desconectar primero
      if (socketRef.current) {
        socketRef.current.disconnect();
      }

      setIsConnecting(true);
      console.log('Conectando al socket...');

      // Crear nueva conexión Socket.IO
      const socket = io(fullConfig.URL_HOST, {
        transports: fullConfig.TRANSPORTS,
        path: fullConfig.PATH,
        reconnection: fullConfig.RECONNECTION,
        reconnectionAttempts: fullConfig.RECONNECTION_ATTEMPTS,
        reconnectionDelay: fullConfig.RECONNECTION_DELAY,
        timeout: fullConfig.TIMEOUT,
        // Configuraciones adicionales para React Native
        forceNew: true,
        jsonp: false,
        // Para evitar problemas de SSL en desarrollo
        ...(Platform.OS === 'android' ? { 
          extraHeaders: {
            'Access-Control-Allow-Origin': '*',
          }
        } : {}),
      });

      // Event listeners
      socket.on('connect', () => {
        console.log('✅ Socket.IO conectado. ID:', socket.id);
        setIsConnected(true);
        setIsConnecting(false);
      });  
     

      socketRef.current = socket;

    } catch (error) {
      console.error('❌ Error al crear socket:', error);
      setIsConnecting(false);
    }
  }, [fullConfig]);

  // Función para desconectar
  const disconnect = useCallback(() => {
    if (socketRef.current) {
      console.log('Desconectando socket...');
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
      setIsConnecting(false);
    }
  }, []);

  // Emitir evento
  const emit = useCallback((event: string, data?: any): boolean => {
    try {
      if (socketRef.current?.connected) {
        console.log(`📤 Emitiendo "${event}":`, data);
        socketRef.current.emit(event, data);
        return true;
      } else {
        console.warn(`⚠️ No se puede emitir "${event}": Socket no conectado`);
        return false;
      }
    } catch (error) {
      console.error(`❌ Error emitiendo "${event}":`, error);
      return false;
    }
  }, []);

  // Escuchar evento
  const on = useCallback((event: string, callback: (...args: any[]) => void): (() => void) => {
    // Guardar callback para re-registrar al reconectar
    if (!eventsRef.current.has(event)) {
      eventsRef.current.set(event, []);
    }
    eventsRef.current.get(event)?.push(callback);

    // Registrar en socket actual si existe
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }

    // Retornar función para remover listener
    return () => {
      const callbacks = eventsRef.current.get(event);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
      
      if (socketRef.current) {
        socketRef.current.off(event, callback);
      }
    };
  }, []);

  // Remover listener específico
  const off = useCallback((event: string, callback?: (...args: any[]) => void) => {
    if (callback) {
      const callbacks = eventsRef.current.get(event);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    } else {
      eventsRef.current.delete(event);
    }

    if (socketRef.current) {
      socketRef.current.off(event, callback);
    }
  }, []);

  // Función específica para unirse como paciente
  const joinPatient = useCallback( async(username: string): boolean => {
    if (!username.trim()) {
      console.error('❌ Nombre de usuario requerido');
      return false;
    }

    return emit('join', {
      username: username.trim(),
      timestamp: new Date().toISOString(),
    });
  }, [emit]);

  // Conectar automáticamente al montar
  useEffect(() => {
    connect();

  
  }, [connect, disconnect]);

  return {
    socket: socketRef.current,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    emit,
    on,
    off,
    joinPatient,
  };
};


export default useSocketIO

