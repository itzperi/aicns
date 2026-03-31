import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import {
    CheckCircle2,
    FileText,
    Download,
    Users,
    Award,
    MapPin,
    Mail,
    BookOpen,
    Calendar,
    Globe,
    BrainCircuit,
    ShieldCheck,
    Network,
    Star,
    Plus,
    Trash2
} from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { AnimatedTestimonials } from '../components/ui/animated-testimonials';

import { ScientificCommitteeList } from '../components/ScientificCommitteeList';
import { useContent } from '../contexts/ContentContext';
import { useAdmin } from '../contexts/AdminContext';
import { EditableText, EditableImage } from '../components/ui/Editable';
import { LoginModal } from '../components/admin/LoginModal';
import { AdminControls } from '../components/admin/AdminControls';
import { OrganizingCommitteeSection } from '../components/OrganizingCommittee';
import { VisitorCounter } from '../components/VisitorCounter';
import { RegistrationDetails } from '../components/RegistrationDetails';
import { RegistrationFees } from '../components/RegistrationFees';
import { SubmissionGuidance } from '../components/SubmissionGuidance';
import { PublicationSection } from '../components/PublicationSection';
import { ProgramSchedule } from '../components/ProgramSchedule';
import { GlimpseSection } from '../components/GlimpseSection';
import { PeerReviewSection } from '../components/PeerReviewSection';
import { DraggableNote } from '../components/ui/DraggableNote';
import { getEnrichedCommitteeData } from '../lib/committeeUtils';



import { useLocation, useNavigate } from 'react-router-dom';

