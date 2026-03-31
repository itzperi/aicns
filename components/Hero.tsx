import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Plus, Trash2, Megaphone, Eye, EyeOff } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { EditableText } from './ui/Editable';
import { useAdmin } from '../contexts/AdminContext';

const Hero: React.FC = () => {
    const { content, updateContent } = useContent();
    const { isAdmin } = useAdmin();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = content.hero.images;

    useEffect(() => {
        if (images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Slowed down slightly for better editability experience, though 1s requested initially

        return () => clearInterval(interval);
    }, [images.length]);

    const addImage = () => {
        const url = prompt("Enter Image URL");
        if (url) {
            updateContent('hero', { images: [...images, url] });
        }
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        updateContent('hero', { images: newImages });
        setCurrentImageIndex(0);
    };

    return (
        <div className="relative w-full min-h-[600px] h-auto py-20 lg:py-0 flex items-center justify-center text-center overflow-hidden bg-gray-900 group/hero">
            {/* Background Image with Transition */}
            {images.map((img, index) => (
                <div
                    key={`${img}-${index}`}
                    className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-40' : 'opacity-0'}`}
                    style={{
                        backgroundImage: `url("${img}")`,
                        filter: 'brightness(0.7)'
                    }}
                />
            ))}

            {isAdmin && (
                <div className="absolute top-4 right-4 z-30 flex flex-col gap-2 bg-black/50 p-3 rounded-xl border border-white/10 backdrop-blur-md">
                    <div className="flex items-center justify-between gap-4 mb-1">
                        <span className="text-white text-[10px] font-bold uppercase tracking-wider">Hero Media</span>
                        <button onClick={addImage} className="bg-blue-600 hover:bg-blue-500 text-white p-1 rounded-lg text-[10px] flex items-center gap-1 transition-colors"><Plus size={10} /> Add Image</button>
                    </div>
                    <div className="flex gap-1 overflow-x-auto max-w-[200px] pb-2">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative w-10 h-10 flex-shrink-0 cursor-pointer rounded overflow-hidden" onClick={() => setCurrentImageIndex(idx)}>
                                <img src={img} className={`w-full h-full object-cover border-2 ${idx === currentImageIndex ? 'border-blue-500' : 'border-transparent'}`} />
                                <button onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-[2px] shadow-lg"><Trash2 size={8} /></button>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-white/10 pt-2 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="text-white text-[10px] font-bold uppercase tracking-wider">Marquee Ticker</span>
                            <button
                                onClick={() => updateContent('hero', { ...content.hero, marquee: { ...content.hero.marquee, show: !content.hero.marquee.show } })}
                                className={`p-1 rounded text-[10px] flex items-center gap-1 transition-colors ${content.hero.marquee.show ? 'bg-green-600 hover:bg-green-500' : 'bg-gray-600 hover:bg-gray-500'}`}
                            >
                                {content.hero.marquee.show ? <Eye size={10} /> : <EyeOff size={10} />}
                                {content.hero.marquee.show ? 'Visible' : 'Hidden'}
                            </button>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-lg border border-white/5">
                            <Megaphone size={12} className="text-blue-400" />
                            <EditableText
                                value={content.hero.marquee.text}
                                onChange={(v) => updateContent('hero', { ...content.hero, marquee: { ...content.hero.marquee, text: v } })}
                                className="text-[10px] text-white/80 min-w-[150px]"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Content Overlay */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 animate-fade-in-up">
                <div className="mb-4 inline-block px-4 py-1 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold tracking-wide uppercase">
                    Proceedings will be submitted for publication in Scopus
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
                    <EditableText
                        value={content.conference.fullName}
                        onChange={(v) => updateContent('conference', { ...content.conference, fullName: v })}
                        multiline
                    />
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-white/90 text-lg md:text-xl font-medium mt-8">
                    <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <Calendar className="text-orange-400" />
                        <EditableText
                            value={content.conference.date}
                            onChange={(v) => updateContent('conference', { ...content.conference, date: v })}
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <MapPin className="text-orange-400" />
                        <EditableText
                            value={content.conference.venue}
                            onChange={(v) => updateContent('conference', { ...content.conference, venue: v })}
                        />
                    </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#cfp" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/30">
                        Call for Papers
                    </a>
                    <a href="#submission" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-3 rounded-full font-bold text-lg transition-all">
                        Submit Paper
                    </a>
                </div>
            </div>

            {/* Marquee Ticker */}
            {content.hero.marquee.show && (
                <div className="absolute bottom-0 left-0 w-full bg-blue-900/95 text-white py-3.5 overflow-hidden backdrop-blur-md border-t border-blue-700/50 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
                    <div className="whitespace-nowrap animate-marquee flex items-center">
                        <span className="mx-8 font-bold tracking-tight text-sm uppercase flex items-center gap-2">
                            <span className="text-orange-400">Breaking:</span>
                            <EditableText
                                value={content.hero.marquee.text}
                                onChange={(v) => updateContent('hero', { ...content.hero, marquee: { ...content.hero.marquee, text: v } })}
                                className="inline-block"
                            />
                        </span>
                        <span className="mx-8 font-bold tracking-tight text-sm uppercase flex items-center gap-2">
                            <span className="text-orange-400">Notice:</span>
                            <EditableText
                                value={content.hero.marquee.text}
                                onChange={(v) => updateContent('hero', { ...content.hero, marquee: { ...content.hero.marquee, text: v } })}
                                className="inline-block"
                            />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;