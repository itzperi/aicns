import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, LogIn, FileText, ChevronRight } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { useContent } from '../contexts/ContentContext';
import { EditableText } from './ui/Editable';
import { VisitorCounter } from './VisitorCounter';


const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { content, updateContent } = useContent();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const updateConference = (key: string, val: string) => {
        updateContent('conference', { ...content.conference, [key]: val });
    };

    const updateContact = (key: string, val: string) => {
        updateContent('contact', { ...content.contact, [key]: val });
    };

    // SDG Icons (Standard URLs)
    const sdgIcons = [
        "https://static.wixstatic.com/media/ac873e_1b59b927fa394ac29d8b6a051957f0e0~mv2.gif",
        "https://static.wixstatic.com/media/ac873e_fa50aafeb3e242048552974f54e9ab5e~mv2.gif",
        "https://static.wixstatic.com/media/ac873e_ad2026cbce0b4a3fafc7f4dbc5a5b270~mv2.gif",
        "https://static.wixstatic.com/media/ac873e_ee81a4c9fbdd4ae0853dd5fc149321b1~mv2.gif",
        "https://static.wixstatic.com/media/ac873e_7b410949c50b4d528f77ecb4c7be473d~mv2.gif",
        "https://static.wixstatic.com/media/ac873e_f1352c5db4834478add554e52456ff17~mv2.gif",
        "https://static.wixstatic.com/media/ac873e_d5899818279249c4bc19ce21f82adb25~mv2.gif"
    ];

    return (
        <>
            {/* Top Bar with Contact Info & Visitor Counter */}
            <div className="bg-slate-900 text-slate-300 py-2 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-[11px] sm:text-xs font-medium tracking-wide">
                    <div className="flex items-center space-x-6 mb-2 sm:mb-0">
                        <div className="flex items-center gap-2 hover:text-white transition-colors">
                            <Mail size={14} className="text-blue-400" />
                            <EditableText value={content.contact.email} onChange={(v) => updateContact('email', v)} />
                        </div>
                        <span className="hidden sm:flex items-center gap-2 text-slate-500">|</span>
                        <div className="flex items-center gap-2">
                            <Phone size={14} className="text-blue-400" />
                            <EditableText value={content.contact.phone} onChange={(v) => updateContact('phone', v)} />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <VisitorCounter />
                    </div>
                </div>
            </div>

            {/* Branding Header (Logos & Ribbon) - Not Sticky */}
            <div className="bg-white py-6 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:flex lg:flex-row justify-between items-center gap-6">

                        {/* AICNS Logo (Left) */}
                        <div className="flex-shrink-0 order-1 lg:order-none">
                            <img src="/images/om.png" alt="AICNS Logo" className="h-20 lg:h-24 w-auto object-contain" />
                        </div>

                        {/* SDG Ribbon (Center) */}
                        <div className="flex flex-col items-center gap-2 order-3 col-span-2 lg:order-none lg:w-auto">
                            <div className="flex gap-1 sm:gap-2">
                                {sdgIcons.map((url, i) => (
                                    <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shadow-sm hover:scale-110 transition-transform duration-200">
                                        <img src={url} alt={`SDG`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* College Logo (Right) */}
                        <div className="flex-shrink-0 order-2 lg:order-none justify-self-end lg:justify-self-auto">
                            <img src="/images/college_logo.png" alt="College Logo" className="h-20 lg:h-24 w-auto object-contain" />
                        </div>

                    </div>
                </div>
            </div>

            {/* Navigation Bar - Sticky */}
            <header
                className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${scrolled
                    ? 'bg-white/95 backdrop-blur-md border-gray-200 py-2 shadow-md'
                    : 'bg-white border-transparent py-4'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">

                        {/* Compact Logo Area (Visible only when sticky/scrolled or just simpler text) */}
                        <a href="#" className="flex items-center gap-2 group">
                            {/* Keep it simple for the sticky nav, maybe just text since main logos are huge above */}
                            <span className="font-bold text-xl text-slate-900 group-hover:text-blue-700 transition-colors">
                                AICNS 2026
                            </span>
                        </a>

                        {/* Desktop Navigation */}
                        <div className="hidden xl:flex items-center gap-1">
                            {NAV_ITEMS.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-all duration-200"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden xl:flex items-center pl-4">
                            <a
                                href="#registration"
                                className="group relative inline-flex items-center justify-center px-6 py-2 text-sm font-bold text-white transition-all duration-200 bg-gradient-to-r from-orange-500 to-red-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                            >
                                <span>Register Now</span>
                                <ChevronRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                            </a>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="xl:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none"
                            >
                                {isOpen ? <X size={26} /> : <Menu size={26} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`xl:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="px-4 py-4 space-y-2 shadow-inner bg-gray-50/50">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-blue-700 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;