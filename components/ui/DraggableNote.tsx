import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../../contexts/AdminContext';
import { useContent } from '../../contexts/ContentContext';
import { Trash2, GripHorizontal } from 'lucide-react';
import { EditableText } from './Editable';

interface DraggableNoteProps {
    id: string;
    content: string;
    x: number;
    y: number;
    show: boolean;
}

export const DraggableNote: React.FC<DraggableNoteProps> = ({ id, content: text, x, y, show }) => {
    const { isAdmin } = useAdmin();
    const { content, updateContent } = useContent();

    if (!show && !isAdmin) return null;

    const handleDelete = () => {
        const newNotes = content.floatingNotes.filter(n => n.id !== id);
        updateContent('floatingNotes', newNotes);
    };

    const handleUpdate = (val: string) => {
        const newNotes = content.floatingNotes.map(n =>
            n.id === id ? { ...n, content: val } : n
        );
        updateContent('floatingNotes', newNotes);
    };

    const handleDragEnd = (_: any, info: any) => {
        const newNotes = content.floatingNotes.map(n =>
            n.id === id ? { ...n, x: n.x + info.offset.x, y: n.y + info.offset.y } : n
        );
        updateContent('floatingNotes', newNotes);
    };

    return (
        <motion.div
            drag={isAdmin}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            initial={{ x, y }}
            className={`fixed z-[9999] p-4 bg-yellow-100 border border-yellow-300 rounded-lg shadow-xl min-w-[200px] max-w-sm ${!show ? 'opacity-50 grayscale' : ''}`}
            style={{ x, y }}
        >
            {isAdmin && (
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-yellow-200">
                    <div className="cursor-grab active:cursor-grabbing text-yellow-600">
                        <GripHorizontal size={14} />
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                const newNotes = content.floatingNotes.map(n =>
                                    n.id === id ? { ...n, show: !n.show } : n
                                );
                                updateContent('floatingNotes', newNotes);
                            }}
                            className={`text-[10px] font-bold px-1.5 rounded ${show ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
                        >
                            {show ? 'VISIBLE' : 'HIDDEN'}
                        </button>
                        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
            )}
            <div className="text-gray-800 font-medium">
                <EditableText
                    value={text}
                    onChange={handleUpdate}
                    multiline
                    className="bg-transparent border-none text-sm p-0 focus:ring-0 min-h-[50px]"
                />
            </div>
            {isAdmin && !show && (
                <div className="mt-2 text-[10px] text-red-600 font-bold uppercase text-center">Hidden from users</div>
            )}
        </motion.div>
    );
};
