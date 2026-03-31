import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { useAdmin } from '../contexts/AdminContext';
import { EditableText, EditableImage } from './ui/Editable';
import { Plus, Trash2, Pencil, Check, X } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ProceedingLink {
    text: string;
    url: string;
}

interface Proceeding {
    title: string;
    description: string;
    image: string;
    link?: ProceedingLink;
}

// ─── Default new proceeding template ─────────────────────────────────────────
const newProceedingTemplate = (): Proceeding => ({
    title: 'New Proceedings Title',
    description: 'Enter a description for this proceedings entry.',
    image: '/images/springer_logos.png',
    link: { text: 'Visit Publisher Website', url: '#' },
});

// ─── Inline Edit Form for a single proceeding card ───────────────────────────
const ProceedingEditForm: React.FC<{
    proceeding: Proceeding;
    onSave: (updated: Proceeding) => void;
    onCancel: () => void;
}> = ({ proceeding, onSave, onCancel }) => {
    const [draft, setDraft] = useState<Proceeding>({ ...proceeding, link: { ...(proceeding.link ?? { text: '', url: '' }) } });

    const set = (key: keyof Proceeding, val: string) => setDraft(p => ({ ...p, [key]: val }));
    const setLink = (key: keyof ProceedingLink, val: string) =>
        setDraft(p => ({ ...p, link: { ...(p.link ?? { text: '', url: '' }), [key]: val } }));

    return (
        <div className="border border-blue-400 rounded-xl p-6 bg-blue-50/30 space-y-4">
            <h4 className="font-bold text-blue-700 text-sm uppercase tracking-wider mb-2">Edit Proceedings Entry</h4>

            <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Title</label>
                <input
                    type="text"
                    value={draft.title}
                    onChange={e => set('title', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                <textarea
                    rows={4}
                    value={draft.description}
                    onChange={e => set('description', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-y"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Image URL</label>
                <input
                    type="text"
                    value={draft.image}
                    onChange={e => set('image', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="/images/logo.png or https://..."
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Link Label</label>
                    <input
                        type="text"
                        value={draft.link?.text ?? ''}
                        onChange={e => setLink('text', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Link URL</label>
                    <input
                        type="text"
                        value={draft.link?.url ?? ''}
                        onChange={e => setLink('url', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="https://..."
                    />
                </div>
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    onClick={() => onSave(draft)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors shadow"
                >
                    <Check size={16} /> Save
                </button>
                <button
                    onClick={onCancel}
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-bold px-5 py-2 rounded-lg transition-colors"
                >
                    <X size={16} /> Cancel
                </button>
            </div>
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const PublicationSection: React.FC = () => {
    const { content, updateContent } = useContent();
    const { isAdmin } = useAdmin();
    const pub = content.publication;

    const [editingIdx, setEditingIdx] = useState<number | null>(null);

    // ── helpers ──────────────────────────────────────────────────────────────
    const updatePub = (key: string, val: any) =>
        updateContent('publication', { ...pub, [key]: val });

    const saveProceeding = (idx: number, updated: Proceeding) => {
        const next = [...pub.proceedings];
        next[idx] = updated;
        updatePub('proceedings', next);
        setEditingIdx(null);
    };

    const deleteProceeding = (idx: number) => {
        if (!window.confirm('Delete this proceedings entry?')) return;
        const next = pub.proceedings.filter((_, i) => i !== idx);
        updatePub('proceedings', next);
        if (editingIdx === idx) setEditingIdx(null);
    };

    const addProceeding = () => {
        const next = [...pub.proceedings, newProceedingTemplate()];
        updatePub('proceedings', next);
        // Open edit form for the new entry immediately
        setEditingIdx(next.length - 1);
    };

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <section id="publication" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Title */}
                <div className="mb-12 flex flex-col items-start text-left">
                    <div className="relative">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight pb-6 text-blue-600">
                            <EditableText
                                value={pub.title}
                                onChange={(v) => updatePub('title', v)}
                            />
                        </h2>
                        <div className="absolute bottom-0 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full left-0 w-24" />
                    </div>
                </div>

                {/* Intro */}
                <p className="text-gray-700 mb-8 leading-relaxed">
                    <EditableText
                        value={pub.intro}
                        onChange={(v) => updatePub('intro', v)}
                        multiline
                    />
                </p>

                {/* Note */}
                <div className="mb-12">
                    <strong className="block text-lg mb-2 text-gray-900">Note:</strong>
                    <div className="text-gray-700 leading-relaxed text-justify">
                        <EditableText
                            value={pub.note}
                            onChange={(v) => updatePub('note', v)}
                            multiline
                        />
                    </div>
                </div>

                {/* Proceedings Cards */}
                <div className="space-y-8">
                    {pub.proceedings.map((proc, idx) => (
                        <div key={idx} className="relative border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">

                            {/* Admin Action Buttons (top-right of card) */}
                            {isAdmin && editingIdx !== idx && (
                                <div className="absolute top-4 right-4 flex gap-2 z-10">
                                    <button
                                        onClick={() => setEditingIdx(idx)}
                                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow transition-colors"
                                        title="Edit this entry"
                                    >
                                        <Pencil size={13} /> Edit
                                    </button>
                                    <button
                                        onClick={() => deleteProceeding(idx)}
                                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow transition-colors"
                                        title="Delete this entry"
                                    >
                                        <Trash2 size={13} /> Delete
                                    </button>
                                </div>
                            )}

                            {/* Edit Form Mode */}
                            {isAdmin && editingIdx === idx ? (
                                <div className="p-6 sm:p-8">
                                    <ProceedingEditForm
                                        proceeding={proc}
                                        onSave={(updated) => saveProceeding(idx, updated)}
                                        onCancel={() => setEditingIdx(null)}
                                    />
                                </div>
                            ) : (
                                /* Normal View Mode */
                                <div className="p-6 sm:p-8">
                                    <h3 className="text-xl sm:text-2xl font-bold text-blue-500 mb-6 text-center sm:text-left pr-28 sm:pr-36">
                                        {proc.title}
                                    </h3>

                                    <div className="border-t border-gray-100 pt-6">
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

                                            {/* Description */}
                                            <div className="lg:col-span-2 space-y-4">
                                                <p className="text-gray-700 leading-relaxed">{proc.description}</p>
                                            </div>

                                            {/* Logo / Image */}
                                            <div className="lg:col-span-1 flex flex-col items-center justify-center gap-4">
                                                <div className="w-full max-w-xs h-32 relative">
                                                    <EditableImage
                                                        src={proc.image}
                                                        alt="Proceedings Logos"
                                                        onChange={(v) => {
                                                            const next = [...pub.proceedings];
                                                            next[idx] = { ...next[idx], image: v };
                                                            updatePub('proceedings', next);
                                                        }}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Link */}
                                        {proc.link && (
                                            <div className="mt-6 flex flex-col items-start gap-1">
                                                <a
                                                    href={proc.link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-700 font-semibold hover:underline flex items-center gap-2"
                                                >
                                                    {proc.link.text}
                                                </a>
                                                {isAdmin && (
                                                    <span className="text-[11px] text-gray-400">
                                                        URL: {proc.link.url}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Add New Proceedings Button — admin only */}
                {isAdmin && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={addProceeding}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all"
                        >
                            <Plus size={18} /> Add New Proceedings Entry
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};
