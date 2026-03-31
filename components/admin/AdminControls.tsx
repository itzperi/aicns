import React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { useContent } from '../../contexts/ContentContext';
import { Save, LogOut } from 'lucide-react';

export const AdminControls: React.FC = () => {
    const { isAdmin, logout } = useAdmin();
    const { saveChanges, hasUnsavedChanges } = useContent();

    if (!isAdmin) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[90] flex flex-col gap-4">
            {hasUnsavedChanges && (
                <button 
                    onClick={saveChanges}
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 hover:scale-105 transition-all animate-bounce"
                >
                    <Save size={20} /> Save Changes
                </button>
            )}
            <button 
                onClick={logout}
                className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-slate-900 transition-all"
            >
                <LogOut size={20} /> Logout
            </button>
            <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full text-center shadow">
                Admin Mode Active
            </div>
        </div>
    );
};