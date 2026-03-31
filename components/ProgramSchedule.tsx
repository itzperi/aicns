import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { EditableText, EditableFile } from './ui/Editable';
import { FileDown, FileText, Plus, Trash2 } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

export const ProgramSchedule: React.FC = () => {
    const { content, updateContent } = useContent();
    const { isAdmin } = useAdmin();
    const schedule = content.programSchedule;

    const updateSchedule = (key: string, val: any) => {
        updateContent('programSchedule', { ...schedule, [key]: val });
    };

    const updateDocument = (index: number, field: string, val: string) => {
        const newDocs = [...schedule.documents];
        if (newDocs[index]) {
            (newDocs[index] as any)[field] = val;
            updateSchedule('documents', newDocs);
        }
    };

    const addDocument = () => {
        const newDoc = {
            id: schedule.documents.length + 1,
            title: "New Document",
            fileUrl: "#"
        };
        updateSchedule('documents', [...schedule.documents, newDoc]);
    };

    const removeDocument = (index: number) => {
        const newDocs = schedule.documents.filter((_, i) => i !== index);
        updateSchedule('documents', newDocs);
    };

    return (
        <section id="schedule" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        <EditableText value={schedule.title} onChange={(v) => updateSchedule('title', v)} />
                    </h2>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-8"></div>
                    {isAdmin && (
                        <button
                            onClick={addDocument}
                            className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-colors mx-auto"
                        >
                            <Plus size={18} /> Add Document
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {schedule.documents.map((doc, idx) => (
                        <div key={doc.id} className="bg-slate-50 border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                            <div className="p-4 bg-blue-100 rounded-full mb-4 text-blue-600">
                                <FileText size={32} />
                            </div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">
                                <EditableText
                                    value={doc.title}
                                    onChange={(v) => updateDocument(idx, 'title', v)}
                                />
                            </h3>
                            <a
                                href={doc.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm border-b border-transparent hover:border-blue-600 transition-all"
                                onClick={(e) => {
                                    if (doc.fileUrl === '#') e.preventDefault();
                                }}
                            >
                                <FileDown size={16} />
                                Download PDF
                            </a>

                            {isAdmin && (
                                <div className="mt-4 w-full space-y-3">
                                    <div>
                                        <label className="text-xs text-slate-500 block mb-1">Document URL:</label>
                                        <EditableText
                                            value={doc.fileUrl}
                                            onChange={(v) => updateDocument(idx, 'fileUrl', v)}
                                            className="text-xs w-full bg-white border border-gray-300 rounded px-2 py-1 mb-2"
                                        />
                                        <EditableFile
                                            onUpload={(v) => updateDocument(idx, 'fileUrl', v)}
                                            label="Upload Schedule PDF"
                                            className="w-full justify-center"
                                        />
                                    </div>
                                    <button
                                        onClick={() => removeDocument(idx)}
                                        className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1 mx-auto"
                                    >
                                        <Trash2 size={12} /> Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
