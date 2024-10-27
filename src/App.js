import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Camera,
  Palette,
  Terminal,
  Monitor
} from 'lucide-react';

// Glitch Art Images
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

// Analog Photography Images
const analogImages = [
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/foto/1.jpg',
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/foto/2.jpg',
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/foto/3.jpg',
  'https://raw.githubusercontent.com/Themolx/WEB/0b3bbdc1f4fead85162a2cf826e439b9621dd400/assets/foto/4.jpg',
];

// Profile picture
const profilePicture =
  'https://avatars.githubusercontent.com/u/183303841?s=400&u=15ae10f7b65b15a10c0ddd7a9d12efbb608014f4&v=4';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const sidebar = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } }
};

const expandAnimation = {
  initial: { height: 0, opacity: 0 },
  animate: { 
    height: "auto", 
    opacity: 1,
    transition: { 
      height: {
        duration: 0.4,
        ease: [0.04, 0.62, 0.23, 0.98]
      },
      opacity: { duration: 0.25 }
    }
  },
  exit: { 
    height: 0, 
    opacity: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 }
    }
  }
};

// Section Title Component
const SectionTitle = ({ children }) => (
  <motion.h1 
    className="text-4xl font-bold text-gray-900 mb-8"
    variants={fadeInUp}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.h1>
);

