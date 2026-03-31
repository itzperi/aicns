import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Pencil, Upload, X, Trash2, Plus } from 'lucide-react';

interface EditableTextProps {
    value: string;
    onChange: (val: string) => void;
    className?: string;
    multiline?: boolean;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const EditableText: React.FC<EditableTextProps> = ({ value, onChange, className, multiline, tag: Tag = 'span' }) => {
    const { isAdmin } = useAdmin();

    if (!isAdmin) {
        return <Tag className={className}>{value}</Tag>;
    }

    if (multiline) {
        return (
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full bg-blue-50/50 border border-blue-200 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none ${className}`}
            />
        );
    }

    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`bg-blue-50/50 border border-blue-200 rounded px-1 focus:ring-2 focus:ring-blue-500 outline-none min-w-[2ch] ${className}`}
        />
    );
};

interface EditableImageProps {
    src: string;
    alt: string;
    onChange: (newSrc: string) => void;
    className?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ src, alt, onChange, className }) => {
    const { isAdmin } = useAdmin();
    const [showInput, setShowInput] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange(reader.result as string);
                setShowInput(false);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={`relative group ${className}`}>
            <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} />
            {isAdmin && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                    <button
                        onClick={() => setShowInput(true)}
                        className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100"
                        title="Change Image"
                    >
                        <Pencil size={16} />
                    </button>
                </div>
            )}
            {showInput && (
                <div className="absolute inset-0 bg-white/95 p-4 z-10 flex flex-col justify-center items-center rounded text-center">
                    <h4 className="text-sm font-bold mb-2">Update Image</h4>
                    <input
                        type="text"
                        placeholder="Paste URL..."
                        className="w-full text-xs border p-1 rounded mb-2"
                        onChange={(e) => onChange(e.target.value)}
                    />
                    <div className="text-xs text-gray-500 mb-2">- OR -</div>
                    <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1 hover:bg-blue-700">
                        <Upload size={12} /> Upload File
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                    <button onClick={() => setShowInput(false)} className="absolute top-1 right-1 text-gray-500 hover:text-red-500">
                        <X size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

interface EditableFileProps {
    onUpload: (newUrl: string) => void;
    label?: string;
    className?: string;
    accept?: string;
}

export const EditableFile: React.FC<EditableFileProps> = ({ onUpload, label = "Upload PDF", className, accept = ".pdf,.doc,.docx" }) => {
    const { isAdmin } = useAdmin();

    if (!isAdmin) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File is too large (max 5MB). Please use a smaller file or link to an external URL.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpload(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <label className={`cursor-pointer inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-sm ${className}`}>
            <Upload size={14} />
            <span>{label}</span>
            <input type="file" accept={accept} className="hidden" onChange={handleFileChange} />
        </label>
    );
};
