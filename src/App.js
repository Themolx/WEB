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
  Sliders,
  Pause,
  HardHat,
  Hammer,
  Pen,
} from 'lucide-react';
import Player from '@vimeo/player';

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
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: { 
      x: 100, 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  },
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
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
      animate={{ 
        rotate: 360,
        transition: {
          duration: 1,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop"
        }
      }}
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25
        }
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.95,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25
        }
      }}
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

// First, add this new component near your other modal components:
const UnderConstructionModal = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-black/80 rounded-xl p-8 max-w-md w-full mx-4 relative border border-white/10"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <motion.button
          className="absolute top-4 right-4 text-white/60 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          <X size={24} />
        </motion.button>

        {/* Construction Animation */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{
              rotate: [0, 0, 180, 180, 0],
              scale: [1, 1.2, 1.2, 1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-20 h-20 text-white"
          >
            <HardHat size={80} />
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-center mb-4 text-white">
            Under Construction
          </h3>
          <p className="text-white/80 text-center mb-6">
            This section is currently being crafted with care. Check back soon for amazing motion design content!
          </p>

          {/* Progress Bar */}
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-6">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white"
              animate={{
                width: ["0%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Tools Being Added */}
          <div className="flex justify-center space-x-4">
            {[Film, Pen, Wand2].map((Icon, index) => (
              <motion.div
                key={index}
                animate={{
                  y: [-4, 4, -4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="text-white/80"
              >
                <Icon size={24} />
              </motion.div>
            ))}
          </div>

          {/* Additional Animated Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-50"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(3)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-px h-20 bg-white/20"
                  style={{
                    left: `${30 * (index + 1)}%`,
                    top: '-20%',
                  }}
                  animate={{
                    y: ['0%', '150%'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.4,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
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
    className={`flex items-center space-x-2 text-gray-600 hover:text-black transition-colors ${className}`}
  >
    <Icon size={16} className="flex-shrink-0" />
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
    { id: 'commercial', icon: Tv, label: 'Commercial Work' },
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
      whileHover={animationVariants.hover}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
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
  description,
  tools,
  years,
  link,
  videoUrl,
  onClick
}) => {
  const [showVideo, setShowVideo] = useState(false);
  const [showConstruction, setShowConstruction] = useState(false);

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden"
      onClick={handleClick}
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="p-2 bg-gray-100 rounded-lg">
                <Icon size={24} className="text-gray-600" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">{years} years experience</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-600">{description}</p>

        {/* Tools */}
        {tools && (
          <div className="mt-4">
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

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          {link && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                if (link.isConstructionLink) {
                  setShowConstruction(true);
                } else if (link.isNavigationLink && onClick) {
                  onClick();
                } else if (link.url !== '#') {
                  window.open(link.url, '_blank');
                }
              }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {link.isConstructionLink ? (
                <Hammer size={16} />
              ) : link.isNavigationLink ? (
                <ChevronRight size={16} />
              ) : (
                <Github size={16} />
              )}
              <span>{link.text}</span>
            </motion.button>
          )}
          
          {videoUrl && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowVideo(true);
              }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Play size={16} />
              <span>Watch Demo</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showVideo && videoUrl && (
          <VideoModal
            url={videoUrl}
            title={title}
            onClose={() => setShowVideo(false)}
          />
        )}
        {showConstruction && (
          <UnderConstructionModal
            onClose={() => setShowConstruction(false)}
          />
        )}
      </AnimatePresence>
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
      variants={animationVariants.container}
      initial="initial"
      animate="animate"
      exit="exit"
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
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

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

  // Add useEffect for initial play state and keyboard controls
  useEffect(() => {
    // Show play button initially, then switch to playing state after delay
    const timer = setTimeout(() => {
      setIsPlaying(true);
    }, 1500); // 1.5 seconds delay

    // Add keyboard listener for spacebar
    const handleKeyPress = (e) => {
      if (e.code === 'Space' && playerRef.current) {
        e.preventDefault(); // Prevent page scroll
        playerRef.current.getPaused().then(paused => {
          if (paused) {
            playerRef.current.play();
            setIsPlaying(true);
          } else {
            playerRef.current.pause();
            setIsPlaying(false);
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Define content data
  const experienceData = {
    film: [
      {
        title: "Proud Princess",
        description: "Compositor on the feature film Proud Princess.",
        duration: "September 2024 - October 2024",
        studio: "PFX Studio",
        icon: Film,
        variant: 'featured',
        technologies: ["Nuke", "DaVinci Resolve", "Mocha Pro"],
        details: (
          <div className="space-y-4">
            <p>
              Worked as a compositor, contributing to visual effects compositing for key sequences.
            </p>
            <ul className="list-disc pl-5">
              <li>Collaborated with the compositing team</li>
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
        description: "Compositor and technical director for 3D animated feature film.",
        duration: "August 2021 - Present",
        studio: "Incognito Studio",
        icon: Film,
        variant: 'featured',
        technologies: ["Nuke", "Python"],
        details: (
          <div className="space-y-4">
            <p>
              Worked as compositor and technical director for the 3D animated feature "Rosa & Dara",
              integrating complex 3D elements with live-action footage.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
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
        description: "Led the compositing team for an international product launch campaign featuring full CGI integration.",
        duration: "2022 - 2023",
        variant: 'featured',
        technologies: ["Nuke", "After Effects", "DaVinci Resolve", "FX Development"],
        details: (
          <div className="space-y-4">
            <p>Spearheaded the visual effects development for a series of high-profile TV commercials, combining complex CGI elements with innovative FX sequences.</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Developed and implemented custom FX solutions</li>
              <li>Managed compositing pipeline for multiple deliverables</li>
              <li>Ensured consistent visual quality across the campaign</li>
              <li>Collaborated with international creative teams</li>
            </ul>
          </div>
        ),
        media: [
          'https://via.placeholder.com/800x600.png?text=Panasonic+Campaign+1',
          'https://via.placeholder.com/800x600.png?text=Panasonic+Campaign+2'
        ],
        mediaType: 'image',
        link: '#'
      },
      {
        title: "Epet",
        description: "Delivered comprehensive compositing solutions for a multi-spot advertising campaign.",
        duration: "2024",
        variant: 'default',
        technologies: ["Nuke", "After Effects", "Compositing"],
        details: (
          <div className="space-y-4">
            <p>Created seamless visual effects integration across multiple TV commercials, focusing on technical excellence and creative consistency.</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Executed complex compositing workflows</li>
              <li>Maintained brand consistency across deliverables</li>
              <li>Optimized rendering pipeline for efficiency</li>
            </ul>
          </div>
        ),
        media: null,
        link: '#'
      },
      {
        title: "Moneta Bank",
        description: "Specialized in precise 3D integration and plate matching for banking service advertisements.",
        duration: "2023",
        variant: 'default',
        technologies: ["Nuke", "3D Integration", "Plate Matching"],
        details: (
          <div className="space-y-4">
            <p>Executed high-precision 3D integration work, ensuring perfect alignment and realistic interaction between CGI elements and live-action footage.</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Implemented advanced tracking solutions</li>
              <li>Achieved photorealistic integration results</li>
              <li>Optimized workflow for rapid iterations</li>
            </ul>
          </div>
        ),
        media: null,
        link: '#'
      },
      {
        title: "McDonald's",
        description: "Created a dynamic 10-second spot integrating 2D and 3D elements for brand campaign.",
        duration: "2023",
        variant: 'default',
        technologies: ["Nuke", "After Effects", "2D/3D Integration"],
        details: (
          <div className="space-y-4">
            <p>Developed a visually striking commercial combining traditional animation with 3D elements, delivering impact in a concise timeframe.</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Seamlessly blended 2D and 3D assets</li>
              <li>Optimized rendering for broadcast delivery</li>
              <li>Maintained brand guidelines throughout</li>
            </ul>
          </div>
        ),
        media: null,
        link: '#'
      },
      {
        title: "T-Mobile",
        description: "Developed animatic animations for campaign visualization and client approval.",
        duration: "2022",
        variant: 'default',
        technologies: ["After Effects", "Animation", "Storyboarding"],
        details: (
          <div className="space-y-4">
            <p>Created detailed animatic sequences to visualize complex campaign concepts, facilitating client communication and approval processes.</p>
          </div>
        ),
        media: null,
        link: '#'
      },
      {
        title: "O2",
        description: "Produced comprehensive animatic animations for telecommunications campaign planning.",
        duration: "2022",
        variant: 'default',
        technologies: ["After Effects", "Animation", "Pre-visualization"],
        details: (
          <div className="space-y-4">
            <p>Developed detailed pre-visualization animations to guide production planning and stakeholder approval.</p>
          </div>
        ),
        media: null,
        link: '#'
      },
      {
        title: "PSS",
        description: "Executed full CGI project requiring comprehensive visual effects integration.",
        duration: "2023",
        variant: 'default',
        technologies: ["Nuke", "CGI Integration", "Compositing"],
        details: (
          <div className="space-y-4">
            <p>Led the development of a complete CGI solution for corporate communications, focusing on photorealistic results and technical excellence.</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Managed complete CGI pipeline</li>
              <li>Implemented quality control procedures</li>
              <li>Delivered broadcast-ready composites</li>
            </ul>
          </div>
        ),
        media: null,
        link: '#'
      },
      {
        title: "7energy",
        description: "Specialized keying and compositing work for electricity provider's brand campaign.",
        duration: "2023",
        variant: 'default',
        technologies: ["Nuke", "Advanced Keying", "Compositing"],
        details: (
          <div className="space-y-4">
            <p>Executed complex keying solutions for electricity provider's brand campaign, delivering high-impact visuals that emphasized energy and power.</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Implemented advanced keying techniques for dynamic energy effects</li>
              <li>Created compelling visual metaphors for electrical power</li>
              <li>Developed efficient compositing workflows for tight deadlines</li>
              <li>Maintained consistent brand identity throughout campaign</li>
            </ul>
          </div>
        ),
        media: null,
        link: '#'
      },
      {
        title: "Creditas",
        description: "Provided on-set VFX supervision and led compositing team for major campaign.",
        duration: "2023",
        variant: 'featured',
        technologies: ["Nuke", "On-set Supervision", "Team Leadership"],
        details: (
          <div className="space-y-4">
            <p>Managed both on-set VFX supervision and post-production compositing, ensuring seamless workflow from capture to final delivery.</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Supervised VFX requirements during shooting</li>
              <li>Coordinated with directors and cinematographers</li>
              <li>Led post-production compositing team</li>
              <li>Established efficient workflow protocols</li>
            </ul>
          </div>
        ),
        media: null,
        link: '#'
      },
      {
        title: "Billa",
        description: "Executed precise CGI integration and plate matching for retail advertising.",
        duration: "2023",
        variant: 'default',
        technologies: ["Nuke", "CGI Integration", "Plate Matching"],
        details: (
          <div className="space-y-4">
            <p>Delivered high-quality CGI integration work for retail advertising campaign, focusing on realistic product presentation and environmental interaction.</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Implemented advanced tracking solutions</li>
              <li>Achieved seamless CGI integration</li>
              <li>Maintained consistent lighting and perspective matching</li>
            </ul>
          </div>
        ),
        media: null,
        link: '#'
      }
    ],
    experience: [
      {
        title: "Compositor",
        duration: "PFX Studio | September 2024 - October 2024",
        description: "Compositing work on the feature film Proud Princess.",
        icon: Layers,
        variant: 'featured',
        technologies: ["Nuke"],
        moreInfo: (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-2">Key Achievements:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Collaborated with compositing team for key sequences</li>
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
        icon: PenTool,
        variant: 'default',
        technologies: ["Nuke",  "After Effects" ,  "Davinci Resolve",  ],
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
        icon: Settings,
        variant: 'default',
        technologies: ["Ayon",  "OpenPype" ,  "Python",  ],
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
        icon: Monitor,
        variant: 'default',
        technologies: ["After Effects", ],
        moreInfo: null
      },
      {
        title: "Freelance Nuke Compositor",
        duration: "Let it Roll Festival | July 2023 - August 2023",
        description: "Co-created a 5-minute opening sequence using Nuke and Nuke Studio.",
        icon: Video,
        technologies: ["Nuke", "Nuke Studio"],
        moreInfo: null
       
      },
      // Add education as the last item in experience array
      {
        title: "Bachelor's Degree in VFX and Animation",
        duration: "The University of Creative Communication | 2021 - 2024",
        description: "Specialized in Visual Effects and Motion Design with focus on compositing and creative development.",
        icon: Award,
        variant: 'featured',
        technologies: ["VFX", "Motion Design", "Creative Development"],
        moreInfo: (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-2">Key Focus Areas:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Visual Effects and Compositing</li>
              <li>Motion Design Studies</li>
              <li>Digital Art & Animation</li>
              <li>History of Art</li>
            </ul>
            <motion.a
              href="https://youtu.be/M6bm6yRKshA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
              whileHover={{ scale: 1.05 }}
            >
              <span>View Bachelor Movie</span>
              <ExternalLink size={16} />
            </motion.a>
          </div>
        )
      }
    ],
    skills: [
      {
        title: "Compositing",
        icon: Layers,
        description: "Advanced compositing with expertise in node-based and layer-based workflows.",
        years: 3,
        tools: [
          "Nuke",
          "After Effects",
          "DaVinci Resolve",
        ],
        videoUrl: "https://player.vimeo.com/video/1016090207"
      },
      {
        title: "Technical Direction",
        icon: Settings,
        description: "Development of efficient pipelines and automation tools for VFX production.",
        years: 2,
        tools: [
          "Python",
          "Nuke Scripting",
        ],
        link: {
          text: "View GitHub",
          url: "https://github.com/Themolx"
        }
      },
      {
        title: "Motion Design",
        icon: Video,
        description: "Creating engaging motion graphics and animations for various media.",
        years: 3,
        tools: [
          "Adobe After Effects",
          "Blender",
          "Adobe Premiere Pro",
        ],
        link: {
          text: "View Work",
          url: "#",
          isConstructionLink: true
        }
      },
      {
        title: "VJing",
        icon: Monitor,
        description: "Live visual performance and real-time content creation.",
        years: 2,
        tools: [
          "Resolume Arena",
          "TouchDesigner",
          "Ableton Live"
        ],
        onClick: () => setActiveSection('personal')
      },
      {
        title: "Creative Development",
        icon: Code,
        description: "Creating interactive experiences and creative coding projects.",
        years: 2,
        tools: [
          "Processing",
          "Max/MSP",
          "TouchDesigner"
        ]
      }
    ]
  };

  const personalProjects = [
    {
      id: 'bachelor-thesis',
      title: "Bachelor Thesis - Experimental Film",
      description: "An experimental film exploring the intersection of digital and analog techniques, created as my bachelor thesis project.",
      icon: Clapperboard,
      variant: 'featured',
      technologies: ["Nuke", "After Effects", "Analog Photography", "Experimental Techniques"],
      moreInfo: (
        <div className="space-y-4">
          {/* Video Player */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/M6bm6yRKshA?rel=0"
              title="Bachelor Thesis Film"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <p className="text-gray-700">
            This experimental film combines digital compositing techniques with analog photography 
            and glitch art to create a unique visual experience that explores the boundaries 
            between traditional and modern mediums.
          </p>
          
          <div className="flex space-x-4">
            <motion.a
              href="https://youtu.be/M6bm6yRKshA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={16} />
              <span>Watch Film</span>
            </motion.a>
          </div>
        </div>
      ),
      alwaysExpanded: true
    },
    {
      id: 'nuke-grab-tool',
      title: "Nuke Grab Tool",
      description: "A Python script that implements Blender-style grab functionality in Nuke.",
      icon: Settings,
      variant: 'default',
      technologies: ["Python", "Nuke API", "Node Graph Tools"],
      moreInfo: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Enhanced Nuke's node graph manipulation capabilities by implementing Blender's intuitive grab tool functionality.
          </p>
          <motion.a
            href="http://www.nukepedia.com/python/nodegraph/nuke-grab-tool"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
            whileHover={{ scale: 1.05 }}
          >
            <span>View on Nukepedia</span>
            <ExternalLink size={16} />
          </motion.a>
        </div>
      ),
      alwaysExpanded: true
    },
    {
      id: 'glitch-art',
      title: "Glitch Art Experiments",
      description: "A series of experimental digital artworks exploring data corruption and visual glitches.",
      icon: Sparkles,
      variant: 'default',
      media: glitchImages,
      mediaType: "image",
      technologies: ["Digital Manipulation", "Custom Processing", "Data Moshing"],
      moreInfo: (
        <div className="space-y-4">
          <p className="text-gray-700">
            An ongoing exploration of digital artifacts and glitch aesthetics through various techniques 
            including data manipulation, signal processing, and custom algorithms.
          </p>
          <h4 className="font-semibold text-lg">Techniques Used:</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Digital signal manipulation</li>
            <li>Data moshing</li>
            <li>Custom processing algorithms</li>
            <li>File format exploitation</li>
          </ul>
        </div>
      ),
      alwaysExpanded: true
    },
    {
      id: 'analog-photography',
      title: "Analog Photography",
      description: "A collection of film photographs exploring traditional photographic processes.",
      icon: Camera,
      variant: 'default',
      media: analogImages,
      mediaType: "image",
      technologies: ["35mm Film", "Medium Format", "Darkroom Development"],
      moreInfo: (
        <div className="space-y-4">
          <p className="text-gray-700">
            A personal exploration of analog photography, combining traditional techniques with 
            experimental processes to create unique visual narratives.
          </p>
          <h4 className="font-semibold text-lg">Process & Techniques:</h4>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Film photography using various formats</li>
            <li>Manual darkroom development</li>
            <li>Alternative processing techniques</li>
            <li>Cross-processing experiments</li>
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
                className="relative aspect-video rounded-xl overflow-hidden shadow-lg group"
              >
                <motion.button
                  className="absolute inset-0 z-10 flex items-center justify-center transition-colors duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    const iframe = e.currentTarget.nextElementSibling;
                    if (!playerRef.current) {
                      playerRef.current = new Player(iframe);
                    }
                    
                    playerRef.current.getPaused().then(paused => {
                      if (paused) {
                        playerRef.current.play();
                        setIsPlaying(true);
                      } else {
                        playerRef.current.pause();
                        setIsPlaying(false);
                      }
                    });
                  }}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.div
                        key="pause"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="hidden group-hover:flex text-white"
                      >
                        <Pause size={48} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="hidden group-hover:flex text-white"
                      >
                        <Play size={48} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                
                <iframe
                  src="https://player.vimeo.com/video/1016090207?autoplay=1&loop=1&background=1&quality=1080p&muted=1"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Showreel 2024"
                />
              </motion.div>



              {/* Introduction */}
              <motion.div
                variants={animationVariants.item}
                className="prose prose-lg max-w-none"
              >
                {/* Hero Text */}
                <h1 className="text-4xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent mb-6">
                  VFX Artist & Motion Designer
                </h1>

                {/* Introduction */}
                <div className="text-lg leading-relaxed space-y-6">
                  <p className="text-gray-800">
                    <span className="font-semibold">I'm a Compositor and Technical Director</span>
                    <span> specializing in </span>
                    <span className="font-semibold">full CGI compositing</span>
                    <span>.</span>
                    
                    <br />
                    
                    <span>Based in </span>
                    <span className="font-semibold">Prague</span>
                    <span>, I focus on crafting </span>
                    <span className="font-semibold">seamless compositing solutions</span>
                    <span> and developing </span>
                    <span className="font-semibold">efficient pipelines</span>
                    <span> for animated features.</span>
                    
                    <br />
                    
                    <span>My experience spans across </span>
                    <span className="font-semibold">feature films</span>
                    <span>, </span>
                    <span className="font-semibold">commercials</span>
                    <span>, and </span>
                    <span className="font-semibold">music videos</span>
                    <span>, where I've contributed to numerous high-profile projects in both </span>
                    <span className="font-semibold">2D</span>
                    <span> and </span>
                    <span className="font-semibold">3D animation</span>
                    <span>.</span>
                  </p>

                  {/* Core Expertise */}
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Expertise</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                      {/* Primary Skills */}
                      <li className="col-span-full flex items-center space-x-3 p-4 bg-white rounded-xl border-2 border-black shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="p-2 bg-black rounded-lg">
                          <Layers className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="font-semibold block text-gray-900">Advanced Compositing</span>
                          <span className="text-sm text-gray-600">Expert in Nuke with focus on full CGI animation</span>
                        </div>
                      </li>

                      <li className="col-span-full flex items-center space-x-3 p-4 bg-white rounded-xl border-2 border-black shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="p-2 bg-black rounded-lg">
                          <Code className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="font-semibold block text-gray-900">Technical Direction</span>
                          <span className="text-sm text-gray-600">Pipeline development & Python automation for VFX workflows</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Professional Experience Highlight */}
                  <p className="text-gray-800">
                    <span>My professional journey encompasses </span>
                    <span className="font-semibold">compositing for animated features</span>
                    <span>, </span>
                    <span className="font-semibold">technical direction</span>
                    <span> for animation studios, and </span>
                    <span className="font-semibold">pipeline development</span>
                    <span> for CGI productions.</span>
                    
                    <br />
                    
                    <span>I've also contributed to </span>
                    <span className="font-semibold">major music festivals</span>
                    <span> and work as a </span>
                    <span className="font-semibold">freelance Motion Graphic Designer</span>
                    <span>.</span>
                  </p>

                  {/* Technical Skills & Interests */}
                  <p className="text-gray-800">
                    <span>Beyond my core expertise in </span>
                    <span className="font-semibold">Nuke compositing</span>
                    <span> and </span>
                    <span className="font-semibold">pipeline development</span>
                    <span>,</span>
                    
                    <br />
                    
                    <span>I explore </span>
                    <span className="font-semibold">experimental animation</span>
                    <span>, </span>
                    <span className="font-semibold">glitch art</span>
                    <span>, and the </span>
                    <span className="font-semibold">fusion of analog and digital media</span>
                    <span>.</span>
                    
                    <br />
                    
                    <span>I'm also experienced in </span>
                    <span className="font-semibold">VJing</span>
                    <span> using </span>
                    <span className="font-semibold">real-time visual tools</span>
                    <span>, constantly pushing the boundaries of visual storytelling.</span>
                  </p>

                  {/* Closing Statement */}
                  <p className="text-gray-800 mt-8 text-lg italic border-l-4 border-black pl-4">
                    <span>I'm always eager to learn and grow, regularly attending </span>
                    <span className="font-semibold">industry conferences</span>
                    <span> like </span>
                    <span className="font-semibold">FMX</span>
                    <span> and </span>
                    <span className="font-semibold">Anifilm</span>
                    <span>.</span>
                    
                    <br />
                    
                    <span>Currently </span>
                    <span className="font-semibold">open to new opportunities</span>
                    <span> and </span>
                    <span className="font-semibold">willing to relocate</span>
                    <span>,</span>
                    
                    <br />
                    
                    <span>I combine </span>
                    <span className="font-semibold">technical expertise</span>
                    <span> with </span>
                    <span className="font-semibold">creative vision</span>
                    <span> to deliver </span>
                    <span className="font-semibold">exceptional visual effects solutions</span>
                    <span>.</span>
                  </p>
                </div>
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
            {/* Main Grid */}
            <motion.div
              variants={animationVariants.container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
            >
              {experienceData.commercial.map((project, index) => (
                <motion.div
                  key={index}
                  variants={animationVariants.item}
                  className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 p-4"
                >
                  {/* Added Circle */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-black rounded-full flex-shrink-0" />
                    <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-1">{project.title}</h3>
                  </div>
                  
                  {/* Duration */}
                  <p className="text-xs text-gray-500 mb-2">{project.duration}</p>
                  
                  {/* Description - Limited to 2 lines */}
                  <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mb-3">{project.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Professional Footer Section */}
            <motion.div
              variants={animationVariants.fadeInUp}
              className="mt-12 border-t border-gray-200 pt-8"
            >
              <div className="grid md:grid-cols-3 gap-8">
                {/* Statistics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Project Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/5 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-black">20+</div>
                      <div className="text-sm text-gray-600">Clients</div>
                    </div>
                    <div className="bg-black/5 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-black">50+</div>
                      <div className="text-sm text-gray-600">Projects</div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Services</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <ChevronRight size={16} className="text-black" />
                      <span>Visual Effects & Compositing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight size={16} className="text-black" />
                      <span>Motion Graphics Design</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight size={16} className="text-black" />
                      <span>Technical Direction</span>
                    </li>
                  </ul>
                </div>

                {/* Contact CTA */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Work Together</h3>
                  <p className="text-sm text-gray-600">
                    Looking for professional VFX services? Let's discuss your next project.
                  </p>
                  <motion.a
                    href="mailto:martintomek.vfx@gmail.com"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
                  >
                    <Mail size={16} />
                    <span>Get in Touch</span>
                  </motion.a>
                </div>
              </div>
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
                {[
                  {
                    title: "Compositing",
                    icon: Layers,
                    description: "Advanced compositing with expertise in node-based and layer-based workflows.",
                    years: 3,
                    tools: [
                      "Nuke",
                      "After Effects",
                      "DaVinci Resolve",
                    ],
                    videoUrl: "https://player.vimeo.com/video/1016090207"
                  },
                  {
                    title: "Technical Direction",
                    icon: Settings,
                    description: "Development of efficient pipelines and automation tools for VFX production.",
                    years: 2,
                    tools: [
                      "Python",
                      "Nuke Scripting",
                    ],
                    link: {
                      text: "View GitHub",
                      url: "https://github.com/Themolx"
                    }
                  },
                  {
                    title: "Motion Design",
                    icon: Video,
                    description: "Creating engaging motion graphics and animations for various media.",
                    years: 3,
                    tools: [
                      "Adobe After Effects",
                      "Blender",
                      "Adobe Premiere Pro",
                    ],
                    link: {
                      text: "View Work",
                      url: "#",
                      isConstructionLink: true
                    }
                  },
                  {
                    title: "VJing",
                    icon: Monitor,
                    description: "Live visual performance and real-time content creation.",
                    years: 2,
                    tools: [
                      "Resolume Arena",
                      "TouchDesigner",
                      "Ableton Live"
                    ],
                    onClick: () => setActiveSection('personal')
                  },
                  {
                    title: "Creative Development",
                    icon: Code,
                    description: "Creating interactive experiences and creative coding projects.",
                    years: 2,
                    tools: [
                      "Processing",
                      "Max/MSP",
                      "TouchDesigner"
                    ]
                  }
                ].map((skill, index) => (
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

  // Function to handle scroll to content
  const handleScrollToContent = () => {
    const contentElement = document.querySelector('main'); // Assuming 'main' is the content area
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        onClick={handleScrollToContent}
      >
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mb-6"
          >
            <div className="relative w-20 h-20 mb-4 group">
              <img
                src={profilePicture}
                alt="Profile"
                className="rounded-full object-cover w-full h-full"
              />
              <div
                className="absolute -inset-0.5 rounded-full bg-gradient-to-r 
                  from-black to-gray-600 opacity-0 group-hover:opacity-20 
                  transition-opacity duration-200"
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

          {/* Footer */}
          <motion.div
            variants={animationVariants.item}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.5 }}
            className="mt-auto pt-6 border-t border-gray-200 hidden md:block"
          >
            <p className="text-sm text-gray-500">Available for new opportunities</p>
            <p className="text-sm text-gray-500 mt-1">
              Willing to relocate 
            </p>
            <motion.a
              href="#"
              className="flex items-center mt-4 text-gray-600 hover:text-black 
                transition-colors group"
              whileHover={{ scale: 1.05 }}
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

export default App;
