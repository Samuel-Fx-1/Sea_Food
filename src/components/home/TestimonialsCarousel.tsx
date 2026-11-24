import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import { TestimonialCard } from '../cards/TestimonialCard';
import { SectionHeading } from '../common/SectionHeading';

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const goTo = (next: number): void => {
    setIndex((next + testimonials.length) % testimonials.length);
  };

  return (
    <section
      className="testimonials section-space page-gutter"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onFocusCapture={() => setIsPlaying(false)}
      onBlurCapture={() => setIsPlaying(true)}
    >
      <SectionHeading
        id="testimonials-title"
        eyebrow="Kind words"
        title="What our guests say"
        align="center"
      />
      <div className="testimonials__stage" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[index].id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <TestimonialCard testimonial={testimonials[index]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="testimonials__controls">
        <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous testimonial">
          <ChevronLeft size={20} />
        </button>
        <div className="testimonials__dots">
          {testimonials.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              className={itemIndex === index ? 'dot is-active' : 'dot'}
              aria-label={`Show testimonial from ${item.name}`}
              aria-current={itemIndex === index}
              onClick={() => goTo(itemIndex)}
            />
          ))}
        </div>
        <button type="button" onClick={() => goTo(index + 1)} aria-label="Next testimonial">
          <ChevronRight size={20} />
        </button>
        <button
          type="button"
          className="testimonials__play"
          onClick={() => setIsPlaying((playing) => !playing)}
          aria-label={isPlaying ? 'Pause testimonials' : 'Play testimonials'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
    </section>
  );
}
