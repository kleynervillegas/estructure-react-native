import { useCallback, useState } from 'react';
import { useDatabase } from '../context/SQLiteContext';
import { UserSqlite } from '../types/contexttypes';

export const useUsers = () => {
    const { executeSql, fetchData } = useDatabase();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Crear un nuevo usuario
    const createUser = useCallback(async (user: Omit<UserSqlite, 'id' | 'created_at'>): Promise<number> => {
        setLoading(true);
        setError(null);

        try {
            const result = await executeSql(
                'INSERT INTO users (name, email) VALUES (?, ?)',
                [user.name, user.email]
            );
            return result.insertId || 0;
        } catch (err: any) {
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

    return {
        loading,
        error,
        createUser,
        getUsers,
        getUserById,
        updateUser,
        deleteUser,
    };
};


const DummyComponent = () => null;
export default DummyComponent;