import React, { useState } from 'react';
import { User, Building2, GraduationCap, Trash2, Pencil, Check, X } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

interface ScientificCommitteeMember {
    id: string;
    title: string;
    description: string;
    role: string;
    image?: string;
}

interface ScientificCommitteeListProps {
    members: ScientificCommitteeMember[];
    onUpdate: (id: string, field: keyof ScientificCommitteeMember, value: string) => void;
    onRemove: (id: string) => void;
}

interface EditState {
    title: string;
    role: string;
    description: string;
}

const MemberCard: React.FC<{
    member: ScientificCommitteeMember;
    onUpdate: (id: string, field: keyof ScientificCommitteeMember, value: string) => void;
    onRemove: (id: string) => void;
    isAdmin: boolean;
}> = ({ member, onUpdate, onRemove, isAdmin }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editState, setEditState] = useState<EditState>({
        title: member.title,
        role: member.role,
        description: member.description,
    });

    const handleSave = () => {
        if (editState.title !== member.title) onUpdate(member.id, 'title', editState.title);
        if (editState.role !== member.role) onUpdate(member.id, 'role', editState.role);
        if (editState.description !== member.description) onUpdate(member.id, 'description', editState.description);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditState({ title: member.title, role: member.role, description: member.description });
        setIsEditing(false);
    };

    return (
        <div className="bg-[#111827] p-6 rounded-xl border border-gray-800 flex items-start gap-6 hover:border-gray-700 transition-colors">
            <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-blue-900/30 flex items-center justify-center border border-blue-500/20 text-blue-400">
                    <User size={32} />
                </div>
            </div>

            <div className="flex-grow min-w-0">
                {isEditing ? (
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Name</label>
                            <input
                                type="text"
                                value={editState.title}
                                onChange={(e) => setEditState(s => ({ ...s, title: e.target.value }))}
                                className="w-full bg-gray-800 border border-blue-500/50 rounded px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Role / Designation</label>
                            <input
                                type="text"
                                value={editState.role}
                                onChange={(e) => setEditState(s => ({ ...s, role: e.target.value }))}
                                className="w-full bg-gray-800 border border-blue-500/50 rounded px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Affiliation</label>
                            <input
                                type="text"
                                value={editState.description}
                                onChange={(e) => setEditState(s => ({ ...s, description: e.target.value }))}
                                className="w-full bg-gray-800 border border-blue-500/50 rounded px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex gap-2 pt-1">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-colors"
                            >
                                <Check size={14} /> Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold transition-colors"
                            >
                                <X size={14} /> Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="text-xl font-bold text-white mb-2">{member.title}</h3>
                        <div className="space-y-1">
                            {member.role && (
                                <p className="text-blue-400 font-medium text-sm flex items-center gap-2">
                                    <GraduationCap size={16} />
                                    {member.role}
                                </p>
                            )}
                            {member.description && (
                                <p className="text-gray-400 text-sm flex items-center gap-2">
                                    <Building2 size={16} />
                                    {member.description}
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>

            {isAdmin && !isEditing && (
                <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-400 hover:text-blue-300 p-2 rounded-full hover:bg-blue-500/10 transition-colors"
                        title="Edit Member"
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        onClick={() => onRemove(member.id)}
                        className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10 transition-colors"
                        title="Remove Member"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};

export const ScientificCommitteeList: React.FC<ScientificCommitteeListProps> = ({ members, onUpdate, onRemove }) => {
    const { isAdmin } = useAdmin();

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {members.map((member) => (
                <MemberCard
                    key={member.id}
                    member={member}
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                    isAdmin={isAdmin}
                />
            ))}
        </div>
    );
};