// Enhanced ProjectCard Component
const ProjectCard = ({
  title,
  description,
  duration,
  moreInfo,
  media,
  mediaType,
  alwaysExpanded = false,
  className = '',
  isSelected,
  onSelect,
  onClose,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isHovered && !alwaysExpanded) {
      const timer = setTimeout(() => setIsExpanded(false), 300);
      return () => clearTimeout(timer);
    } else {
      setIsExpanded(true);
    }
  }, [isHovered, alwaysExpanded]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`bg-white border border-gray-200 rounded-xl p-6 ${className} ${
        !alwaysExpanded && 'cursor-pointer hover:shadow-lg'
      }`}
      onClick={() => !alwaysExpanded && onSelect && onSelect()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div layout className="flex flex-col">
        <div className="flex justify-between items-start">
          <motion.div layout>
            <motion.h3 
              layout
              className="text-xl font-semibold text-gray-900"
            >
              {title}
            </motion.h3>
            {duration && (
              <motion.p 
                layout
                className="text-sm text-gray-500 mt-1"
              >
                {duration}
              </motion.p>
            )}
          </motion.div>
          {isSelected && onClose && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </motion.button>
          )}
        </div>

        <motion.p 
          layout
          className="text-gray-600 mt-4"
        >
          {description}
        </motion.p>

        <AnimatePresence>
          {(isExpanded || alwaysExpanded || isSelected) && (moreInfo || media) && (
            <motion.div
              variants={expandAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              className="overflow-hidden"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                {media && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {media.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-lg overflow-hidden"
                      >
                        {mediaType === 'image' ? (
                          <img 
                            src={item}
                            alt={`${title} ${index + 1}`}
                            className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <video
                            src={item}
                            controls
                            className="w-full"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
                {moreInfo}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// NavItem Component
const NavItem = ({ id, icon: Icon, label, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02, x: 5 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-300 ${
      isActive
        ? 'bg-black text-white'
        : 'text-gray-600 hover:text-black hover:bg-gray-100'
    }`}
  >
    <Icon size={20} className="min-w-[20px]" />
    <span className="ml-3 text-sm font-medium">{label}</span>
  </motion.button>
);

// ContactInfo Component
const ContactInfo = ({ icon: Icon, text, href }) => (
  <motion.a
    whileHover={{ scale: 1.05, x: 5 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center text-gray-600 hover:text-black transition-colors"
  >
    <Icon size={16} className="mr-2" />
    <span className="text-sm">{text}</span>
  </motion.a>
);

// Main HomePage Component
const HomePage = () => {
  const [activeSection, setActiveSection] = useState('summary');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Navigation sections
  const sections = [
    { id: 'summary', icon: User, label: 'Summary' },
    { id: 'film', icon: Film, label: 'Film Projects' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'personal', icon: Clapperboard, label: 'Personal Projects' }
  ];

  // Film projects data
  const filmProjects = [
    {
      id: 'proud-princess',
      title: 'Proud Princess',
      duration: 'PFX Studio | September 2024 - October 2024',
      description: 'Lead compositor for this major feature film project.',
      details: (
        <div className="space-y-4">
          <section>
            <h4 className="font-semibold text-lg mb-2">Project Overview</h4>
            <p className="text-gray-700">
              Collaborated with the VFX team to integrate visual effects seamlessly 
              into live-action footage, ensuring high-quality deliverables under tight deadlines.
            </p>
          </section>
          <section>
            <h4 className="font-semibold text-lg mb-2">Key Responsibilities</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Led compositing team for key sequences</li>
              <li>Developed and maintained shot consistency</li>
              <li>Optimized workflow for tight delivery schedule</li>
              <li>Collaborated with directors for creative decisions</li>
            </ul>
          </section>
        </div>
      )
    },
    {
      id: 'rosa-dara',
      title: 'Rosa & Dara',
      duration: 'Incognito Studio | August 2021 - Present',
      description: 'Lead compositor and technical director for 3D animated feature film.',
      details: (
        <div className="space-y-4">
          <section>
            <h4 className="font-semibold text-lg mb-2">Project Scope</h4>
            <p className="text-gray-700">
              Full-length 3D animated feature film requiring complex character integration
              and extensive pipeline development for efficient workflow.
            </p>
          </section>
          <section>
            <h4 className="font-semibold text-lg mb-2">Technical Achievements</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Developed custom Nuke tools for pipeline optimization</li>
              <li>Implemented automated quality control systems</li>
              <li>Created render farm integration solutions</li>
              <li>Established collaborative workflow procedures</li>
            </ul>
          </section>
        </div>
      )
    }
  ];

  // Experience data
  const experienceData = [
    {
      title: "Mid-Level Compositor",
      duration: "PFX Studio | September 2024 - October 2024",
      description: "Lead compositing work on the feature film Proud Princess.",
      moreInfo: (
        <div className="space-y-4">
          <h4 className="font-semibold mb-2">Key Achievements:</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Led compositing team for key sequences</li>
            <li>Established shot consistency guidelines</li>
            <li>Optimized delivery pipeline</li>
          </ul>
        </div>
      )
    },
    {
      title: "Nuke Compositor & VFX Supervisor",
      duration: "Incognito Studio | August 2021 - Present",
      description: "Provided VFX services for various high-profile clients.",
      moreInfo: (
        <div className="space-y-2">
          <h4 className="font-semibold mb-2">Clients:</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed grid grid-cols-2 gap-2">
            <li>Panasonic Japan</li>
            <li>Moneta Bank</li>
            <li>McDonald's</li>
            <li>Ketoknoflik</li>
            <li>PSS</li>
            <li>T-Mobile</li>
            <li>O2</li>
            <li>7energy</li>
            <li>Billa</li>
            <li>Epet</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            VFX Supervisor for the Creditas project.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Working on "Rosa & Dara a jejich velké letní dobrodružství", a 3D feature film.
          </p>
        </div>
      )
    },
    {
      title: "Freelance Motion Graphic Designer",
      duration: "VIG Production | October 2023 - Present",
      description: "Created motion graphics for various client projects."
    },
    {
      title: "Freelance Nuke Compositor",
      duration: "Let it Roll Festival | July 2023 - August 2023",
      description: "Co-created a 5-minute opening sequence using Nuke and Nuke Studio."
    }
  ];

  // Skills data
  const skillsData = [
    {
      title: "Compositing",
      description: `• Nuke (3+ years)
• After Effects (8+ years)
• DaVinci Resolve
• Mocha Pro`,
      moreInfo: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Advanced compositing with expertise in both node-based and layer-based workflows.
            Specialized in complex VFX integration and color grading.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Advanced rotoscoping and tracking</li>
            <li>Complex compositing workflows</li>
            <li>Color grading and matching</li>
            <li>Shot cleanup and restoration</li>
          </ul>
        </div>
      )
    },
    {
      title: "Technical Direction",
      description: `• Python Scripting
• Pipeline Development
• Workflow Optimization
• Custom Tool Creation`,
      moreInfo: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Development of efficient pipelines and automation tools for VFX production.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Pipeline architecture design</li>
            <li>Custom tool development</li>
            <li>Workflow automation</li>
            <li>Technical documentation</li>
          </ul>
        </div>
      )
    },
    {
      title: "Motion Design",
      description: `• Adobe Creative Suite
• Cinema 4D
• Motion Graphics
• Animation Principles`,
      moreInfo: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Creating engaging motion graphics and animations for various media.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>2D and 3D animation</li>
            <li>Brand identity animation</li>
            <li>Title sequences</li>
            <li>Animated infographics</li>
          </ul>
        </div>
      )
    },
    {
      title: "Creative Development",
      description: `• VJing (Resolume Arena)
• TouchDesigner
• Experimental Animation
• Glitch Art`,
      moreInfo: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Pushing boundaries with experimental techniques and live visual performance.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Real-time visual performance</li>
            <li>Interactive installations</li>
            <li>Experimental animation techniques</li>
            <li>Digital art creation</li>
          </ul>
        </div>
      )
    }
  ];

  // Render main content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'summary':
        return (
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8"
          >
            <SectionTitle>
              Hello, I'm <span className="text-indigo-600">Martin Tomek</span>
            </SectionTitle>
            
            <motion.div 
              variants={fadeInUp}
              className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg"
            >
              <iframe
                src="https://player.vimeo.com/video/1016090207"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="prose prose-lg max-w-none"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm a <strong>Mid-Level Compositor</strong> and{' '}
                <strong>VFX Artist</strong> based in{' '}
                <strong>Prague, Czech Republic</strong>, specializing in creating
                seamless visual effects and compelling motion graphics.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With over <strong>three years of experience</strong> in the industry,
                I've contributed to various high-profile projects and am always eager
                to take on new challenges.
              </p>
            </motion.div>

            <motion.button
              variants={fadeInUp}
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
        );

      case 'film':
        return (
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <SectionTitle>Film Projects</SectionTitle>
            
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <AnimatePresence>
                {filmProjects.map((project) => (
                  <motion.div key={project.id} layoutId={`project-${project.id}`}>
                    <ProjectCard
                      {...project}
                      isSelected={selectedProjectId === project.id}
                      onSelect={() => setSelectedProjectId(project.id)}
                      onClose={() => setSelectedProjectId(null)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence>
              {selectedProjectId && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-40"
                    onClick={() => setSelectedProjectId(null)}
                  />
                  <motion.div
                    layoutId={`project-${selectedProjectId}`}
                    className="fixed inset-4 md:inset-20 z-50 bg-white rounded-xl overflow-y-auto"
                  >
                    <ProjectCard
                      {...filmProjects.find(p => p.id === selectedProjectId)}
                      isSelected={true}
                      onClose={() => setSelectedProjectId(null)}
                    />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 'skills':
        return (
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8"
          >
            <SectionTitle>Skills & Expertise</SectionTitle>
            
            <motion.div 
              variants={fadeInUp}
              className="space-y-6"
            >
              {skillsData.map((skill, index) => (
                <ProjectCard
                  key={index}
                  {...skill}
                />
              ))}
            </motion.div>
          </motion.div>
        );

      case 'experience':
        return (
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8"
          >
            <SectionTitle>Professional Experience</SectionTitle>
            
            <motion.div 
              variants={fadeInUp}
              className="space-y-6"
            >
              {experienceData.map((exp, index) => (
                <ProjectCard
                  key={index}
                  {...exp}
                />
              ))}
              
              <ProjectCard
                title="Education"
                description="The University of Creative Communication, Prague - Degree in VFX and Animation"
              />
            </motion.div>
          </motion.div>
        );

      case 'personal':
        return (
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8"
          >
            <SectionTitle>Personal Projects</SectionTitle>

            {/* Bachelor Movie */}
            <ProjectCard
              title="Bachelor Movie"
              description="A unique fusion of 3D animation, AI, and analog techniques creating a distinctive narrative experience."
              moreInfo={
                <div className="space-y-4">
                  <motion.a
                    href="https://youtu.be/M6bm6yRKshA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
                    whileHover={{ x: 5 }}
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink size={16} />
                  </motion.a>
                </div>
              }
              alwaysExpanded={true}
            />

            {/* Glitch Art */}
            <ProjectCard
              title="Glitch Art"
              description="Experimental glitch art created through various digital manipulation techniques."
              media={glitchImages}
              mediaType="image"
              moreInfo={
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Techniques:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Digital signal manipulation</li>
                    <li>Data moshing</li>
                    <li>Custom processing algorithms</li>
                  </ul>
                </div>
              }
              alwaysExpanded={true}
            />

            {/* Analog Photography */}
            <ProjectCard
              title="Analog Photography"
              description="Capturing moments through analog lenses and developing alternative film processes."
              media={analogImages}
              mediaType="image"
              moreInfo={
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Process:</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Film photography using various camera models</li>
                    <li>Darkroom development techniques</li>
                    <li>Creative photo manipulation</li>
                  </ul>
                </div>
              }
              alwaysExpanded={true}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 flex flex-col md:flex-row"
    >
      {/* Sidebar */}
      <motion.nav
        variants={sidebar}
        initial="initial"
        animate="animate"
        className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 p-6"
      >
        <div className="flex flex-col h-full">
          {/* Profile Picture */}
          <motion.div 
            className="mb-6 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <img
              src={profilePicture}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Martin Tomek</h2>
              <p className="text-sm text-gray-500 mt-1">VFX Artist & Motion Designer</p>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="mb-6 space-y-2"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <ContactInfo icon={MapPin} text="Prague, Czech Republic" />
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
              href="https://www.linkedin.com/in/martin-tomek-1762b8196/"
            />
          </motion.div>

          {/* Navigation */}
          <motion.div 
            className="space-y-2"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {sections.map((section) => (
              <NavItem
                key={section.id}
                {...section}
                isActive={activeSection === section.id}
                onClick={() => setActiveSection(section.id)}
              />
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div 
            className="mt-auto pt-6 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-gray-500">Available for new opportunities</p>
            <p className="text-sm text-gray-500 mt-1">
              Willing to relocate to Canary Islands
            </p>
            <motion.a
              href="#"
              className="flex items-center mt-4 text-gray-600 hover:text-black transition-colors"
              whileHover={{ x: 5 }}
            >
              <Download size={16} className="mr-2" />
              <span className="text-sm">Download Resume</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
      
      {/* Scroll to top button that appears when scrolling down */}
      <AnimatePresence>
        {typeof window !== 'undefined' && window.pageYOffset > 300 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-3 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-chevron-up"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </motion.svg>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HomePage;