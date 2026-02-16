export type User = {
  id: string;
  username: string;
  password: string;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
};

export interface UserSqlite {
  id?: number;
  name: string;
  email: string;
  created_at?: string;
}

export interface Task {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  user_id?: number;
  created_at?: string;
}

export interface DatabaseResult {
  insertId?: number;
  rowsAffected: number;
  rows: {
    length: number;
    item: (index: number) => any;
    _array: any[];
  };
}

const DummyComponent = () => null;
export default DummyComponent;
