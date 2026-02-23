import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';

interface ModalCustomerProps {
    children: React.ReactNode;
    visible: boolean;
    callBackModal?: () => void;
}

const ModalCustomer: React.FC<ModalCustomerProps> = ({ 
    children, 
    visible,
    callBackModal 
}) => {

    const params = useLocalSearchParams();
    const isPresented = router.canGoBack();

    // Valor animado: 0 = oculto, 1 = visible
    const translateY = useSharedValue(300);
    const opacity = useSharedValue(0);

    // Configuración de la animación
    const showModal = () => {
        translateY.value = withSpring(0, {
            damping: 15,
            stiffness: 150,
        });
        opacity.value = withTiming(1, { duration: 250 });
    };

    const hideModal = (callback?: () => void) => {
        translateY.value = withTiming(300, { duration: 200 }, (finished) => {
            if (finished && callback) {
                runOnJS(callback)();
            }
        });
        opacity.value = withTiming(0, { duration: 200 });
    };

    useEffect(() => {
        if (visible) {
            showModal();
        } else {
            hideModal(callBackModal);
        }
    }, [visible]);

    // ✅ CORRECCIÓN: Usar .value dentro de useAnimatedStyle
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }], // ✅ .value es correcto aquí
            opacity: opacity.value, // ✅ .value es correcto aquí
        };
    });

    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            {/* Fondo semitransparente */}
            <Animated.View style={[styles.backdrop, { opacity: opacity.value }]} />
            
            {/* Contenido del modal con animación */}
            <Animated.View style={[styles.container, animatedStyle]}>
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
                
                {/* Aquí se renderiza el children que pasas desde el padre */}
                {children}
                
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        elevation: 9999,
        backgroundColor: 'transparent',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9998,
        elevation: 9998,
    },
    container: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10000,
        zIndex: 10000,
    },
});

export default ModalCustomer;