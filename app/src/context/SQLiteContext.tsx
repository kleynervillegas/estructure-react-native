import * as SQLite from 'expo-sqlite';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Definir interfaces para los resultados de SQLite
interface SQLResultSet {
  insertId?: number;
  rowsAffected: number;
  rows: {
    length: number;
    item: (index: number) => any;
    _array: any[];
  };
}

// Interfaces para las operaciones de base de datos
interface DatabaseContextType {
  db: SQLite.SQLiteDatabase | null;
  isInitialized: boolean;
  initializeDatabase: () => Promise<void>;
  executeSql: (sql: string, params?: any[]) => Promise<SQLResultSet>;
  fetchData: (sql: string, params?: any[]) => Promise<any[]>;
  getFirst: <T = any>(sql: string, params?: any[]) => Promise<T | null>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

interface DatabaseProviderProps {
  children: ReactNode;
}

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({ children }) => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Inicializar base de datos
  const initializeDatabase = async (): Promise<void> => {
    try {
      console.log('📦 Initializing SQLite database...');
      
      // Abrir o crear la base de datos
      const database = await SQLite.openDatabaseAsync('DB_APP_V1.db');
      setDb(database);
      
      console.log('✅ Database opened:', database);
      
      // Crear tablas iniciales
      await database.execAsync(`
        PRAGMA journal_mode = WAL;
        PRAGMA foreign_keys = ON;
        
        -- Tabla de usuarios
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        
        -- Tabla del carrito
        CREATE TABLE IF NOT EXISTS cart (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_product INTEGER NOT NULL,
          description TEXT,
          title TEXT NOT NULL,
          price REAL DEFAULT 0.0,
          category TEXT,
          image TEXT,
          user_id INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id)
        );
      `);
      
      // Verificar tablas creadas
      const tables = await database.getAllAsync(
        "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
      );
      console.log('📊 Tables created:', tables);
      
      setIsInitialized(true);
      console.log('🎉 Database initialized successfully');
      
    } catch (error) {
      console.error('❌ Failed to initialize database:', error);
      throw error;
    }
  };

  // Función genérica para ejecutar SQL
  const executeSql = async (sql: string, params: any[] = []): Promise<SQLResultSet> => {
    if (!db) {
      throw new Error('Database not initialized');
    }

    try {
      const sqlUpper = sql.trim().toUpperCase();
      
      // Para consultas SELECT, usar getAllAsync
      if (sqlUpper.startsWith('SELECT')) {
        const result = await db.getAllAsync(sql, ...params);
        return {
          insertId: undefined,
          rowsAffected: 0,
          rows: {
            length: result.length,
            item: (index: number) => result[index],
            _array: result
          }
        };
      } 
      // Para INSERT, UPDATE, DELETE usar runAsync
      else {
        const result = await db.runAsync(sql, ...params);
        return {
          insertId: result.lastInsertRowId,
          rowsAffected: result.changes || 0,
          rows: {
            length: 0,
            item: () => null,
            _array: []
          }
        };
      }
    } catch (error) {
      console.error('SQL execution error:', error);
      throw error;
    }
  };

  // Función para obtener datos
  const fetchData = async (sql: string, params: any[] = []): Promise<any[]> => {
    if (!db) {
      throw new Error('Database not initialized');
    }

    try {
      return await db.getAllAsync(sql, ...params);
    } catch (error) {
      console.error('Fetch data error:', error);
      throw error;
    }
  };

  // Función para obtener el primer resultado
  const getFirst = async <T = any>(sql: string, params: any[] = []): Promise<T | null> => {
    if (!db) {
      throw new Error('Database not initialized');
    }

    try {
      const results = await db.getAllAsync(sql, ...params);
      return results.length > 0 ? (results[0] as T) : null;
    } catch (error) {
      console.error('Get first error:', error);
      throw error;
    }
  };

  // Efecto para inicializar la base de datos al montar
  useEffect(() => {
    initializeDatabase().catch(console.error);
  }, []);

  const value: DatabaseContextType = {
    db,
    isInitialized,
    initializeDatabase,
    executeSql,
    fetchData,
    getFirst,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useDatabase = (): DatabaseContextType => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};

export default useDatabase;