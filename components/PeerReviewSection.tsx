import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { EditableText } from './ui/Editable';
import { SectionTitle } from '../pages/Home';
import { ClipboardCheck, FileSearch, Gavel } from 'lucide-react';

export const PeerReviewSection: React.FC = () => {
    const { content, updateContent } = useContent();
    const review = content.peerReview;

    const updateReview = (key: string, val: any) => {
        updateContent('peerReview', { ...review, [key]: val });
    };

    const updateStep = (index: number, val: string) => {
        const newSteps = [...review.steps];
        newSteps[index] = val;
        updateReview('steps', newSteps);
    };

    const icons = [
        <ClipboardCheck className="w-8 h-8 text-blue-500" />,
        <FileSearch className="w-8 h-8 text-purple-500" />,
        <Gavel className="w-8 h-8 text-indigo-500" />
    ];

    return (
        <section id="peer-review" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title={review.title}
                    align="center"
                    onTitleChange={(v) => updateReview('title', v)}
                    onSubtitleChange={() => { }}
                />

                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <p className="text-xl text-gray-700 leading-relaxed">
                        <EditableText
                            value={review.description}
                            onChange={(v) => updateReview('description', v)}
                            multiline
                        />
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-0"></div>

                    {review.steps.map((step, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center mb-6 group hover:scale-110 transition-transform duration-300">
                                {icons[idx] || <ClipboardCheck className="w-8 h-8 text-blue-500" />}
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full hover:shadow-md transition-shadow">
                                <p className="text-gray-600 leading-relaxed text-sm text-justify">
                                    <EditableText
                                        value={step}
                                        onChange={(v) => updateStep(idx, v)}
                                        multiline
                                    />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
