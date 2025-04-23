import { createContext, useState, useContext } from 'react';
import { setAuthToken } from '../api/api';

// Authenticating user context
export const AuthContext = createContext();

// Authenticating user provider
export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const logout = () => {
        setAuthToken(null);
        setIsAuthenticated(false);
    }
    // Setting the isAuthenticated state to true
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to get the isAuthenticated state
export const useAuth = () => useContext(AuthContext);