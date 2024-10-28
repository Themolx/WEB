// App.js

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import {
  Clapperboard,
  Code,
  Film,
  User,
  Mail,
  Phone,
  MapPin,
  Download,
  Briefcase,
  Github,
  Linkedin,
  X,
  ExternalLink,
  ChevronRight,
  Play,
  ChevronUp,
  Menu,
  Maximize,
  Minimize,
  // Additional icons
  Camera,
  Video,
  Monitor,
  Palette,
  Brush,
  Laptop,
  Terminal,
  Settings,
  Tool,
  Layers,
  Image,
  FileVideo,
  Tv,
  Projector,
  Lightbulb,
  Sparkles,
  Wand2,
  Rocket,
  Star,
  Award,
  Trophy,
  Medal,
  Certificate,
  Zap,
  Eye,
  PenTool,
  Box,
  Boxes,
  Component,
  Layout,
  Scissors,
  Workflow,
  Gauge,
  Sliders
} from 'lucide-react';

// ====================
// Constants & Assets
// ====================

const glitchImages = [
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/Glitch/1.png',
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/Glitch/2.png',
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/Glitch/3.png',
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/Glitch/4.png',
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/Glitch/6.png',
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/Glitch/7.png',
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/Glitch/9.png',
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/Glitch/12.png',
];

const analogImages = [
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/foto/1.jpg',
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/foto/2.jpg',
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/foto/3.jpg',
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/foto/4.jpg',
];

// Commercial Images (assuming these are additional)
const commercialImages = [
  'https://via.placeholder.com/800x600.png?text=Commercial+1',
  'https://via.placeholder.com/800x600.png?text=Commercial+2',
  'https://via.placeholder.com/800x600.png?text=Commercial+3',
  'https://via.placeholder.com/800x600.png?text=Commercial+4',
  'https://via.placeholder.com/800x600.png?text=Commercial+5',
  'https://via.placeholder.com/800x600.png?text=Commercial+6',
  // Add more as needed
];

const profilePicture = 'https://avatars.githubusercontent.com/u/183303841?s=400&u=15ae10f7b65b15a10c0ddd7a9d12efbb608014f4&v=4';

// ====================
// Animation Variants
// ====================

const animationVariants = {
  slideInRight: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
    transition: { duration: 0.5, ease: 'easeInOut' }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

// ====================
// Custom Hooks
// ====================

const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isInView];
};

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevOffset, setPrevOffset] = useState(0);

  useEffect(() => {
    const toggleScrollDirection = () => {
      const scrollY = window.pageYOffset;
      if (scrollY > prevOffset) {
        setScrollDirection("down");
      } else if (scrollY < prevOffset) {
        setScrollDirection("up");
      }
      setPrevOffset(scrollY);
    };

    window.addEventListener("scroll", toggleScrollDirection);
    return () => window.removeEventListener("scroll", toggleScrollDirection);
  }, [prevOffset]);

  return scrollDirection;
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

// ====================
// Utility Components
// ====================

const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
    <motion.div
      className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const CursorHighlight = () => {
  const { x, y } = useMousePosition();
  const size = 400;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle ${size}px at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)`
      }}
    />
  );
};

// ====================
// Modal Components
// ====================

const ImageGalleryModal = ({ images, currentIndex, setCurrentIndex, onClose }) => {
  const controls = useAnimation();
  const dragConstraints = useRef(null);
  const dragX = useMotionValue(0);
  const dragProgress = useTransform(dragX, [-200, 200], [1, -1]);

  const handleDragEnd = useCallback(() => {
    const x = dragX.get();
    if (Math.abs(x) > 100) {
      const newIndex = x > 0
        ? (currentIndex - 1 + images.length) % images.length
        : (currentIndex + 1) % images.length;
      setCurrentIndex(newIndex);
    }
    dragX.set(0);
  }, [currentIndex, images.length, setCurrentIndex, dragX]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (e.key === 'ArrowLeft') {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [images.length, onClose, setCurrentIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleBackgroundClick = (e) => {
    // Only close if clicking the background overlay
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={handleBackgroundClick}  // Changed from onClick={onClose}
    >
      <motion.div
        ref={dragConstraints}
        className="relative max-w-5xl w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}  // Prevent clicks from bubbling up
      >
        {/* Navigation Controls */}
        <div className="absolute top-4 right-4 flex space-x-4 z-50">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();  // Add this to prevent bubbling
              setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
            }}
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();  // Add this to prevent bubbling
              setCurrentIndex((prev) => (prev + 1) % images.length);
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();  // Add this to prevent bubbling
              onClose();
            }}
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Image Container */}
        <motion.div
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          style={{ x: dragX }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="max-h-[80vh] max-w-[90vw] object-contain pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
          <span className="text-white text-sm">
            {currentIndex + 1} / {images.length}
          </span>
          <div className="flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/40'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const VideoModal = ({ url, onClose, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={url}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>
        {title && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        )}
        <motion.button
          className="absolute top-4 right-4 text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          <X size={24} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// ====================
// Component: ContactInfo
// ====================

const ContactInfo = ({ icon: Icon, text, href, className = '' }) => (
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    href={href || '#'}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center text-gray-600 hover:text-black transition-colors ${className}`}
  >
    <Icon size={16} className="mr-2" />
    <span className="text-sm">{text}</span>
  </motion.a>
);

