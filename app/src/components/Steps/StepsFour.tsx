import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get('window');

const StepsFour: React.FC<any> = (
    {
        additionalData,
        setAdditionalData
    }) => {
    const [fileInfo, setFileInfo] = useState<any>(null);
    const [isUploading, setIsUploading] = useState(false);

    const selectFile = async () => {
        try {
       
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status !== 'granted') {
               console.warn('Permiso de acceso a la galería denegado');
                return;
            }

            setIsUploading(true);

            const result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.8,
                base64: true,
            });

            if (!result.canceled && result.assets.length > 0) {
                setFileInfo(result.assets[0]);
                setAdditionalData({ 
                    ...additionalData, 
                    img: result.assets[0].base64,
                    imgExt: result.assets[0].uri.split('.').pop()
                });
            }

        } catch (err) {
            console.error('Error:', err);
            Alert.alert('Error', 'No se pudo seleccionar el archivo');
        } finally {
            setIsUploading(false);
        }
    };

    const removeFile = () => {
        Alert.alert(
            'Eliminar plano',
            '¿Estás seguro de que quieres eliminar este plano?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', onPress: () => setFileInfo(null), style: 'destructive' }
            ]
        );
    };

    return (
        <View style={styles.stepContent}>
            {/* Sección Carga de Plano  */}
            <View style={styles.sectionHeader}>
                <LinearGradient
                    colors={['#2563EB', '#1E40AF']}
                    style={styles.sectionBadge}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Ionicons name="document-text" size={18} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Carga tu plano</Text>
            </View>

            <Text style={styles.sectionSubtitle}>
                Sube el plano de tu instalación para una mejor planificación
            </Text>

            <View style={styles.uploadGrid}>
                <TouchableOpacity
                    style={styles.uploadCard}
                    onPress={selectFile}
                    activeOpacity={0.7}
                    disabled={isUploading}
                >
                    <LinearGradient
                        colors={['#F9FAFB', '#F3F4F6']}
                        style={styles.uploadGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        {isUploading ? (
                            <ActivityIndicator size="small" color="#2563EB" />
                        ) : (
                            <>
                                <View style={styles.uploadIconCircle}>
                                    <Ionicons name="cloud-upload-outline" size={28} color="#2563EB" />
                                </View>
                                <Text style={styles.uploadText}>Subir plano</Text>
                                <Text style={styles.uploadHint}>PDF, JPG, PNG</Text>
                            </>
                        )}
                    </LinearGradient>
                </TouchableOpacity>


                {fileInfo ? (
                    <View style={styles.previewCard}>
                        <LinearGradient
                            colors={['#EFF6FF', '#DBEAFE']}
                            style={styles.previewGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            {fileInfo.base64 ? (
                                <Image
                                    source={{ uri: `data:image/jpeg;base64,${fileInfo.base64}` }}
                                    style={styles.previewImage}
                                />
                            ) : (
                                <View style={styles.previewIconContainer}>
                                    <Ionicons name="document" size={32} color="#2563EB" />
                                </View>
                            )}

                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={removeFile}
                            >
                                <Ionicons name="close-circle" size={22} color="#EF4444" />
                            </TouchableOpacity>

                            <View style={styles.previewBadge}>
                                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                                <Text style={styles.previewBadgeText}>Cargado</Text>
                            </View>
                        </LinearGradient>
                    </View>
                ) : (

                    <View style={styles.placeholderCard}>
                        <Ionicons name="images-outline" size={28} color="#9CA3AF" />
                        <Text style={styles.placeholderText}>Vista previa</Text>
                    </View>
                )}
            </View>

            {/* Separador decorativo */}
            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <View style={styles.dividerIcon}>
                    <Ionicons name="layers-outline" size={16} color="#2563EB" />
                </View>
                <View style={styles.dividerLine} />
            </View>

            {/* Servicios Adicionales */}
            <View style={styles.sectionHeader}>
                <LinearGradient
                    colors={['#2563EB', '#1E40AF']}
                    style={styles.sectionBadge}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Ionicons name="options-outline" size={18} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Servicios Adicionales</Text>
            </View>

            <Text style={styles.sectionSubtitle}>
                Personaliza tu instalación con estos servicios
            </Text>

            {/* Soporte Técnico */}
            <View style={styles.serviceCategory}>
                <Text style={styles.categoryTitle}>Soporte Técnico</Text>
                <View style={styles.checkboxGroup}>
                    <TouchableOpacity
                        style={[styles.checkboxItem, additionalData.instalacionProfesional && styles.checkboxItemActive]}
                        onPress={() => setAdditionalData({
                            ...additionalData,
                            instalacionProfesional: !additionalData.instalacionProfesional
                        })}>
                        <LinearGradient
                            colors={additionalData.instalacionProfesional ? ['#2563EB', '#1E40AF'] : ['#F3F4F6', '#E5E7EB']}
                            style={styles.checkbox}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            {additionalData.instalacionProfesional && (
                                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                            )}
                        </LinearGradient>
                        <Text style={styles.checkboxLabel}>Instalación Profesional</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.checkboxItem, additionalData.mantenimientoAnual && styles.checkboxItemActive]}
                        onPress={() => setAdditionalData({
                            ...additionalData,
                            mantenimientoAnual: !additionalData.mantenimientoAnual
                        })}>
                        <LinearGradient
                            colors={additionalData.mantenimientoAnual ? ['#2563EB', '#1E40AF'] : ['#F3F4F6', '#E5E7EB']}
                            style={styles.checkbox}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            {additionalData.mantenimientoAnual && (
                                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                            )}
                        </LinearGradient>
                        <Text style={styles.checkboxLabel}>Mantenimiento Anual</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.checkboxItem, additionalData.garantiaExtendida && styles.checkboxItemActive]}
                        onPress={() => setAdditionalData({
                            ...additionalData,
                            garantiaExtendida: !additionalData.garantiaExtendida
                        })}>
                        <LinearGradient
                            colors={additionalData.garantiaExtendida ? ['#2563EB', '#1E40AF'] : ['#F3F4F6', '#E5E7EB']}
                            style={styles.checkbox}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            {additionalData.garantiaExtendida && (
                                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                            )}
                        </LinearGradient>
                        <Text style={styles.checkboxLabel}>Garantía Extendida</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Conectividad */}
            <View style={styles.serviceCategory}>
                <Text style={styles.categoryTitle}>Conectividad</Text>
                <View style={styles.checkboxGroup}>
                    <TouchableOpacity
                        style={[styles.checkboxItem, additionalData.modulo4G && styles.checkboxItemActive]}
                        onPress={() => setAdditionalData({
                            ...additionalData,
                            modulo4G: !additionalData.modulo4G
                        })}>
                        <LinearGradient
                            colors={additionalData.modulo4G ? ['#2563EB', '#1E40AF'] : ['#F3F4F6', '#E5E7EB']}
                            style={styles.checkbox}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            {additionalData.modulo4G && (
                                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                            )}
                        </LinearGradient>
                        <Text style={styles.checkboxLabel}>Módulo 4G</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.checkboxItem, additionalData.almacenamientoNube && styles.checkboxItemActive]}
                        onPress={() => setAdditionalData({
                            ...additionalData,
                            almacenamientoNube: !additionalData.almacenamientoNube
                        })}>
                        <LinearGradient
                            colors={additionalData.almacenamientoNube ? ['#2563EB', '#1E40AF'] : ['#F3F4F6', '#E5E7EB']}
                            style={styles.checkbox}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            {additionalData.almacenamientoNube && (
                                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                            )}
                        </LinearGradient>
                        <Text style={styles.checkboxLabel}>Almacenamiento en la Nube</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Integración */}
            <View style={styles.serviceCategory}>
                <Text style={styles.categoryTitle}>Integración</Text>
                <View style={styles.checkboxGroup}>
                    <TouchableOpacity
                        style={[styles.checkboxItem, additionalData.controlRemoto && styles.checkboxItemActive]}
                        onPress={() => setAdditionalData({
                            ...additionalData,
                            controlRemoto: !additionalData.controlRemoto
                        })}>
                        <LinearGradient
                            colors={additionalData.controlRemoto ? ['#2563EB', '#1E40AF'] : ['#F3F4F6', '#E5E7EB']}
                            style={styles.checkbox}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            {additionalData.controlRemoto && (
                                <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                            )}
                        </LinearGradient>
                        <Text style={styles.checkboxLabel}>Control remoto vía app móvil</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    stepContent: {
        flex: 1,
        paddingBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    sectionBadge: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 20,
        marginLeft: 44,
    },
    uploadGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 24,
    },
    uploadCard: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    uploadGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
        borderRadius: 20,
    },
    uploadIconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    uploadText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    uploadHint: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    previewCard: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    previewGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    previewIconContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    previewBadge: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        gap: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    previewBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#10B981',
    },
    placeholderCard: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: '#F9FAFB',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
    },
    placeholderText: {
        fontSize: 13,
        color: '#9CA3AF',
        marginTop: 8,
        fontWeight: '500',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 12,
    },
    serviceCategory: {
        marginBottom: 24,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 12,
    },
    checkboxGroup: {
        gap: 12,
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 14,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    checkboxItemActive: {
        backgroundColor: '#F0F9FF',
        borderWidth: 1,
        borderColor: '#2563EB',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    checkboxLabel: {
        fontSize: 15,
        color: '#1F2937',
        flex: 1,
        fontWeight: '500',
    },
});

export default StepsFour;