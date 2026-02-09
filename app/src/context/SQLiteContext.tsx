import * as SQLite from 'expo-sqlite';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface DatabaseContextType {
  db: SQLite.SQLiteDatabase | null;
  isInitialized: boolean;
  initializeDatabase: () => Promise<void>;
  executeSql: (sql: string, params?: any[]) => Promise<SQLite.SQLResultSet>;
  fetchData: (sql: string, params?: any[]) => Promise<any[]>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

interface DatabaseProviderProps {
  children: ReactNode;
}

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({ children }) => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Inicializar base de datos - CORREGIDO
  const initializeDatabase = async (): Promise<void> => {
    try {
      // Abrir o crear la base de datos
      const database = await SQLite.openDatabaseAsync('myDatabase.db');
      setDb(database);
      
      // Crear tablas iniciales
      await database.execAsync(`
        PRAGMA journal_mode = WAL;
        
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          description TEXT,
          completed BOOLEAN DEFAULT 0,
          user_id INTEGER,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id)
        );
      `);
      
      console.log('Database initialized successfully');
      setIsInitialized(true);
      
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  };

  // Función genérica para ejecutar SQL - CORREGIDO
  const executeSql = async (sql: string, params: any[] = []): Promise<SQLite.SQLResultSet> => {
    if (!db) {
      throw new Error('Database not initialized');
    }

    try {
      // Para consultas SELECT, usar getAllAsync
      if (sql.trim().toUpperCase().startsWith('SELECT')) {
        const result = await db.getAllAsync(sql, ...params);
        return {
          insertId: undefined,
          rowsAffected: 0,
          rows: {
            length: result.length,
            item: (index: number) => result[index],
            _array: result
          }
        } as SQLite.SQLResultSet;
      } 
      // Para INSERT, UPDATE, DELETE usar runAsync
      else {
        const result = await db.runAsync(sql, ...params);
        return {
          insertId: result.lastInsertRowId,
          rowsAffected: result.changes,
          rows: {
            length: 0,
            item: () => null,
            _array: []
          }
        } as SQLite.SQLResultSet;
      }
    } catch (error) {
      console.error('SQL execution error:', error);
      throw error;
    }
  };

  // Función para obtener datos - SIMPLIFICADA
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
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

// Hook personalizado para usar el contexto
const useDatabase = (): DatabaseContextType => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};

export default  useDatabase