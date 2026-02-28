import { ColorFontrs, Colors, themeGradients } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { useThemeColors } from '../../context/ThemeColorsContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ModalCustomerProps {
    children: React.ReactNode;
    visible: boolean;
    callBackModal?: () => void;
    title?: string;
}

const ModalCustomer: React.FC<ModalCustomerProps> = ({
    children,
    visible,
    callBackModal,
    title = "Detalle de Cotización"
}) => {


    const { theme, changeTheme } = useThemeColors();

    const gradients = themeGradients[theme];

    const colors = Colors[theme];

    const colorFontrs = ColorFontrs[theme];

    const translateY = useSharedValue(SCREEN_HEIGHT);
    const opacity = useSharedValue(0);

    const showModal = () => {
        translateY.value = withSpring(SCREEN_HEIGHT * 0.15, { // Se detiene dejando espacio arriba
            damping: 50,
            stiffness: 300,
            mass: 0.5,
        });
        opacity.value = withTiming(1, { duration: 200 });
    };

    const hideModal = (callback?: () => void) => {
        translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 }, (finished) => {
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

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    const backdropStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                translateY.value,
                [SCREEN_HEIGHT * 0.15, SCREEN_HEIGHT],
                [1, 0],
                Extrapolation.CLAMP
            ),
        };
    });

    if (!visible) return null;

    return (

        <View style={styles.overlay}>
            {/* Backdrop con opacidad animada */}
            <Pressable onPress={callBackModal} style={styles.backdropPressable}>
                <Animated.View style={[styles.backdrop, backdropStyle]} />
            </Pressable>

            {/* Modal Content */}
            <Animated.View style={[styles.container, animatedStyle]}>
                {/* Barra indicadora superior */}
                <View style={styles.handleBar} />

                {/* Header del modal como Instagram */}
                <View style={styles.modalHeader}>
                    <Text style={styles.modalHeaderTitle}>{title}</Text>
                    <Pressable onPress={callBackModal}>
                        <Text style={styles.modalHeaderClose}>✕</Text>
                    </Pressable>
                </View>

                {/* Línea divisoria */}
                <View style={styles.divider} />

                {/* Contenido del modal (comentarios) */}
                <LinearGradient
                    colors={gradients.background}
                    style={styles.content}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.content}>
                        {children}
                    </View>
                </LinearGradient>

                {/* Footer con input (como Instagram) */}
                <View style={styles.footer}>
                    <View style={styles.footerInput}>
                        <Text style={styles.footerInputText}>Agrega un comentario para...</Text>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        zIndex: 9999,
        elevation: 9999,
        backgroundColor: 'transparent',
    },
    backdropPressable: {
        ...StyleSheet.absoluteFillObject,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
        width: '100%',
        backgroundColor: '#1a1a1a',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: SCREEN_HEIGHT * 0.85,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10000,
        zIndex: 10000,
    },
    handleBar: {
        width: 40,
        height: 4,
        backgroundColor: '#404040',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 8,
        marginBottom: 8,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    modalHeaderTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    modalHeaderClose: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '400',
    },
    divider: {
        height: 0.5,
        backgroundColor: '#333',
        width: '100%',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    footer: {
        borderTopWidth: 0.5,
        borderTopColor: '#333',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#1a1a1a',
    },
    footerInput: {
        backgroundColor: '#262626',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    footerInputText: {
        color: '#8e8e8e',
        fontSize: 14,
    },
});

export default ModalCustomer;