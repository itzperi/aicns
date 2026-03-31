import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useContent } from '../contexts/ContentContext';
import { getEnrichedCommitteeData } from '../lib/committeeUtils';
import { ArrowLeft, Mail, MapPin, Globe, Users } from 'lucide-react';
import { VisitorCounter } from '../components/VisitorCounter';
import { useAdmin } from '../contexts/AdminContext';

const MemberProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { content } = useContent();
    const { openLoginModal } = useAdmin();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const enrichedList = getEnrichedCommitteeData(content.committee.scientific);
    const member = enrichedList.find(m => m.id.toString() === id);

    if (!member) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Member Not Found</h2>
                        <Link to="/" className="text-blue-600 hover:underline mt-4 block">Return Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />

            {/* Header/Banner */}
            <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-90"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link to="/#committee" className="inline-flex items-center text-blue-300 hover:text-white mb-8 transition-colors">
                        <ArrowLeft size={20} className="mr-2" /> Back to Committee
                    </Link>
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl flex-shrink-0">
                            <img src={member.image} alt={member.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{member.title}</h1>
                            <p className="text-xl text-blue-200 font-medium mb-4">{member.role}</p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-300">
                                <span className="flex items-center gap-1"><MapPin size={16} /> {member.description}</span>
                                <span className="flex items-center gap-1"><Mail size={16} /> contact@conference.org</span>
                                <span className="flex items-center gap-1"><Globe size={16} /> www.profile.edu</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow bg-gray-50 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">About</h3>
                        <div className="prose max-w-none text-gray-600 leading-relaxed">
                            <p className="mb-4">
                                This is a placeholder biography for <strong>{member.title}</strong>. As a distinguished member of the Scientific Committee, they bring extensive expertise and vision to the conference.
                            </p>
                            <p className="mb-4">
                                Their research interests include Artificial Intelligence, Machine Learning, and Network Security. They have published numerous papers in top-tier journals and conferences.
                            </p>
                            <p>
                                (Note: This page is dynamically generated based on the member ID. In a real application, you would fetch the full biography from the database here.)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer id="contact" className="bg-blue-900 text-white pt-16 pb-8 border-t border-blue-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <h3
                                className="text-2xl font-bold mb-4 cursor-pointer hover:text-blue-200 transition-colors"
                                onClick={openLoginModal}
                                title="Admin Login"
                            >
                                {content.conference.name}
                            </h3>
                            <p className="text-blue-200 text-sm leading-relaxed max-w-sm">
                                {content.conference.fullName}.
                                Bringing together researchers and practitioners from academia and industry.
                            </p>
                            <div className="mt-6">
                                <VisitorCounter className="bg-blue-800/50" />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-blue-200">
                                <li><Link to="/#home" className="hover:text-white transition-colors">Home</Link></li>
                                <li><Link to="/#cfp" className="hover:text-white transition-colors">Call for Papers</Link></li>
                                <li><Link to="/#registration" className="hover:text-white transition-colors">Registration</Link></li>
                                <li><Link to="/#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
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
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white">Privacy Policy</a>
                            <a href="#" className="hover:text-white">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MemberProfile;
