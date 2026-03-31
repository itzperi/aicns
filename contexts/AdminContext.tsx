import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextType {
    isAdmin: boolean;
    isLoginModalOpen: boolean;
    login: (u: string, p: string) => boolean;
    logout: () => void;
    openLoginModal: () => void;
    closeLoginModal: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const login = (username: string, pass: string) => {
        if (username === 'Ivriresearch' && pass === 'Ivriresearch@123') {
            setIsAdmin(true);
            setIsLoginModalOpen(false);
            return true;
        }
        return false;
    };

    const logout = () => setIsAdmin(false);
    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    return (
        <AdminContext.Provider value={{ isAdmin, isLoginModalOpen, login, logout, openLoginModal, closeLoginModal }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) throw new Error("useAdmin must be used within AdminProvider");
    return context;
};