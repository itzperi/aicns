import { SCIENTIFIC_COMMITTEE } from '../constants';
import {
    BrainCircuit,
    Network,
    ShieldCheck,
    Star
} from 'lucide-react';
import React from 'react';

const committeeIcons = [
    <BrainCircuit className="w-6 h-6" />,
    <Network className="w-6 h-6" />,
    <ShieldCheck className="w-6 h-6" />,
    <Star className="w-6 h-6" />,
];

const committeeImages = [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
];

export const getEnrichedCommitteeData = (committeeList: any[]) => {
    return committeeList.map((member, idx) => ({
        id: member.id || `temp-${idx}`, // Uses persistent ID from state
        title: member.name,
        description: member.affiliation,
        image: committeeImages[idx % 4],
        icon: committeeIcons[idx % committeeIcons.length],
        role: member.role || "Scientific Committee Member"
    }));
};
