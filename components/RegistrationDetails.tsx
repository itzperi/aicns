import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { useAdmin } from '../contexts/AdminContext';
import { EditableText } from './ui/Editable';

export const RegistrationDetails: React.FC = () => {
    const { content, updateContent } = useContent();
    const { isAdmin } = useAdmin();
    const [activeTab, setActiveTab] = useState('refund');

    const tabs = [
        { id: 'refund', label: 'Refund & Cancellation' },
        { id: 'payment', label: 'Payment Policy' },
        { id: 'terms', label: 'Terms & Conditions' },
        { id: 'privacy', label: 'Privacy Policy' },
        { id: 'publication', label: 'Publication Policy' }
    ];

    const renderPolicyContent = () => {
        switch (activeTab) {
            case 'refund':
                return (
                    <div className="text-gray-700 leading-relaxed">
                        <EditableText
                            value={content.refundPolicy}
                            onChange={(v) => updateContent('refundPolicy', v)}
                            multiline
                        />
                    </div>
                );
            case 'payment':
                return (
                    <div className="text-gray-700 leading-relaxed">
                        <EditableText
                            value={content.paymentPolicy}
                            onChange={(v) => updateContent('paymentPolicy', v)}
                            multiline
                        />
                    </div>
                );
            case 'terms':
                return (
                    <div className="text-gray-700 leading-relaxed">
                        <EditableText
                            value={content.termsPolicy}
                            onChange={(v) => updateContent('termsPolicy', v)}
                            multiline
                        />
                    </div>
                );
            case 'privacy':
                return (
                    <div className="text-gray-700 leading-relaxed">
                        <EditableText
                            value={content.privacyPolicy}
                            onChange={(v) => updateContent('privacyPolicy', v)}
                            multiline
                        />
                    </div>
                );
            case 'publication':
                return (
                    <div className="text-gray-700 leading-relaxed">
                        <EditableText
                            value={content.publicationPolicy}
                            onChange={(v) => updateContent('publicationPolicy', v)}
                            multiline
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="mt-16">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex flex-wrap border-b border-gray-200 bg-gray-50">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-4 text-sm font-bold tracking-wide transition-colors ${activeTab === tab.id
                                ? 'bg-blue-900 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="p-8 min-h-[150px]">
                    {renderPolicyContent()}
                </div>
            </div>
        </div>
    );
};
