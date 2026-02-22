import { useCallback, useState } from 'react';
import { useDatabase } from '../context/SQLiteContext';
import { UserSqlite } from '../types/contexttypes';
import { Product } from '../types/products';
import { Quotation } from '../types/quotation';

export const useSqlite = () => {
    const { executeSql, fetchData } = useDatabase();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Crear un nuevo usuario
    const createUser = useCallback(async (user: Omit<UserSqlite, 'id' | 'created_at'>): Promise<number> => {
        setLoading(true);
        setError(null);

        try {
            const userSave = await getUsers();
            if (userSave.length == 0) {
                const result = await executeSql(
                    'INSERT INTO users (name, email) VALUES (?, ?)',
                    [user.name, user.email]
                );

                return result.insertId || 0;
            } else {
                return 0;
            }
        } catch (err: any) {
            console.log(err)
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [executeSql]);

    // Obtener todos los usuarios
    const getUsers = useCallback(async (): Promise<UserSqlite[]> => {
        setLoading(true);
        setError(null);

        try {
            const users = await fetchData('SELECT * FROM users ORDER BY created_at DESC');
            return users;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchData]);

    // Obtener un usuario por ID
    const getUserById = useCallback(async (id: number): Promise<UserSqlite | null> => {
        setLoading(true);
        setError(null);

        try {
            const users = await fetchData('SELECT * FROM users WHERE id = ?', [id]);
            return users.length > 0 ? users[0] : null;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchData]);

    // Actualizar usuario
    const updateUser = useCallback(async (id: number, user: Partial<UserSqlite>): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const result = await executeSql(
                'UPDATE users SET name = ?, email = ? WHERE id = ?',
                [user.name, user.email, id]
            );
            return result.rowsAffected > 0;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [executeSql]);

    // Eliminar usuario
    const deleteUser = useCallback(async (id: number): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const result = await executeSql('DELETE FROM users WHERE id = ?', [id]);
            return result.rowsAffected > 0;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [executeSql]);

    // Crear o actualizar producto en el carrito
    const createOrUpdateCart = useCallback(async (product: Product, user_id: number): Promise<number> => {
        setLoading(true);
        setError(null);
        try {
            const data = await getProductCartById(product.id_product);

            if (data == null) {

                const result = await executeSql(
                    'INSERT INTO cart (id_product,description,title,price,category,image,user_id,quantity) VALUES (?,?,?,?,?,?,?,?)',
                    [
                        product.id_product,
                        product.description,
                        product.title,
                        product.price,
                        product.category,
                        product.image,
                        user_id,
                        product.quantity
                    ]
                );
                return result.insertId || 1;
            } else {
                return 8;
            }
        } catch (err: any) {
            setError(err.message);
            throw 0;
        } finally {
            setLoading(false);
        }
    }, [executeSql]);


    // Obtener todos los productos del carrito
    const getAllProductCart = useCallback(async (): Promise<UserSqlite[]> => {
        setLoading(true);
        setError(null);

        try {
            const users = await fetchData('SELECT * FROM cart ORDER BY created_at DESC');
            return users;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchData]);

    // Obtener un producto del carrito
    const getProductCartById = useCallback(async (id: number): Promise<UserSqlite | null> => {
        setLoading(true);
        setError(null);

        try {
            const users = await fetchData('SELECT * FROM cart WHERE id_product = ?', [id]);
            return users.length > 0 ? users[0] : null;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchData]);

    // Eliminar un producto del carrito
    const deleteOneProductCart = useCallback(async (id_product: number): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const result = await executeSql('DELETE FROM cart WHERE id_product = ?', [id_product]);
            return result.rowsAffected > 0;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [executeSql]);

    // Eliminar un producto del carrito
    const deleteAllProductCart = useCallback(async (): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const result = await executeSql('DELETE FROM cart');
            return result.rowsAffected > 0;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [executeSql]);

    // actualizar cantidad de producto del carrito
    const updateProductQuantity = useCallback(async (id_product: number, quantity: number): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const result = await executeSql(
                'UPDATE cart SET quantity = ? WHERE id_product = ?',
                [quantity, id_product]
            );
            return result.rowsAffected > 0;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [executeSql]);

    // Crear una cotización
    const createQuotation = useCallback(async (quotation: Quotation, user_id: number): Promise<number> => {
        setLoading(true);
        setError(null);
        try {


            const result = await executeSql(
                'INSERT INTO quotations (service,protection,dimensions_json,quality_json,additional_json,client_json,image,user_id) VALUES (?,?,?,?,?,?,?,?)',
                [
                    quotation.service,
                    quotation.protection,
                    quotation.dimensions_json,
                    quotation.quality_json,
                    quotation.additional_json,
                    quotation.client_json,
                    quotation.image,
                    user_id
                ]
            );
            return result.insertId || 1;

        } catch (err: any) {
            setError(err.message);
            throw 0;
        } finally {
            setLoading(false);
        }
    }, [executeSql]);


    // Obtener todos los productos del carrito
    const getAllQuotation = useCallback(async (): Promise<Quotation[]> => {
        setLoading(true);
        setError(null);

        try {
            const users = await fetchData('SELECT * FROM quotations ORDER BY created_at DESC');
            return users;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchData]);
    return {
        loading,
        error,
        createUser,
        getUsers,
        getUserById,
        updateUser,
        deleteUser,
        createOrUpdateCart,
        getAllProductCart,
        getProductCartById,
        deleteOneProductCart,
        deleteAllProductCart,
        updateProductQuantity,
        createQuotation,
        getAllQuotation
    };
};


const DummyComponent = () => null;
export default DummyComponent;