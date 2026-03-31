import React from 'react';
import { FileText, Download, AlertTriangle, CheckCircle2, Award, BookOpen, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { useAdmin } from '../contexts/AdminContext';
import { EditableText, EditableFile } from './ui/Editable';

export const SubmissionGuidance: React.FC = () => {
    const { content, updateContent } = useContent();
    const { isAdmin } = useAdmin();
    const guidance = content.submissionGuidance;

    const updateGuidance = (key: string, val: any) => {
        updateContent('submissionGuidance', { ...guidance, [key]: val });
    };

    const addGuideline = () => {
        updateGuidance('guidelines', [...guidance.guidelines, "New submission guideline step"]);
    };

    const removeGuideline = (index: number) => {
        updateGuidance('guidelines', guidance.guidelines.filter((_, i) => i !== index));
    };

    const updateGuideline = (index: number, val: string) => {
        const newGuidelines = [...guidance.guidelines];
        newGuidelines[index] = val;
        updateGuidance('guidelines', newGuidelines);
    };

    return (
        <section id="submission" className="py-20 bg-gray-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <h2 className="text-3xl font-bold text-slate-900">
                            <EditableText value={guidance.title} onChange={(v) => updateGuidance('title', v)} />
                        </h2>
                    </div>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Guidelines Content - Left 2/3 */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full relative">
                            {isAdmin && (
                                <button
                                    onClick={addGuideline}
                                    className="absolute top-4 right-4 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-blue-200 transition-colors"
                                >
                                    <Plus size={14} /> Add Guideline
                                </button>
                            )}
                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                {guidance.guidelines.map((step, idx) => (
                                    <div key={idx} className="flex gap-4 group">
                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                            {idx + 1}
                                        </span>
                                        <div className="flex-grow">
                                            <EditableText
                                                value={step}
                                                onChange={(v) => updateGuideline(idx, v)}
                                                multiline
                                            />
                                        </div>
                                        {isAdmin && (
                                            <button
                                                onClick={() => removeGuideline(idx)}
                                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 bg-blue-50/50 rounded-xl p-6 border-l-4 border-blue-600">
                                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                    <AlertTriangle size={18} />
                                    <EditableText
                                        value={guidance.plagiarismPolicy.title}
                                        onChange={(v) => updateGuidance('plagiarismPolicy', { ...guidance.plagiarismPolicy, title: v })}
                                    />
                                </h4>
                                <div className="text-sm text-blue-800 leading-relaxed">
                                    <EditableText
                                        value={guidance.plagiarismPolicy.content}
                                        onChange={(v) => updateGuidance('plagiarismPolicy', { ...guidance.plagiarismPolicy, content: v })}
                                        multiline
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Cards - Right 1/3 */}
                    <div className="space-y-6">
                        {/* Template Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-600">
                                <Download size={32} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Paper Template</h3>
                            <p className="text-gray-500 text-sm mb-6">Download the official MS Word/PDF template.</p>
                            <div className="space-y-3">
                                <a
                                    href={guidance.templateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors gap-2"
                                    onClick={(e) => {
                                        if (guidance.templateUrl === '#') e.preventDefault();
                                    }}
                                >
                                    <Download size={18} /> Download Template
                                </a>
                                {isAdmin && (
                                    <div className="flex flex-col gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase">URL:</span>
                                            <EditableText
                                                value={guidance.templateUrl}
                                                onChange={(v) => updateGuidance('templateUrl', v)}
                                                className="text-[10px] text-blue-600"
                                            />
                                        </div>
                                        <EditableFile
                                            onUpload={(v) => updateGuidance('templateUrl', v)}
                                            label="Upload New Template (PDF/Word)"
                                            className="w-full justify-center"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Publication Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow group">
                            <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-600">
                                <Award size={32} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">Publication</h3>
                            <div className="text-gray-500 text-sm mb-4">
                                <EditableText
                                    value={content.publicationPolicy}
                                    onChange={(v) => updateContent('publicationPolicy', v)}
                                    multiline
                                />
                            </div>
                            <p className="text-[10px] text-gray-400 italic">Taylor and Francis Proceedings, Scopus, etc.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