export const SectionTitle: React.FC<{
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    onTitleChange: (v: string) => void;
    onSubtitleChange: (v: string) => void;
    titleClassName?: string;
}> = ({ title, subtitle, align = 'center', onTitleChange, onSubtitleChange, titleClassName = "text-gray-900" }) => (
    <div className={`mb-16 flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
        {/* Swapped order: Heading first, then Underline/Subtitle styled decor */}
        <div className="relative">
            <h2 className={`text-3xl md:text-4xl font-bold leading-tight pb-6 ${titleClassName}`}>
                <EditableText value={title} onChange={onTitleChange} />
            </h2>
            <div className={`absolute bottom-0 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full ${align === 'center' ? 'left-1/2 -translate-x-1/2 w-24' : 'left-0 w-24'}`}></div>
        </div>
        {subtitle && (
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm mt-4 block">
                <EditableText value={subtitle} onChange={onSubtitleChange} />
            </span>
        )}
    </div>
);

const Home: React.FC = () => {
    const { content, updateContent } = useContent();
    const { openLoginModal, isAdmin } = useAdmin();
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const dateIcons = [
        <BookOpen className="w-5 h-5 text-blue-600" />,
        <Users className="w-5 h-5 text-blue-600" />,
        <Calendar className="w-5 h-5 text-blue-600" />,
        <Award className="w-5 h-5 text-blue-600" />,
        <Globe className="w-5 h-5 text-blue-600" />
    ];

    const scientificCommitteeData = getEnrichedCommitteeData(content.committee.scientific);

    const updateAbout = (key: string, val: any) => updateContent('about', { ...content.about, [key]: val });
    const updateDates = (key: string, val: any) => updateContent('dates', { ...content.dates, [key]: val });
    const updateTracks = (key: string, val: any) => updateContent('tracks', { ...content.tracks, [key]: val });
    const updateSpeakers = (key: string, val: any) => updateContent('speakers', { ...content.speakers, [key]: val });
    const updateCommittee = (key: string, val: any) => updateContent('committee', { ...content.committee, [key]: val });
    const updateFees = (key: string, val: any) => updateContent('fees', { ...content.fees, [key]: val });
    const updateContact = (key: string, val: any) => updateContent('contact', { ...content.contact, [key]: val });

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <LoginModal />
            <AdminControls />

            {/* Draggable Notes (Floating Text) */}
            {content.floatingNotes.map((note) => (
                <DraggableNote key={note.id} {...note} />
            ))}

            {isAdmin && (
                <button
                    onClick={() => {
                        const newNote = {
                            id: Math.random().toString(36).substr(2, 9),
                            content: "New Announcement - Drag me anywhere!",
                            x: 100,
                            y: 100,
                            show: true
                        };
                        updateContent('floatingNotes', [...content.floatingNotes, newNote]);
                    }}
                    className="fixed bottom-24 right-8 z-[100] bg-yellow-500 text-white p-3 rounded-full shadow-2xl hover:bg-yellow-600 transition-all flex items-center gap-2 font-bold group"
                    title="Add Floating Text"
                >
                    <Plus size={20} />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300">Add Floating Text</span>
                </button>
            )}

            {/* About Section */}
            <section id="home" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <SectionTitle
                                title={content.about.title}
                                subtitle={content.about.subtitle}
                                align="left"
                                onTitleChange={(v) => updateAbout('title', v)}
                                onSubtitleChange={(v) => updateAbout('subtitle', v)}
                            />
                            {isAdmin && (
                                <div className="mb-4">
                                    <button
                                        onClick={() => {
                                            const newParas = [...content.about.paragraphs, "New paragraph text..."];
                                            updateAbout('paragraphs', newParas);
                                        }}
                                        className="text-xs bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1.5 rounded-full font-bold flex items-center gap-1 transition-colors"
                                    >
                                        <Plus size={14} /> Add Paragraph
                                    </button>
                                </div>
                            )}
                            <div className="space-y-6 text-gray-600 leading-relaxed text-justify">
                                {content.about.paragraphs.map((para, idx) => (
                                    <div key={idx} className="relative group">
                                        <p>
                                            <EditableText
                                                value={para}
                                                onChange={(v) => {
                                                    const newParas = [...content.about.paragraphs];
                                                    newParas[idx] = v;
                                                    updateAbout('paragraphs', newParas);
                                                }}
                                                multiline
                                            />
                                        </p>
                                        {isAdmin && (
                                            <button
                                                onClick={() => {
                                                    const newParas = content.about.paragraphs.filter((_, i) => i !== idx);
                                                    updateAbout('paragraphs', newParas);
                                                }}
                                                className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 p-1 bg-red-50 rounded-md transition-opacity"
                                                title="Delete Paragraph"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {content.about.images.map((img, idx) => (
                                <EditableImage
                                    key={idx}
                                    src={img}
                                    alt={`Conference ${idx + 1}`}
                                    className={`rounded-lg shadow-xl w-full h-48 object-cover transform duration-300 ${idx % 2 !== 0 ? 'translate-y-8 hover:translate-y-6' : 'hover:-translate-y-2'}`}
                                    onChange={(newSrc) => {
                                        const newImgs = [...content.about.images];
                                        newImgs[idx] = newSrc;
                                        updateAbout('images', newImgs);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Important Dates */}
            <section id="dates" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle
                        title={content.dates.title}
                        subtitle={content.dates.subtitle}
                        onTitleChange={(v) => updateDates('title', v)}
                        onSubtitleChange={(v) => updateDates('subtitle', v)}
                    />
                    {isAdmin && (
                        <div className="flex justify-center mb-8">
                            <button
                                onClick={() => {
                                    const newItem = { id: Math.random().toString(36).substring(2, 9), label: "New Date", date: "TBD" };
                                    updateDates('items', [...content.dates.items, newItem]);
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-md transition-colors"
                            >
                                <Plus size={16} /> Add Important Date
                            </button>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {content.dates.items.map((item, idx) => (
                            <div key={item.id || idx} className="relative bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-600 hover:shadow-xl transition-shadow flex flex-col items-center text-center group">
                                {isAdmin && (
                                    <button
                                        onClick={() => {
                                            const newDates = content.dates.items.filter(d => d.id !== item.id);
                                            updateDates('items', newDates);
                                        }}
                                        className="absolute top-3 right-3 text-red-400 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-50 rounded-md"
                                        title="Delete Date"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                                <div className="p-3 bg-blue-50 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
                                    {dateIcons[idx] || <Calendar className="w-5 h-5 text-blue-600" />}
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">
                                    <EditableText
                                        value={item.label}
                                        onChange={(v) => {
                                            const newDates = [...content.dates.items];
                                            newDates[idx].label = v;
                                            updateDates('items', newDates);
                                        }}
                                    />
                                </h3>
                                <p className="text-blue-700 font-bold text-lg">
                                    <EditableText
                                        value={item.date}
                                        onChange={(v) => {
                                            const newDates = [...content.dates.items];
                                            newDates[idx].date = v;
                                            updateDates('items', newDates);
                                        }}
                                    />
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call for Papers / Tracks */}
            <section id="cfp" className="py-20 bg-white scroll-mt-16">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle
                        title={content.tracks.title}
                        subtitle={content.tracks.subtitle}
                        align="center"
                        onTitleChange={(v) => updateTracks('title', v)}
                        onSubtitleChange={(v) => updateTracks('subtitle', v)}
                    />
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <p className="text-gray-600 leading-relaxed text-lg">
                            <EditableText value={content.tracks.description} onChange={(v) => updateTracks('description', v)} multiline />
                        </p>
                    </div>

                    {isAdmin && (
                        <div className="flex justify-center mb-8">
                            <button
                                onClick={() => {
                                    const newTrack = { id: Math.random().toString(36).substring(2, 9), title: "New Conference Track", topics: ["New Topic 1"] };
                                    updateTracks('items', [...content.tracks.items, newTrack]);
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-md transition-colors"
                            >
                                <Plus size={16} /> Add Conference Track
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {content.tracks.items.map((track, trackIdx) => (
                            <div key={track.id} className="relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
                                {isAdmin && (
                                    <button
                                        onClick={() => {
                                            const newTracks = content.tracks.items.filter(t => t.id !== track.id);
                                            updateTracks('items', newTracks);
                                        }}
                                        className="absolute top-2 right-2 z-20 bg-white/90 backdrop-blur rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Delete Track"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                                {/* Track Image */}
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={track.image || `/images/track${trackIdx + 1}.png`}
                                        alt={`Track ${track.id}`}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            // Fallback if the specific track image fails
                                            const target = e.target as HTMLImageElement;
                                            if (!target.src.includes('picsum')) {
                                                target.src = `https://picsum.photos/seed/track${trackIdx}/800/400`;
                                            }
                                        }}
                                    />
                                </div>
                                <div className="bg-gray-900 p-3 relative z-10 -mt-2 mx-4 rounded-lg shadow-lg">
                                    <h3 className="text-white font-bold text-base text-center">Track {track.id}</h3>
                                </div>
                                <div className="p-5 pt-6 flex-grow flex flex-col">
                                    <h4 className="font-bold text-blue-900 mb-3 min-h-10 flex items-center justify-center text-center text-sm leading-tight">
                                        <EditableText
                                            value={track.title}
                                            onChange={(v) => {
                                                const newTracks = [...content.tracks.items];
                                                newTracks[trackIdx].title = v;
                                                updateTracks('items', newTracks);
                                            }}
                                            multiline
                                        />
                                    </h4>
                                    <ul className="space-y-2 flex-grow">
                                        {(isAdmin ? track.topics : track.topics.slice(0, 4)).map((topic, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-gray-600 group/topic relative pr-6">
                                                <CheckCircle2 size={14} className="text-orange-500 mt-0.5 flex-shrink-0" />
                                                <EditableText
                                                    value={topic}
                                                    onChange={(v) => {
                                                        const newTracks = [...content.tracks.items];
                                                        newTracks[trackIdx].topics[i] = v;
                                                        updateTracks('items', newTracks);
                                                    }}
                                                    multiline
                                                />
                                                {isAdmin && (
                                                    <button
                                                        onClick={() => {
                                                            const newTracks = [...content.tracks.items];
                                                            newTracks[trackIdx].topics = newTracks[trackIdx].topics.filter((_, idx) => idx !== i);
                                                            updateTracks('items', newTracks);
                                                        }}
                                                        className="absolute right-0 top-0 text-red-400 hover:text-red-600 opacity-0 group-hover/topic:opacity-100 transition-opacity"
                                                        title="Remove Topic"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                    {isAdmin && (
                                        <button
                                            onClick={() => {
                                                const newTracks = [...content.tracks.items];
                                                newTracks[trackIdx].topics = [...newTracks[trackIdx].topics, "New Topic"];
                                                updateTracks('items', newTracks);
                                            }}
                                            className="mt-4 w-full py-1.5 border border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 text-xs font-bold uppercase rounded-lg flex justify-center items-center gap-1 transition-colors"
                                        >
                                            <Plus size={12} /> Add Topic
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Peer Review Process Section */}
            <PeerReviewSection />

            {/* Keynote Speakers Section (Moved Separate) */}

            <section id="speakers" className="py-20 bg-blue-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle
                        title={content.speakers.title}
                        subtitle={content.speakers.subtitle}
                        align="center"
                        onTitleChange={(v) => updateSpeakers('title', v)}
                        onSubtitleChange={(v) => updateSpeakers('subtitle', v)}
                    />
                    {isAdmin && (
                        <div className="flex justify-center mb-12">
                            <button
                                onClick={() => {
                                    const newSpeaker = {
                                        name: "New Speaker",
                                        designation: "Professor/Expert",
                                        quote: "Excited to share insights at AICNS 2026!",
                                        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                                    };
                                    updateSpeakers('items', [...content.speakers.items, newSpeaker]);
                                }}
                                className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus size={18} /> Add Keynote Speaker
                            </button>
                        </div>
                    )}
                    <div className="mt-8">
                        <AnimatedTestimonials
                            testimonials={content.speakers.items}
                            autoplay={!isAdmin}
                            className="py-0 px-0 md:px-0 lg:px-0 max-w-full"
                            onMemberClick={(index) => {
                                navigate(`/speaker/${index}`);
                            }}
                            onUpdate={(index, field, value) => {
                                const newSpeakers = [...content.speakers.items];
                                if (newSpeakers[index]) {
                                    newSpeakers[index] = { ...newSpeakers[index], [field]: value };
                                    updateSpeakers('items', newSpeakers);
                                }
                            }}
                            onRemove={isAdmin ? (index) => {
                                const newSpeakers = content.speakers.items.filter((_, i) => i !== index);
                                updateSpeakers('items', newSpeakers);
                            } : undefined}
                        />
                    </div>
                </div>
            </section>

            {/* Scientific Committee (Kept separate as per request) */}
            <section id="committee" className="py-20 bg-slate-900 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Swapped order happens in the SectionTitle component, but here we just pass the title */}
                    {/* Custom Header for Scientific Committee as per specific design request: Centered, Full width underline matching text */}
                    <div className="text-center mb-12 flex flex-col items-center relative">
                        <div className="inline-block relative">
                            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight pb-2">
                                Scientific Committee
                            </h2>
                            <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-1"></div>
                        </div>
                        {isAdmin && (
                            <button
                                onClick={() => {
                                    const newMember = { id: Math.random().toString(36).substring(2, 9), name: "New Member", affiliation: "University Name", role: "Professor" };
                                    updateCommittee('scientific', [...content.committee.scientific, newMember]);
                                }}
                                className="absolute right-0 top-0 bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus size={16} /> Add Member
                            </button>
                        )}
                    </div>

                    <div className="mb-8">
                        {/* No redundant H3 here, SectionTitle handles it */}
                        <div className="w-full">
                            <ScientificCommitteeList
                                members={scientificCommitteeData}
                                onUpdate={(id, field, value) => {
                                    const newMembers = [...content.committee.scientific];
                                    const index = newMembers.findIndex(m => m.id === id);
                                    if (index !== -1) {
                                        if (field === 'title') newMembers[index].name = value;
                                        if (field === 'description') newMembers[index].affiliation = value;
                                        if (field === 'role') newMembers[index].role = value;
                                        updateCommittee('scientific', newMembers);
                                    }
                                }}
                                onRemove={(id) => {
                                    const newMembers = content.committee.scientific.filter(m => m.id !== id);
                                    updateCommittee('scientific', newMembers);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Moved Organizing Committee Section Here - "Display Organizing Committee immediately after the Scientific Committee" */}
            <OrganizingCommitteeSection />


            {/* Submission Guidance Section */}
            <SubmissionGuidance />

            {/* Publication Section */}
            <PublicationSection />

            {/* Program Schedule Section */}
            <ProgramSchedule />




            {/* Registration Section */}
            <section id="registration" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RegistrationFees />
                    <RegistrationDetails />
                </div>
            </section>

            {/* Glimpse of Event Last Year - "After Registration frees" (placed after the whole registration block) */}
            <GlimpseSection />




            {/* Removed redundant Organizing Committee Section call from here as it moved up */}


            {/* Map / Location */}
            <section className="h-[450px] w-full bg-gray-200 relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.864402621943!2d77.74797597589254!3d8.704257193952406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b041269382216d7%3A0xc6c4495574542d2a!2sFrancis%20Xavier%20Engineering%20College!5e0!3m2!1sen!2sin!4v1730897800000!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Francis Xavier Engineering College Location"
                ></iframe>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-blue-900 text-white pt-16 pb-8 border-t border-blue-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            {/* Footer Logo -> Admin Access */}
                            <div
                                className="mb-6 inline-block cursor-pointer relative group"
                                onClick={openLoginModal}
                                title="Admin Login"
                            >
                                <img
                                    src="/images/om.png"
                                    alt="AICNS Logo"
                                    className="h-16 md:h-20 w-auto object-contain bg-white/10 p-2 rounded-xl border border-white/5 hover:bg-white/20 hover:border-white/20 transition-all shadow-sm"
                                    style={{ filter: "brightness(200%) grayscale(20%)" }} // Makes it pop slightly more against dark bg
                                />
                                <div className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-1.5 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-lg border border-white/20">
                                    <span className="text-[10px] leading-none block">🔒</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">
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
                                {NAV_ITEMS.map((item) => (
                                    <li key={item.label}>
                                        <a href={item.href} className="hover:text-white transition-colors">
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-lg mb-4">Contact</h4>
                            <ul className="space-y-3 text-sm text-blue-200">
                                <li className="flex items-start gap-2">
                                    <MapPin size={16} className="mt-1" />
                                    <EditableText
                                        value={content.conference.venue}
                                        onChange={(v) => updateContent('conference', { ...content.conference, venue: v })}
                                    />
                                </li>
                                <li className="flex items-start gap-2">
                                    <Mail size={16} className="mt-1" />
                                    <div className="flex flex-col gap-1">
                                        <EditableText
                                            value={content.contact.email}
                                            onChange={(v) => updateContact('email', v)}
                                        />
                                        {content.contact.secondaryEmails.map((email, idx) => (
                                            <div key={idx} className="flex items-center gap-2 group/email">
                                                <EditableText
                                                    value={email}
                                                    onChange={(v) => {
                                                        const newEmails = [...content.contact.secondaryEmails];
                                                        newEmails[idx] = v;
                                                        updateContact('secondaryEmails', newEmails);
                                                    }}
                                                />
                                                {isAdmin && (
                                                    <button
                                                        onClick={() => {
                                                            const newEmails = content.contact.secondaryEmails.filter((_, i) => i !== idx);
                                                            updateContact('secondaryEmails', newEmails);
                                                        }}
                                                        className="opacity-0 group-hover/email:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        {isAdmin && (
                                            <button
                                                onClick={() => updateContact('secondaryEmails', [...content.contact.secondaryEmails, 'new-email@example.com'])}
                                                className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mt-1 hover:text-blue-300 flex items-center gap-1"
                                            >
                                                <Plus size={10} /> Add Email
                                            </button>
                                        )}
                                    </div>
                                </li>
                                <li className="flex items-center gap-2 text-blue-300 italic">
                                    <Users size={16} /> AICNS Organizing Team
                                </li>
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

export default Home;