// ====================
// Component: Navigation
// ====================

const Navigation = ({ activeSection, setActiveSection, isMobile = false }) => {
  const navItems = [
    { id: 'summary', icon: User, label: 'Summary' },
    { id: 'film', icon: Film, label: 'Film Projects' },
    { id: 'commercial', icon: Briefcase, label: 'Commercial Work' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'personal', icon: Clapperboard, label: 'Personal Projects' }
    // Removed 'experimental' as per instruction
  ];

  return (
    <nav className={`${isMobile ? 'flex flex-row justify-around' : 'space-y-2'} flex-1`}>
      {navItems.map((item) => (
        <motion.button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          className={`
            ${isMobile ? 'p-2' : 'w-full px-4 py-3'}
            flex items-center rounded-lg transition-all duration-300
            ${activeSection === item.id
              ? 'bg-black text-white'  // This is the style we want to match
              : 'text-gray-600 hover:bg-gray-100 hover:text-black'
            }
          `}
          whileHover={{ scale: isMobile ? 1.05 : 1 }}
        >
          <item.icon size={20} className="min-w-[20px]" />
          {!isMobile && <span className="ml-3 text-sm font-medium">{item.label}</span>}
        </motion.button>
      ))}
    </nav>
  );
};

// ====================
// Component: ProjectCard
// ====================

