import { ArrowLeft, ArrowRight, Quote, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { EditableText, EditableImage } from "./Editable";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay,
  className,
  onMemberClick,
  onUpdate,
  onRemove
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
  onMemberClick?: (index: number) => void;
  onUpdate?: (index: number, field: string, value: string) => void;
  onRemove?: (index: number) => void;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 8000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const handleUpdate = (field: string, val: string) => {
    if (onUpdate) {
      onUpdate(active, field, val);
    }
  };

  return (
    <div className={cn("max-w-6xl mx-auto px-4 md:px-8 py-12", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left Side: Content */}
        <div className="order-2 md:order-1 flex flex-col justify-center space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={`space-y-6`}
            >
              <div className="relative">
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-blue-100 -z-10 transform -scale-x-100" />
                <h3 className="text-xl md:text-2xl font-medium text-gray-700 italic leading-relaxed">
                  "<EditableText value={testimonials[active].quote} onChange={(v) => handleUpdate('quote', v)} multiLine />"
                </h3>
              </div>

              <div>
                <h4
                  className={`text-2xl font-bold text-gray-900 ${onMemberClick ? 'cursor-pointer hover:text-blue-700' : ''}`}
                  onClick={() => { if (!onUpdate) onMemberClick && onMemberClick(active) }} // Only navigate if not editing? Or title click navigates? EditableText handles clicks if admin.
                >
                  <EditableText value={testimonials[active].name} onChange={(v) => handleUpdate('name', v)} />
                </h4>
                <p className="text-blue-600 font-semibold mt-1">
                  <EditableText value={testimonials[active].designation} onChange={(v) => handleUpdate('designation', v)} />
                </p>
                {onMemberClick && (
                  <button onClick={() => onMemberClick(active)} className="text-xs text-blue-400 mt-2 hover:underline">
                    View Profile
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4 pt-4 items-center">
            <button
              onClick={handlePrev}
              className="group flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-md"
              aria-label="Previous Speaker"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
              aria-label="Next Speaker"
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            {onRemove && (
                <button
                  onClick={() => {
                      onRemove(active);
                      if (active === testimonials.length - 1 && active > 0) setActive(active - 1);
                  }}
                  className="ml-auto flex flex-col items-center justify-center p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors group/delete"
                  title="Remove Speaker"
                >
                    <Trash2 className="w-5 h-5" />
                    <span className="text-[10px] font-bold mt-1 opacity-0 group-hover/delete:opacity-100 transition-opacity uppercase">Delete</span>
                </button>
            )}
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="order-1 md:order-2 h-[400px] md:h-[500px] w-full relative group">
          <div className="absolute inset-0 bg-blue-600 rounded-[2rem] rotate-3 opacity-10 group-hover:rotate-6 transition-transform duration-500"></div>
          <div className="absolute inset-0 bg-gray-900 rounded-[2rem] -rotate-2 opacity-5 group-hover:-rotate-3 transition-transform duration-500"></div>

          <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100">
            {onUpdate ? (
                <EditableImage
                    src={testimonials[active].src}
                    alt={testimonials[active].name}
                    className="h-full w-full object-cover object-top"
                    onChange={(v) => handleUpdate('src', v)}
                />
            ) : (
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={testimonials[active].src}
                    src={testimonials[active].src}
                    alt={testimonials[active].name}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`h-full w-full object-cover object-top ${onMemberClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
                    draggable={false}
                    onClick={() => onMemberClick && onMemberClick(active)}
                  />
                </AnimatePresence>
            )}

            {/* Overlay Gradient for image text readability if needed, but keeping it clean for now */}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none rounded-[2rem]"></div>
          </div>
        </div>

      </div>
    </div>
  );
};