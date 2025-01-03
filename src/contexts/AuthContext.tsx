import { createContext, useContext, ReactNode, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Alert } from 'react-native';
import { AuthUser, Session } from '@supabase/supabase-js';

interface AuthContextType {
    user: AuthUser | null;
    session: Session | null;
    login: (email:string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [session, setSession] = useState<Session | null>(null);

    const login = async(email: string, password: string) => {
        const { error, data} = await supabase.auth.signInWithPassword({
            email: email, 
            password: password
        })

        if (error) Alert.alert(error.message); 
        setUser(data.user);
        setSession(data.session)
    };
    
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, session, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}