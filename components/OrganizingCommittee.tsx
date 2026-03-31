import React, { useState } from 'react';
import { ChevronRight, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { useAdmin } from '../contexts/AdminContext';
import { EditableText } from './ui/Editable';

const PersonCard: React.FC<{
    name: string;
    role?: string;
    affiliation?: string;
    department?: string;
    onUpdate: (field: string, val: string) => void;
    onRemove: () => void;
}> = ({ name, role, affiliation, department, onUpdate, onRemove }) => {
    const { isAdmin } = useAdmin();
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center flex flex-col items-center h-full relative group">
            <h4 className="font-bold text-gray-900 text-lg mb-1">
                <EditableText value={name} onChange={(v) => onUpdate('name', v)} />
            </h4>
            {role !== undefined && (
                <p className="text-blue-600 font-medium text-sm mb-1">
                    <EditableText value={role || ""} onChange={(v) => onUpdate('role', v)} />
                </p>
            )}
            {department !== undefined && (
                <p className="text-gray-500 text-xs mb-1">
                    <EditableText value={department || ""} onChange={(v) => onUpdate('department', v)} />
                </p>
            )}
            {affiliation !== undefined && (
                <p className="text-gray-500 text-xs italic">
                    <EditableText value={affiliation || ""} onChange={(v) => onUpdate('affiliation', v)} />
                </p>
            )}
            {isAdmin && (
                <button
                    onClick={onRemove}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                >
                    <Trash2 size={14} />
                </button>
            )}
        </div>
    );
};

