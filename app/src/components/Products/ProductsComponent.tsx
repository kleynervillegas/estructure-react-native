import useProducts from "@/app/src/hooks/useProducts";
import { useSqlite } from "@/app/src/hooks/useSqlite";
import { Product } from "@/app/src/types/products";
import { formatPrice } from "@/app/src/utils/functions";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import antena from '../../../../assets/images/antena.webp';
import caramas2 from '../../../../assets/images/camaras2.webp';
import dvr from '../../../../assets/images/dvr.jpeg';
import caramas1 from '../../../../assets/images/KIT4_IP_POE.jpg';

const { width } = Dimensions.get('window');

const ProductsComponent: React.FC<any> = ({ showToast }) => {

    const { addProductoToCart, deleteroductoToCart } = useProducts();
    const { getAllProductCart, deleteAllProductCart } = useSqlite();
    
    const [products, setProducto] = useState<Product[]>([
        {
            id_product: 1,
            inCart: false,
            description: 'Combos de Camaras HIK VISION',
            title: "camaras",
            price: 122550,
            image: caramas1,
            category: 'SEGURIDAD',
        },
        {
            id_product: 2,
            inCart: false,
            category: 'TECNOLOGIA',
            title: "camaras",
            description: 'Combos de Camaras HIK VISION',
            price: 49450,
            image: caramas2,
        },
        {
            id_product: 3,
            inCart: false,
            category: 'SEGURIDAD',
            title: "camaras",
            description: 'Antenas Starlink',
            price: 189990,
            image: antena,
        },
        {
            id_product: 4,
            inCart: false,
            category: 'TECNOLOGIA',
            title: "camaras",
            description: 'Dispositivos DVR',
            price: 35990,
            image: dvr,
        },
    ])

      useFocusEffect(
        useCallback(() => {
          init();
          return () => { };
        }, [])
      );

    const init = useCallback(async () => {

        const productsCart: any = await getAllProductCart();

        const productosActualizados = products.map(producto => {

            const existeEnCarrito = productsCart.some(
                (item: Product) => item.id_product === producto.id_product
            );

            return {
                ...producto,
                inCart: existeEnCarrito
            };
        });

        setProducto(productosActualizados);

    }, [products]);

    const handleProductoCart = useCallback(async (product: Product) => {
        if (product.inCart) {
            await deleteroductoToCart(product);
            showToast('Producto eliminado correctamnete');
        } else {
            const resp = await addProductoToCart({ ...product, quantity: 1 });
            console.log("agregando al carrito", resp)
            if (resp == 0) {
                showToast('Error al agregar el producto', "error");
            } else {
                showToast('Producto agregado correctamente');
            }
        }
        init();
    }, [init]);

    return (
        <View style={styles.container}>
            <View style={styles.productsHeader}>
                <Text style={styles.sectionTitle}>Productos Destacados</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>Ver todos</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.productsGrid}>
                {products.map((product: Product, key: number) => (
                    <View key={key} style={styles.productCard}>
                        {product.inCart &&
                            <View style={styles.iconDeleteProduct}>
                                <TouchableOpacity onPress={() => handleProductoCart(product)}>
                                    <Ionicons name={"close-circle-sharp"} size={23} color="red" />
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={styles.imageContainer}>
                            <Image source={product.image} style={styles.productImage} />
                        </View>
                        <View style={styles.productInfo}>
                            <View style={[
                                styles.categoryBadge,
                                { backgroundColor: product.category === 'EJERCICIOS' ? '#EEF2FF' : '#D1FAE5' }
                            ]}>
                                <Text style={[
                                    styles.categoryText,
                                    { color: product.category === 'EJERCICIOS' ? '#4F46E5' : '#059669' }
                                ]}>
                                    {product.category}
                                </Text>
                            </View>
                            <Text style={styles.productName} numberOfLines={2}>
                                {product.description}
                            </Text>
                            <View style={styles.productFooter}>
                                <Text style={styles.productPrice}>$ {formatPrice(product.price)}</Text>
                                {!product.inCart &&
                                    <TouchableOpacity style={styles.addButton} onPress={() => handleProductoCart(product)}>
                                        <Ionicons name={"cart"} size={16} color="#FFF" />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    seeAll: {
        color: '#2563EB',
        fontWeight: '600',
        fontSize: 14,
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
    productCard: {
        width: (width - 36) / 2,
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginBottom: 16,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
    },
    productInfo: {
        flex: 1,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    productName: {
        fontSize: 13,
        color: '#1F2937',
        fontWeight: '500',
        marginBottom: 12,
        height: 36,
        lineHeight: 18,
    },
    productFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2563EB',
        flex: 1,
    },
    addButton: {
        backgroundColor: '#2563EB',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconDeleteProduct: {
        position: "absolute",
        alignSelf: 'flex-end',
    }
});

export default ProductsComponent