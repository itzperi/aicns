import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useContent } from '../contexts/ContentContext';
import { ArrowLeft, MapPin, Mail, Users, Quote } from 'lucide-react';
import { VisitorCounter } from '../components/VisitorCounter';
import { useAdmin } from '../contexts/AdminContext';
import { Component as ImageZoom } from '../components/ui/image-zoom';
import { EditableText } from '../components/ui/Editable';

const SpeakerProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { content, updateContent } = useContent();
    const navigate = useNavigate();
    const { isAdmin } = useAdmin(); // check if we need openLoginModal

    const speakerIndex = id ? parseInt(id, 10) : -1;
    const speaker = content.speakers.items[speakerIndex];

    const updateSpeaker = (field: string, value: string) => {
        const newItems = [...content.speakers.items];
        newItems[speakerIndex] = { ...newItems[speakerIndex], [field]: value };
        updateContent('speakers', { items: newItems });
    };

    if (!speaker) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Speaker Not Found</h2>
                        <button
                            onClick={() => navigate('/')}
                            className="text-blue-600 hover:text-blue-800 underline"
                        >
                            Return Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors group"
                    >
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Conference
                    </button>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                            {/* Left: Image with Zoom */}
                            <div className="h-auto relative bg-gray-900 flex flex-col justify-center">
                                {/* Using the requested ImageZoom component */}
                                <div className="p-4">
                                    <ImageZoom
                                        src={speaker.src}
                                        alt={speaker.name}
                                        title={speaker.name}
                                    />
                                </div>
                                {/* Mobile Title Overlay (only if not using the zoom component's internal overlay on mobile, but zoom component has one. Keeping backup just in case or removing if redundant. The zoom component has a title overlay.) */}
                            </div>

                            {/* Right: Content */}
                            <div className="col-span-2 p-8 md:p-12">
                                <div className="hidden md:block mb-8">
                                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                        <EditableText value={speaker.name} onChange={(v) => updateSpeaker('name', v)} />
                                    </h1>
                                    <p className="text-xl text-blue-600 font-medium">
                                        <EditableText value={speaker.designation} onChange={(v) => updateSpeaker('designation', v)} />
                                    </p>
                                </div>

                                <div className="prose prose-blue max-w-none">
                                    <div className="relative pl-8 border-l-4 border-blue-200 mb-8">
                                        <Quote className="absolute -top-3 -left-6 w-8 h-8 text-blue-100 -z-10 fill-blue-50" />
                                        <p className="text-xl text-gray-700 italic font-medium leading-relaxed">
                                            "<EditableText value={speaker.quote} onChange={(v) => updateSpeaker('quote', v)} multiLine />"
                                        </p>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm">About the Speaker</h3>
                                    <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                                        <EditableText
                                            value={speaker.bio || `Dr. ${speaker.name.split(' ').pop()} is a distinguished expert...`}
                                            onChange={(v) => updateSpeaker('bio', v)}
                                            multiline
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Reuse */}
            <footer id="contact" className="bg-blue-900 text-white pt-16 pb-8 border-t border-blue-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-2xl font-bold mb-4">{content.conference.name}</h3>
                            <p className="text-blue-200 text-sm leading-relaxed max-w-sm">
                                {content.conference.fullName}.
                            </p>
                            <div className="mt-6">
                                <VisitorCounter className="bg-blue-800/50" />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-blue-200">
                                <li><a href="/#home" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="/#cfp" className="hover:text-white transition-colors">Call for Papers</a></li>
                                <li><a href="/#registration" className="hover:text-white transition-colors">Registration</a></li>
                                <li><a href="/#contact" className="hover:text-white transition-colors">Contact Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm text-blue-200">
                                <li className="flex items-center gap-2"><MapPin size={16} /> {content.conference.venue.split(',')[1] || 'Tirunelveli'}, India</li>
                                <li className="flex items-center gap-2"><Mail size={16} /> {content.contact.email}</li>
                                <li className="flex items-center gap-2"><Users size={16} /> Organizing Team</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-300">
                        <p>&copy; 2026 {content.conference.name}. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SpeakerProfile;