const SimpleList: React.FC<{
    items: string[];
    onUpdate: (index: number, val: string) => void;
    onRemove: (index: number) => void;
    onAdd: () => void;
}> = ({ items, onUpdate, onRemove, onAdd }) => {
    const { isAdmin } = useAdmin();
    return (
        <div className="space-y-4">
            {isAdmin && (
                <div className="flex justify-end">
                    <button onClick={onAdd} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-blue-200 transition-colors">
                        <Plus size={14} /> Add Entry
                    </button>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {items.map((item, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg border border-gray-100 text-gray-700 shadow-sm flex items-start gap-2 group">
                        <ChevronRight size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-grow">
                            <EditableText value={item} onChange={(v) => onUpdate(idx, v)} />
                        </div>
                        {isAdmin && (
                            <button
                                onClick={() => onRemove(idx)}
                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const OrganizingCommitteeSection: React.FC = () => {
    const { content, updateContent } = useContent();
    const { isAdmin } = useAdmin();
    const [activeTab, setActiveTab] = useState('overview');
    const committee = content.committee.organizing;

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'chiefPatrons', label: 'Chief Patrons' },
        { id: 'patrons', label: 'Patrons' },
        { id: 'conferenceChairs', label: 'Conference Chairs' },
        { id: 'technicalChairs', label: 'Technical Chairs' },
        { id: 'conveners', label: 'Conveners' },
        { id: 'committeeMembers', label: 'Committee Members' },
        { id: 'publicationCoordinators', label: 'Publication Coordinators' },
        { id: 'publicationChairs', label: 'Publication Chairs' },
        { id: 'nationalAdvisoryCommittee', label: 'National Advisory Committee' },
        { id: 'internationalAdvisoryCommittee', label: 'International Advisory Committee' },
        { id: 'localArrangementChairs', label: 'Local Arrangement & Publicity Chairs' },
    ];

    const updateCategory = (key: string, val: any) => {
        updateContent('committee', {
            ...content.committee,
            organizing: { ...committee, [key]: val }
        });
    };

    const addPerson = (key: string) => {
        const current = (committee as any)[key] || [];
        const newPerson = { name: "New Member", role: "Role", affiliation: "Affiliation" };
        updateCategory(key, [...current, newPerson]);
    };

    const removePerson = (key: string, index: number) => {
        const current = (committee as any)[key] || [];
        updateCategory(key, current.filter((_: any, i: number) => i !== index));
    };

    const updatePerson = (key: string, index: number, field: string, val: string) => {
        const current = [...((committee as any)[key] || [])];
        if (current[index]) {
            current[index] = { ...current[index], [field]: val };
            updateCategory(key, current);
        }
    };

    const addStringItem = (key: string) => {
        const current = (committee as any)[key] || [];
        updateCategory(key, [...current, "New Entry"]);
    };

    const removeStringItem = (key: string, index: number) => {
        const current = (committee as any)[key] || [];
        updateCategory(key, current.filter((_: any, i: number) => i !== index));
    };

    const updateStringItem = (key: string, index: number, val: string) => {
        const current = [...((committee as any)[key] || [])];
        current[index] = val;
        updateCategory(key, current);
    };

    const renderPersonGrid = (key: string) => {
        const items = (committee as any)[key] || [];
        return (
            <div className="space-y-6">
                {isAdmin && (
                    <div className="flex justify-end">
                        <button onClick={() => addPerson(key)} className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-colors">
                            <Plus size={16} /> Add Member
                        </button>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((p: any, i: number) => (
                        <PersonCard
                            key={i}
                            {...p}
                            onUpdate={(f, v) => updatePerson(key, i, f, v)}
                            onRemove={() => removePerson(key, i)}
                        />
                    ))}
                </div>
            </div>
        );
    };

    const renderSimpleList = (key: string) => {
        const items = (committee as any)[key] || [];
        return (
            <SimpleList
                items={items}
                onUpdate={(idx, v) => updateStringItem(key, idx, v)}
                onRemove={(idx) => removeStringItem(key, idx)}
                onAdd={() => addStringItem(key)}
            />
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h4 className="text-xl font-bold text-gray-900 mb-6 font-primary text-center">
                            Department Overview
                        </h4>
                        <ul className="space-y-4 text-gray-700 max-w-2xl mx-auto">
                            <li className="flex items-start gap-4 p-4 rounded-lg bg-blue-50/50 border border-blue-100">
                                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-sm">
                                    <ChevronRight size={14} />
                                </span>
                                <div>
                                    <strong className="text-gray-900 block mb-1">College Name:</strong>
                                    <EditableText
                                        value={committee.collegeName || "Francis Xavier Engineering College, Tirunelveli"}
                                        onChange={(v) => updateCategory('collegeName', v)}
                                        className="text-gray-700"
                                    />
                                </div>
                            </li>
                            <li className="flex items-start gap-4 p-4 rounded-lg bg-blue-50/50 border border-blue-100">
                                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-sm">
                                    <ChevronRight size={14} />
                                </span>
                                <div>
                                    <strong className="text-gray-900 block mb-1">Organizing Department:</strong>
                                    <EditableText
                                        value={committee.organizingDepartment || "Electronics and Communication Engineering"}
                                        onChange={(v) => updateCategory('organizingDepartment', v)}
                                        className="text-gray-700"
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                );
            case 'chiefPatrons': return renderPersonGrid('chiefPatrons');
            case 'patrons': return renderPersonGrid('patrons');
            case 'conferenceChairs': return renderPersonGrid('conferenceChairs');
            case 'technicalChairs': return renderPersonGrid('technicalChairs');
            case 'conveners': return renderPersonGrid('conveners');
            case 'committeeMembers': return renderSimpleList('committeeMembers');
            case 'publicationCoordinators': return renderPersonGrid('publicationCoordinators');
            case 'publicationChairs': return renderPersonGrid('publicationChairs');
            case 'nationalAdvisoryCommittee': return renderSimpleList('nationalAdvisoryCommittee');
            case 'internationalAdvisoryCommittee': return renderSimpleList('internationalAdvisoryCommittee');
            case 'localArrangementChairs': return renderPersonGrid('localArrangementChairs');
            default: return null;
        }
    };

    return (
        <section id="organizing-committee" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Organizing Committee</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
                </div>

                {/* Mobile View: Accordion Style */}
                <div className="lg:hidden space-y-3">
                    {tabs.map((tab) => (
                        <div key={tab.id} className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                            <button
                                onClick={() => setActiveTab(activeTab === tab.id ? '' : tab.id)}
                                className={`w-full text-left px-5 py-4 font-semibold text-sm flex justify-between items-center transition-colors ${activeTab === tab.id
                                    ? 'bg-blue-900 text-white'
                                    : 'bg-white text-gray-800 hover:bg-gray-50'
                                    }`}
                            >
                                <span>{tab.label}</span>
                                <ChevronRight
                                    size={18}
                                    className={`transition-transform duration-300 ${activeTab === tab.id ? 'rotate-90' : ''}`}
                                />
                            </button>
                            {activeTab === tab.id && (
                                <div className="p-5 bg-gray-50 border-t border-gray-100">
                                    {renderContent()}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Desktop View: Sidebar + Content Panel */}
                <div className="hidden lg:flex gap-8">
                    <div className="w-1/4 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full text-left px-6 py-4 text-sm font-medium transition-all duration-200 border-b border-gray-50 last:border-0 hover:bg-gray-50 flex justify-between items-center ${activeTab === tab.id
                                        ? 'bg-blue-900 text-white hover:bg-blue-800'
                                        : 'text-gray-600'
                                        }`}
                                >
                                    <span>{tab.label}</span>
                                    {activeTab === tab.id && <ChevronRight size={16} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-3/4">
                        <div className="bg-gray-50 p-6 rounded-2xl min-h-[400px] shadow-inner">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