const ProjectCard = ({
  title,
  description,
  duration,
  details,
  technologies,
  media,
  mediaType,
  link,
  className = '',
  icon: Icon,
  variant = 'default',
  videoUrl,
  category,
  studio,
  alwaysExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(alwaysExpanded && category !== 'Film');
  const [showGallery, setShowGallery] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [isInView, controls]);

  const variants = {
    default: {
      background: 'bg-white',
      text: 'text-gray-900',
      hover: 'hover:shadow-lg hover:border-gray-300'
    },
    featured: {
      background: 'bg-gradient-to-br from-gray-900 to-gray-800',
      text: 'text-white',
      hover: 'hover:shadow-xl hover:shadow-gray-900/20'
    },
    outline: {
      background: 'bg-white',
      text: 'text-gray-900',
      hover: 'hover:border-black'
    }
  };

  const currentVariant = variants[variant];

  // Determine if the card can be expanded
  const canExpand = !alwaysExpanded && category !== 'Commercial';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      whileHover={{}}
      transition={{ duration: 0.3 }}
      className={`
        rounded-xl overflow-hidden border transition-all duration-300
        ${currentVariant.background} ${currentVariant.hover} ${className}
        ${canExpand ? 'cursor-pointer' : ''}
      `}
      onClick={() => {
        if (canExpand) {
          setIsExpanded(!isExpanded);
        }
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className={`p-2 rounded-lg ${
                variant === 'featured' ? 'bg-white/10' : 'bg-gray-100'
              }`}>
                <Icon 
                  size={24} 
                  className={variant === 'featured' ? 'text-white' : 'text-gray-600'} 
                />
              </div>
            )}
            <div>
              <h3 className={`text-xl font-semibold ${currentVariant.text}`}>
                {title}
              </h3>
              {duration && (
                <p className={`text-sm mt-1 ${
                  variant === 'featured' ? 'text-white/60' : 'text-gray-500'
                }`}>
                  {duration}
                </p>
              )}
              {studio && (
                <p className={`text-sm mt-0.5 ${
                  variant === 'featured' ? 'text-white/60' : 'text-gray-500'
                }`}>
                  {studio}
                </p>
              )}
            </div>
          </div>
          
          {/* Toggle Button - Removed for Commercials */}
          {canExpand && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className={variant === 'featured' ? 'text-white/80' : 'text-gray-500'}
            >
              {isExpanded ? (
                <Minimize size={20} />
              ) : (
                <Maximize size={20} />
              )}
            </motion.button>
          )}
        </div>

        {/* Main Content */}
        <div className={`mt-4 ${variant === 'featured' ? 'text-white/80' : 'text-gray-600'}`}>
          {description}
        </div>

        {/* Technologies */}
        {technologies && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mt-4"
          >
            {technologies.map((tech, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm ${
                  variant === 'featured'
                    ? 'bg-white/10 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {tech}
              </span>
            ))}
          </motion.div>
        )}

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 overflow-hidden"
            >
              {/* Details */}
              {details && (
                <div className={`prose prose-sm max-w-none ${variant === 'featured' ? 'text-white/80' : 'text-gray-700'}`}>
                  {details}
                </div>
              )}

              {/* Media Grid */}
              {media && mediaType === 'image' && (
                <motion.div 
                  variants={animationVariants.container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 gap-4 mt-4"
                >
                  {media.map((src, index) => (
                    <motion.div
                      key={index}
                      variants={animationVariants.item}
                      whileHover={{ scale: 1.05 }}
                      className="relative group cursor-pointer aspect-square"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card expansion
                        setCurrentImageIndex(index);
                        setShowGallery(true);
                      }}
                    >
                      <img
                        src={src}
                        alt={`${title} ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <Maximize className="text-white" size={24} />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Video Preview */}
              {videoUrl && (
                <div className="mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full relative aspect-video rounded-lg overflow-hidden 
                      bg-gray-900 flex items-center justify-center group"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowVideo(true);
                    }}
                  >
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 
                      transition-colors duration-200" />
                    <Play className="text-white w-16 h-16 group-hover:scale-110 
                      transition-transform duration-200" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showGallery && (
          <ImageGalleryModal
            images={media}
            currentIndex={currentImageIndex}
            setCurrentIndex={setCurrentImageIndex}
            onClose={() => setShowGallery(false)}
          />
        )}
        {showVideo && (
          <VideoModal
            url={videoUrl}
            title={title}
            onClose={() => setShowVideo(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ====================
// Component: SkillCard
// ====================

const SkillCard = ({ 
  title, 
  icon: Icon, 
  skills, 
  description,
  tools,
  projects
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden"
    >
      <motion.div
        className="p-6 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="p-2 bg-gray-100 rounded-lg">
                <Icon size={24} className="text-gray-600" />
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500"
          >
            {isExpanded ? (
              <Minimize size={20} />
            ) : (
              <Maximize size={20} />
            )}
          </motion.button>
        </div>

        <p className="mt-2 text-gray-600">{description}</p>

        {/* Software/Tools Bubbles - Always Visible */}
        {tools && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Tools & Software</h4>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 overflow-hidden"
            >
              {/* Skills Grid */}
              <div className="grid grid-cols-1 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-gray-900 rounded-full" />
                    <span className="text-gray-700">{skill}</span>
                  </motion.div>
                ))}
              </div>

              {/* Related Projects */}
              {projects && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Related Projects
                  </h4>
                  <div className="grid gap-2">
                    {projects.map((project, index) => (
                      <motion.a
                        key={index}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                        whileHover={{ scale: 1.05 }}
                      >
                        <ChevronRight size={16} />
                        <span>{project.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// ====================
// Component: Section
// ====================

const Section = ({ title, subtitle, children, className = '' }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className={`space-y-8 ${className}`}
    >
      <div className="space-y-2">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-4xl font-bold text-gray-900"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      {children}
    </motion.section>
  );
};

// ====================
// Component: MobileNavigation
// ====================

const MobileNavigation = ({ isOpen, setIsOpen, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-50 bg-white"
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Navigation</h2>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="p-2"
              >
                <X size={24} />
              </motion.button>
            </div>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ====================
// Main App Component
// ====================

const App = () => {
  const [activeSection, setActiveSection] = useState('summary');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);

    // Change the document title
    document.title = "Martin Tomek";

    // Simulated loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Define content data
  const experienceData = {
    film: [
      {
        title: "Proud Princess",
        description: "Lead compositor on the feature film Proud Princess.",
        duration: "September 2024 - October 2024",
        studio: "PFX Studio",
        icon: Film,
        variant: 'featured',
        technologies: ["Nuke", "DaVinci Resolve", "Mocha Pro"],
        details: (
          <div className="space-y-4">
            <p>
              Worked as the lead compositor, overseeing the visual effects compositing for key sequences.
            </p>
            <ul className="list-disc pl-5">
              <li>Led a team of compositors</li>
              <li>Ensured visual consistency across shots</li>
              <li>Optimized the compositing pipeline</li>
            </ul>
          </div>
        ),
        media: [
          'https://via.placeholder.com/800x600.png?text=Proud+Princess+1',
          'https://via.placeholder.com/800x600.png?text=Proud+Princess+2'
        ],
        mediaType: 'image',
        link: 'https://example.com/proud-princess'
      },
      {
        title: "Rosa & Dara",
        description: "Lead compositor and technical director for 3D animated feature film.",
        duration: "August 2021 - Present",
        studio: "Incognito Studio",
        icon: Film,
        variant: 'featured',
        technologies: ["Nuke", "Python"],
        details: (
          <div className="space-y-4">
            <p>
              Spearheaded the compositing and technical direction for the 3D animated feature "Rosa & Dara",
              integrating complex 3D elements with live-action footage.
            </p>
            <ul className="list-disc pl-5">
              <li>Developed custom Nuke tools for pipeline optimization</li>
              <li>Implemented automated quality control systems</li>
              <li>Created render farm integration solutions</li>
              <li>Established collaborative workflow procedures</li>
            </ul>
          </div>
        ),
        media: [
          'https://via.placeholder.com/800x600.png?text=Rosa+Dara+1',
          'https://via.placeholder.com/800x600.png?text=Rosa+Dara+2'
        ],
        mediaType: 'image',
        link: 'https://example.com/rosa-dara'
      }
      // Add more film projects as needed
    ],
    commercial: [
      {
        title: "Panasonic Japan",
        description: "Led VFX and compositing for international product launch campaign.",
        duration: "2023",
        variant: 'default',
        technologies: ["Nuke", "After Effects", "DaVinci Resolve"],
        details: null,
        media: [
          'https://via.placeholder.com/800x600.png?text=Panasonic+Campaign+1',
          'https://via.placeholder.com/800x600.png?text=Panasonic+Campaign+2'
        ],
        mediaType: 'image',
        link: '#'
      },
      {
        title: "Moneta Bank",
        description: "Created visual effects and motion graphics for banking service advertisements.",
        duration: "2023",
        variant: 'default',
        technologies: ["Nuke", "After Effects"],
        details: null,
        media: [
          'https://via.placeholder.com/800x600.png?text=Moneta+Bank+1',
          'https://via.placeholder.com/800x600.png?text=Moneta+Bank+2'
        ],
        mediaType: 'image',
        link: '#'
      },
      {
        title: "McDonald's",
        description: "Developed dynamic motion graphics and VFX for promotional campaigns.",
        duration: "2023",
        variant: 'default',
        technologies: ["Nuke", "After Effects"],
        details: null,
        media: [
          'https://via.placeholder.com/800x600.png?text=McDonalds+1',
          'https://via.placeholder.com/800x600.png?text=McDonalds+2'
        ],
        mediaType: 'image',
        link: '#'
      },
      {
        title: "T-Mobile",
        description: "Created visual effects for brand campaigns and product launches.",
        duration: "2023",
        variant: 'default',
        technologies: ["Nuke", "After Effects"],
        details: null,
        media: [
          'https://via.placeholder.com/800x600.png?text=T-Mobile+1',
          'https://via.placeholder.com/800x600.png?text=T-Mobile+2'
        ],
        mediaType: 'image',
        link: '#'
      },
      {
        title: "O2",
        description: "Delivered motion graphics and visual effects for telecommunications campaigns.",
        duration: "2023",
        variant: 'default',
        technologies: ["Nuke", "After Effects"],
        details: null,
        media: [
          'https://via.placeholder.com/800x600.png?text=O2+1',
          'https://via.placeholder.com/800x600.png?text=O2+2'
        ],
        mediaType: 'image',
        link: '#'
      },
      {
        title: "PSS",
        description: "Developed visual effects and motion graphics for corporate communications.",
        duration: "2023",
        variant: 'default',
        technologies: ["Nuke", "After Effects"],
        details: null,
        media: [
          'https://via.placeholder.com/800x600.png?text=PSS+1',
          'https://via.placeholder.com/800x600.png?text=PSS+2'
        ],
        mediaType: 'image',
        link: '#'
      },
      {
        title: "7energy",
        description: "Created dynamic visual content for energy drink marketing campaigns.",
        duration: "2023",
        variant: 'default',
        technologies: ["Nuke", "After Effects"],
        details: null,
        media: [
          'https://via.placeholder.com/800x600.png?text=7energy+1',
          'https://via.placeholder.com/800x600.png?text=7energy+2'
        ],
        mediaType: 'image',
        link: '#'
      },
      {
        title: "Billa",
        description: "Delivered visual effects and motion graphics for retail advertising.",
        duration: "2023",
        variant: 'default',
        technologies: ["Nuke", "After Effects"],
        details: null,
        media: [
          'https://via.placeholder.com/800x600.png?text=Billa+1',
          'https://via.placeholder.com/800x600.png?text=Billa+2'
        ],
        mediaType: 'image',
        link: '#'
      },
      {
        title: "Epet",
        description: "Created visual content for pet supply retailer marketing campaigns.",
        duration: "2023",
        variant: 'default',
        technologies: ["Nuke", "After Effects"],
        details: null,
        media: [
          'https://via.placeholder.com/800x600.png?text=Epet+1',
          'https://via.placeholder.com/800x600.png?text=Epet+2'
        ],
        mediaType: 'image',
        link: '#'
      }
    ],
    experience: [
      {
        title: "Compositor",
        duration: "PFX Studio | September 2024 - October 2024",
        description: "Lead compositing work on the feature film Proud Princess.",
        icon: Layers, // Changed from Film to Layers
        variant: 'featured',
        technologies: ["Nuke", "DaVinci Resolve", "Mocha Pro"],
        moreInfo: (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-2">Key Achievements:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Led compositing team for key sequences</li>
              <li>Established shot consistency guidelines</li>
              <li>Optimized delivery pipeline</li>
            </ul>
          </div>
        )
      },
      {
        title: "Compositor",
        duration: "Incognito Studio | August 2021 - Present",
        description: "Compositor with experience in on-set supervision.",
        icon: PenTool, // Changed from Code to PenTool
        variant: 'default',
        technologies: ["Nuke", "Python", "After Effects"],
        moreInfo: (
          <div className="space-y-4">
            <p className="text-gray-700">
              Worked as a compositor at Incognito Studio, contributing to various high-profile projects.
              Gained valuable experience in on-set supervision, ensuring seamless integration of VFX elements.
            </p>
          </div>
        )
      },
      {
        title: "Technical Director TD",
        duration: "Incognito Studio | January 2025 - Present",
        description: "Overseeing technical operations and pipeline development.",
        icon: Settings, // Changed from Film to Settings
        moreInfo: (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-2">Responsibilities:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Developing and maintaining VFX pipelines</li>
              <li>Implementing automation tools to streamline workflows</li>
              <li>Collaborating with artists to optimize technical processes</li>
            </ul>
          </div>
        )
      },
      {
        title: "Freelance Motion Graphic Designer",
        duration: "VIG Production | October 2023 - Present",
        description: "Created motion graphics for various client projects.",
        icon: Monitor, // Changed from Film to Monitor
        moreInfo: null
      },
      {
        title: "Freelance Nuke Compositor",
        duration: "Let it Roll Festival | July 2023 - August 2023",
        description: "Co-created a 5-minute opening sequence using Nuke and Nuke Studio.",
        icon: Video, // Changed from Film to Video
        moreInfo: null
      }
      // Add more roles as needed
    ],
    skills: [
      {
        title: "Compositing",
        description: "Advanced compositing with expertise in node-based and layer-based workflows.",
        proficiency: null, // Removed proficiency bar for specific skills
        skills: [
          "Advanced Rotoscoping",
          "Complex Node Setups",
          "Color Grading",
          "Shot Cleanup",
          "3D Integration",
          "Digital Matte Painting"
        ],
        tools: [
          "Nuke",
          "After Effects",
          "DaVinci Resolve",
          
        ],
        projects: [
          { name: "Proud Princess", link: "https://example.com/proud-princess" },
          { name: "Panasonic Campaign", link: "https://example.com/panasonic-campaign" }
        ]
      },
      {
        title: "Technical Direction",
        description: "Development of efficient pipelines and automation tools for VFX production.",
        proficiency: null, // Removed proficiency bar for specific skills
        skills: [
          "Pipeline Architecture Design",
          "Custom Tool Development",
          "Workflow Automation",
          "Technical Documentation",
          "Render Farm Management",
          "Quality Control Systems"
        ],
        tools: [
          "Python",
          "Nuke Scripting",
          
        ],
        projects: [
          { name: "Rosa & Dara Pipeline", link: "https://example.com/rosa-dara-pipeline" },
          { name: "Automated QC Tool", link: "https://example.com/automated-qc-tool" }
        ]
      },
      {
        title: "Motion Design",
        description: "Creating engaging motion graphics and animations for various media.",
        proficiency: null, // Removed proficiency bar for specific skills
        skills: [
          "2D and 3D Animation",
          "Brand Identity Animation",
          "Title Sequences",
          "Animated Infographics",
          "Visual Storytelling",
          "Motion Typography"
        ],
        tools: [
          "Adobe After Effects",
          "Blender",
          "Adobe Premiere Pro",
          
        ],
        projects: [
          { name: "Corporate Branding", link: "https://example.com/corporate-branding" },
          { name: "Animated Infographics", link: "https://example.com/animated-infographics" }
        ]
      },
      {
        title: "Creative Development",
        description: "Pushing boundaries with experimental techniques and live visual performance.",
        proficiency: null, // Removed proficiency bar for specific skills
        skills: [
          "Real-time Visual Performance",
          "Interactive Installations",
          "Experimental Animation Techniques",
          "Digital Art Creation",
          "VJing",
          "TouchDesigner"
        ],
        tools: [
          "Resolume Arena",
          "TouchDesigner",
          "Processing",
          "Max/MSP",
          "Ableton Live"
        ],
        projects: [
          { name: "Live VJ Toolkit", link: "https://example.com/live-vj-toolkit" },
          { name: "Interactive Installations", link: "https://example.com/interactive-installations" }
        ]
      }
    ]
  };

  const personalProjects = [
    {
      id: 'bachelor-movie',
      title: "Bachelor Movie",
      description: "A unique fusion of 3D animation, AI, and analog techniques creating a distinctive narrative experience.",
      moreInfo: (
        <div className="space-y-4">
          <motion.a
            href="https://youtu.be/M6bm6yRKshA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
            whileHover={{ scale: 1.05 }}
          >
            <span>Watch on YouTube</span>
            <ExternalLink size={16} />
          </motion.a>
        </div>
      ),
      alwaysExpanded: true
    },
    {
      id: 'nuke-grab-tool',
      title: "Nuke Grab Tool",
      description: "Implemented the Blender Grab Tool within Nuke, enhancing node movement capabilities.",
      moreInfo: (
        <div className="space-y-4">
          <motion.a
            href="http://www.nukepedia.com/python/nodegraph/nuke-grab-tool"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
            whileHover={{ scale: 1.05 }}
          >
            <span>View the tool on Nukepedia</span>
            <ExternalLink size={16} />
          </motion.a>
          <p className="text-gray-700">
            This script implements the entire Blender Grab Tool within Nuke, bringing its
            full node movement capabilities to your compositing workflow.
          </p>
        </div>
      ),
      alwaysExpanded: true
    },
    {
      id: 'glitch-art',
      title: "Glitch Art",
      description: "Experimental glitch art created through various digital manipulation techniques.",
      media: glitchImages,
      mediaType: "image",
      moreInfo: (
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Techniques:</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Digital signal manipulation</li>
            <li>Data moshing</li>
            <li>Custom processing algorithms</li>
          </ul>
        </div>
      ),
      alwaysExpanded: true
    },
    {
      id: 'analog-photography',
      title: "Analog Photography",
      description: "Capturing moments through analog lenses and developing alternative film processes.",
      media: analogImages,
      mediaType: "image",
      moreInfo: (
        <div className="space-y-4">
          <h4 className="font-semibold text-lg">Process:</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Film photography using various camera models</li>
            <li>Darkroom development techniques</li>
            <li>Creative photo manipulation</li>
          </ul>
        </div>
      ),
      alwaysExpanded: true
    }
  ];

  // Define section renderers
  const renderContent = () => {
    switch (activeSection) {
      case 'summary':
        return (
          <Section
            title="Martin Tomek"
            subtitle="VFX Artist & Motion Designer"
          >
            <motion.div
              variants={animationVariants.container}
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              {/* Hero Video/Showreel */}
              <motion.div
                variants={animationVariants.item}
                className="relative aspect-video rounded-xl overflow-hidden shadow-lg"
              >
                <iframe
                  src="https://player.vimeo.com/video/1016090207"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Showreel"
                />
              </motion.div>



              {/* Introduction */}
              <motion.div
                variants={animationVariants.item}
                className="prose prose-lg max-w-none"
              >
                <p>
                  <strong>I'm a passionate VFX Artist and Motion Designer based in Prague</strong>, 
                  specializing in creating seamless visual effects and compelling motion graphics.
                  With over <strong>three years of experience</strong> in the industry, I've contributed to
                  various high-profile projects ranging from feature films to commercial campaigns.
                </p>
                <p>
                  My expertise spans across:
                </p>
                <ul>
                  <li><strong>Nuke compositing</strong></li>
                  <li><strong>Pipeline development</strong></li>
                  <li><strong>Motion design</strong></li>
                </ul>
                <p>
                  I'm particularly passionate about exploring the intersection
                  of traditional techniques and cutting-edge technology.
                </p>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                variants={animationVariants.container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[
                  { label: "Years Experience", value: "3+" },
                  { label: "Projects Completed", value: "50+" },
                  { label: "Satisfied Clients", value: "20+" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={animationVariants.item}
                    className="bg-white p-6 rounded-xl border border-gray-200"
                  >
                    <div className="text-3xl font-bold text-black">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Call to Action */}
              <motion.div
                variants={animationVariants.item}
                className="flex flex-wrap gap-4"
              >
                {/* Removed the Showreel button. If you want to keep it functional, you can uncomment below */}
                {/* 
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = 'https://your-showreel-link.com'}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 
                    transition-colors flex items-center space-x-2"
                >
                  <Play size={20} />
                  <span>Watch Showreel</span>
                </motion.button>
                */}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = 'mailto:martintomek.vfx@gmail.com'}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 
                    transition-colors flex items-center space-x-2"
                >
                  <Mail size={20} />
                  <span>Get in Touch</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </Section>
        );

      case 'film':
        return (
          <Section
            title="Film Projects"
            subtitle="Feature films and cinematic visual effects work"
          >
            <div className="space-y-8">
              {experienceData.film.map((project, index) => (
                <ProjectCard
                  key={index}
                  {...project}
                  icon={Film}
                  category="Film"
                />
              ))}
            </div>
          </Section>
        );

      case 'commercial':
        return (
          <Section
            title="Commercial Work"
            subtitle="Advertising and branded content projects"
          >
            <motion.div
              variants={animationVariants.container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {experienceData.commercial.map((project, index) => (
                <motion.div
                  key={index}
                  variants={animationVariants.item}
                  className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 p-4"
                >
                  {/* Project Header */}
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{project.title}</h3>
                  
                  {/* Duration */}
                  <p className="text-xs text-gray-500 mb-2">{project.duration}</p>
                  
                  {/* Description - Limited to 2 lines */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{project.description}</p>
                  
                  {/* Technologies */}
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs whitespace-nowrap"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </Section>
        );

      case 'skills':
        return (
          <Section
            title="Skills & Expertise"
            subtitle="Technical proficiency and creative capabilities"
          >
            <div className="space-y-12">
              {/* Main Skills */}
              <div className="grid grid-cols-1 gap-6">
                {experienceData.skills.map((skill, index) => (
                  <SkillCard
                    key={index}
                    {...skill}
                  />
                ))}
              </div>
            </div>
          </Section>
        );

      case 'experience':
        return (
          <Section
            title="Professional Experience"
            subtitle="Career highlights and achievements"
          >
            <div className="space-y-8">
              {experienceData.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {exp.icon && (
                        <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                          <exp.icon size={24} />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                        <p className="text-sm text-gray-500">{exp.duration}</p>
                      </div>
                    </div>
                    {exp.link && (
                      <a 
                        href={exp.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                      >
                        <span>Learn More</span>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  
                  <p className="mt-4 text-gray-700">{exp.description}</p>
                  
                  {/* Technologies */}
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {exp.moreInfo && (
                    <div className="mt-4 text-gray-600">
                      {exp.moreInfo}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </Section>
        );

      case 'personal':
        return (
          <Section
            title="Personal Projects"
            subtitle="Experimental work and creative explorations"
          >
            <div className="grid grid-cols-1 gap-8">
              {personalProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  {...project}
                  variant={project.variant || 'default'}
                  category="Personal"
                />
              ))}
            </div>
          </Section>
        );

      default:
        return null;
    }
  };

  // Render loading screen if loading
  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <motion.nav
        variants={animationVariants.slideInRight}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r 
          border-gray-200 p-6 md:h-screen md:sticky md:top-0"
      >
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="relative w-20 h-20 mb-4">
              <img
                src={profilePicture}
                alt="Profile"
                className="rounded-full object-cover w-full h-full"
              />
              <motion.div
                className="absolute -inset-0.5 rounded-full bg-gradient-to-r 
                  from-black to-gray-600 opacity-0"
                whileHover={{ opacity: 0.2 }}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Martin Tomek</h2>
            <p className="text-gray-500">VFX Artist & Motion Designer</p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={animationVariants.container}
            initial="hidden"
            animate="show"
            className="mb-6 space-y-2"
          >
            <ContactInfo icon={MapPin} text="Prague, Czech Republic" href="#" />
            <ContactInfo
              icon={Mail}
              text="martintomek.vfx@gmail.com"
              href="mailto:martintomek.vfx@gmail.com"
            />
            <ContactInfo
              icon={Phone}
              text="+420 774 630 132"
              href="tel:+420774630132"
            />
            <ContactInfo
              icon={Github}
              text="github.com/Themolx"
              href="https://github.com/Themolx"
            />
            <ContactInfo
              icon={Linkedin}
              text="LinkedIn Profile"
              href="https://www.linkedin.com/in/martin-tomek"
            />
          </motion.div>

          {/* Navigation */}
          <Navigation
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          {/* Social Links */}
          <div className="mt-6">
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/Themolx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/martin-tomek"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
              <motion.a
                href="mailto:martintomek.vfx@gmail.com"
                className="text-gray-600 hover:text-black transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </motion.a>
            </div>
          </div>

          {/* Footer */}
          <motion.div
            variants={animationVariants.item}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.5 }}
            className="mt-auto pt-6 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500">Available for new opportunities</p>
            <p className="text-sm text-gray-500 mt-1">
              Willing to relocate to Canary Islands
            </p>
            <motion.a
              href="#"
              className="flex items-center mt-4 text-gray-600 hover:text-black 
                transition-colors group"
              whileHover={{ scale: 1.05 }} // Simplified hover
            >
              <Download size={16} className="mr-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Download Resume</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main
        className="flex-1 p-4 md:p-8 overflow-y-auto"
      >
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      {/* Mobile Menu Button */}
      <motion.button
        className="md:hidden fixed bottom-8 left-8 p-3 bg-black text-white 
          rounded-full shadow-lg hover:bg-gray-800 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu size={24} />
      </motion.button>

      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      >
        <Navigation
          activeSection={activeSection}
          setActiveSection={(section) => {
            setActiveSection(section);
            setIsMobileMenuOpen(false);
          }}
          isMobile
        />
      </MobileNavigation>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-3 bg-black text-white rounded-full 
              shadow-lg hover:bg-gray-800 z-40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cursor Highlight Effect */}
      <CursorHighlight />
    </div>
  );
};

// ====================
// Component: SkillCard
// ====================

// Note: Moved the SkillCard component above the App component for clarity

// ====================
// Component: ProjectCard
// ====================

// Note: Moved the ProjectCard component above the App component for clarity

export default App;
