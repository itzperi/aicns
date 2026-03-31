import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { useAdmin } from '../contexts/AdminContext';
import { Carousel } from './ui/carousel';
import { EditableText, EditableImage, EditableFile } from './ui/Editable';
import { Eye, EyeOff, Plus, Trash2 } from 'lucide-react';

export const GlimpseSection: React.FC = () => {
    const { content, updateContent } = useContent();
    const { isAdmin } = useAdmin();
    const glimpse = content.glimpse;

    const toggleVisibility = () => {
        updateContent('glimpse', { ...glimpse, show: !glimpse.show });
    };

    const updateSlide = (idx: number, field: string, val: string) => {
        const newSlides = [...glimpse.slides];
        newSlides[idx] = { ...newSlides[idx], [field]: val };
        updateContent('glimpse', { ...glimpse, slides: newSlides });
    };

    const addSlide = () => {
        const newSlide = {
            title: "New Glimpse",
            button: "View Details",
            src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
        };
        updateContent('glimpse', { ...glimpse, slides: [...glimpse.slides, newSlide] });
    };

    const removeSlide = (idx: number) => {
        const newSlides = glimpse.slides.filter((_, i) => i !== idx);
        updateContent('glimpse', { ...glimpse, slides: newSlides });
    };

    if (!glimpse.show && !isAdmin) return null;

    return (
        <section id="glimpse" className={`py-20 relative overflow-hidden transition-opacity duration-500 ${!glimpse.show ? 'opacity-50' : ''}`}>
            {isAdmin && (
                <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
                    <button
                        onClick={toggleVisibility}
                        className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${glimpse.show ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                            }`}
                    >
                        {glimpse.show ? <Eye size={16} /> : <EyeOff size={16} />}
                        Glimpse Section: {glimpse.show ? 'ON' : 'OFF'}
                    </button>
                    <button
                        onClick={addSlide}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow-lg hover:bg-blue-700 transition-all"
                    >
                        <Plus size={16} /> Add Image/Slide
                    </button>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Glimpse of Event</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
                    {!glimpse.show && isAdmin && (
                        <p className="text-red-500 text-sm mt-2 font-bold uppercase tracking-widest">Currently hidden from visitors</p>
                    )}
                </div>

                <div className="relative">
                    <Carousel slides={glimpse.slides} />

                    {isAdmin && (
                        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {glimpse.slides.map((slide, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative group">
                                    <button
                                        onClick={() => removeSlide(idx)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <div className="h-32 mb-4 relative">
                                        <EditableImage
                                            src={slide.src}
                                            alt={slide.title}
                                            onChange={(v) => updateSlide(idx, 'src', v)}
                                            className="w-full h-full rounded-lg"
                                        />
                                        <div className="absolute bottom-1 right-1">
                                            <EditableFile
                                                onUpload={(v) => updateSlide(idx, 'src', v)}
                                                label=""
                                                className="bg-white/80 p-1 rounded-full shadow-sm scale-75"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <EditableText
                                            value={slide.title}
                                            onChange={(v) => updateSlide(idx, 'title', v)}
                                            className="font-bold text-sm block"
                                        />
                                        <EditableText
                                            value={slide.button}
                                            onChange={(v) => updateSlide(idx, 'button', v)}
                                            className="text-xs text-blue-600 block"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
