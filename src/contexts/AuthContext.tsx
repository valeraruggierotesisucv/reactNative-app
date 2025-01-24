import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Alert } from 'react-native';
import { AuthUser, Session } from '@supabase/supabase-js';
import * as SplashScreen from "expo-splash-screen";

interface AuthContextType {
    user: AuthUser | null;
    session: Session | null;
    login: (email:string, password: string) => void;
    logout: () => void;
    resetPassword: (email:string) => void
    signup: (email:string, password: string, fullname: string, username: string) => Promise<AuthUser | null | undefined>
    updatePassword: (password: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [session, setSession] = useState<Session | null>(null);

    const signup = async(email: string, password: string, fullname: string, username: string) => {
        
        try {
            const { error, data} = await supabase.auth.signUp({
                    email: email, 
                    password: password,
                options: {
                    data: {
                        full_name: fullname,
                        username: username,           
                    }
                }
            })
            if(error) Alert.alert(error.message)
            setUser(data.user);
            setSession(data.session)
            return data.user

        } catch (error: any) {
            Alert.alert(error.message)
            console.error("Error signing up:", error);
        }
    }

    const login = async(email: string, password: string) => {
        const { error, data} = await supabase.auth.signInWithPassword({
            email: email, 
            password: password
        })

        if (error) Alert.alert(error.message); 
        setUser(data.user);
        setSession(data.session)
    };

    const updatePassword = async(password: string) => {
        const { error } = await supabase.auth.updateUser({ password: password })
        if (error) Alert.alert(error.message)
    }

    const logout = () => {
        setUser(null);
        setSession(null);
        supabase.auth.signOut();
    };

    const resetPassword = async(email:string) => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email)
        console.log("email", email); 
        console.log(data); 
        if(error) Alert.alert(error.message); 
    }

    useEffect(() => {
        const loadSession = async () => {
            try {
                await SplashScreen.preventAutoHideAsync();
                const { data: sessionData } = await supabase.auth.getSession();
                setSession(sessionData.session);
                setUser(sessionData.session?.user || null);
                await SplashScreen.hideAsync();
            } catch (error) {
                console.error("Error preventing auto-hide of splash screen:", error);
            } finally {
                await SplashScreen.hideAsync();
            }
        };
        loadSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setSession(session);
                setUser(session?.user || null);
            }
        );
        return () => {
            authListener?.subscription.unsubscribe();
        };  
    }, []);

    return (
        <AuthContext.Provider value={{ user, session, login, logout, resetPassword, signup, updatePassword }}>
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