// pages/index.js
import React, { useState, useRef, useEffect } from 'react';
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
} from 'lucide-react';

// Placeholder videos for personal projects
const placeholderVideos = [
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://www.w3schools.com/html/movie.mp4',
];

// Placeholder images for Analog Photography
const placeholderImages = [
  'https://via.placeholder.com/400x300.png?text=Analog+Photo+1',
  'https://via.placeholder.com/400x300.png?text=Analog+Photo+2',
];

// Your profile picture
const profilePicture =
  'https://avatars.githubusercontent.com/u/183303841?s=400&u=15ae10f7b65b15a10c0ddd7a9d12efbb608014f4&v=4';

/**
 * ProjectCard Component
 * Handles individual project display, hover effects, and media controls.
 */
const ProjectCard = ({
  title,
  description,
  duration,
  moreInfo,
  media,
  mediaType, // 'video' or 'image'
  alwaysExpanded = false, // Controls expansion behavior
  className = '', // Allows additional class names for styling
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const mediaRefs = useRef([]);

  // Pause all media except the one being played
  const handlePlay = (currentIndex) => {
    mediaRefs.current.forEach((mediaElement, index) => {
      if (mediaElement && index !== currentIndex) {
        if (mediaType === 'video') {
          mediaElement.pause();
        }
      }
    });
  };

  // Pause all media when hover ends (if not always expanded)
  useEffect(() => {
    if (!isHovered && !alwaysExpanded) {
      mediaRefs.current.forEach((mediaElement) => {
        if (mediaElement) {
          if (mediaType === 'video') {
            mediaElement.pause();
          }
        }
      });
    }
  }, [isHovered, alwaysExpanded, mediaType]);

  // Determine whether to show additional content
  const showAdditionalContent = alwaysExpanded || isHovered;

  // For Skills page hover effect
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 ${className}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setShowDetails(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowDetails(false);
      }}
    >
      <div className="flex items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
          {duration && <p className="text-sm text-gray-500 mb-1">{duration}</p>}
        </div>
      </div>
      <p className="text-gray-600 whitespace-pre-line mt-2">{description}</p>

      {/* Additional Content */}
      {showAdditionalContent && moreInfo && (
        <div className="mt-4">
          {/* Display media based on type */}
          {media && (
            <div className="mb-4">
              {mediaType === 'video' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {media.map((mediaSrc, index) => (
                    <video
                      key={index}
                      src={mediaSrc}
                      controls
                      className="w-full rounded-lg"
                      ref={(el) => (mediaRefs.current[index] = el)}
                      onPlay={() => handlePlay(index)}
                    />
                  ))}
                </div>
              ) : mediaType === 'image' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {media.map((mediaSrc, index) => (
                    <img
                      key={index}
                      src={mediaSrc}
                      alt={`${title} ${index + 1}`}
                      className="w-full rounded-lg object-cover"
                    />
                  ))}
                </div>
              ) : null}
            </div>
          )}
          {/* Display additional information */}
          {moreInfo}
        </div>
      )}

      {/* Skills page hover details */}
      {showDetails && !moreInfo && (
        <div className="mt-4">
          <p className="text-gray-700 leading-relaxed">
            Experience and proficiency details can be added here.
          </p>
        </div>
      )}
    </div>
  );
};

/**
 * Main App Component
 */
const HomePage = () => {
  const [activeSection, setActiveSection] = useState('summary');

  // Update the page title on component mount
  useEffect(() => {
    document.title = 'Martin Tomek - Portfolio';
  }, []);

  // Navigation items
  const sections = [
    { id: 'summary', icon: User, label: 'Summary' },
    { id: 'film', icon: Film, label: 'Film Projects' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'personal', icon: Clapperboard, label: 'Personal Projects' },
  ];

  /**
   * NavItem Component
   * Handles individual navigation button styling and functionality.
   */
  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveSection(id)}
      className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-100 ${
        activeSection === id
          ? 'bg-black text-white hover:bg-black/90'
          : 'text-gray-600 hover:text-black'
      }`}
    >
      <Icon size={20} className="min-w-[20px]" />
      <span className="ml-3 text-sm font-medium whitespace-nowrap">{label}</span>
    </button>
  );

  /**
   * ContactInfo Component
   * Displays contact information with icons.
   */
  const ContactInfo = ({ icon: Icon, text, href }) => (
    <a
      href={href}
      className="flex items-center text-gray-600 hover:text-black transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size={16} className="mr-2" />
      <span className="text-sm">{text}</span>
    </a>
  );

  /**
   * Renders content based on the active section.
   */
  const renderContent = () => {
    switch (activeSection) {
      case 'summary':
        return (
          <div className="space-y-6">
            {/* Showreel Video */}
            <div className="mb-8">
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg">
                <iframe
                  src="https://player.vimeo.com/video/1016090207"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Hello, I'm <span className="text-indigo-600">Martin Tomek</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
              I'm a <strong>Mid-Level Compositor</strong> and{' '}
              <strong>VFX Artist</strong> based in{' '}
              <strong>Prague, Czech Republic</strong>, with a passion for{' '}
              <strong>visual storytelling</strong> and a keen eye for detail. With over{' '}
              <strong>three years of experience</strong> in compositing and motion graphics, I
              specialize in using <strong>Nuke</strong> and <strong>After Effects</strong> to
              create seamless visual effects.
            </p>
            <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
              I'm always eager to embrace new challenges and opportunities, and I'm willing to
              relocate, with a particular interest in the <strong>Canary Islands</strong>.
            </p>
            {/* Contact Me Button */}
            <button
              onClick={() => {
                window.location.href = 'mailto:martintomek.vfx@gmail.com';
              }}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Contact Me
            </button>
          </div>
        );
      case 'film':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Film Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProjectCard
                title="Proud Princess"
                duration="PFX Studio | September 2024 - October 2024"
                description="- Compositing work on the feature film."
                moreInfo={
                  <div className="space-y-2">
                    <h4 className="font-semibold mb-2">Project Details:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Collaborated with the VFX team to integrate visual effects seamlessly into
                      live-action footage, ensuring high-quality deliverables under tight deadlines.
                    </p>
                  </div>
                }
                media={null}
                mediaType={null}
              />
              <ProjectCard
                title="Rosa & Dara a jejich velké letní dobrodružství"
                duration="Incognito Studio | August 2021 - Present"
                description="- Compositor and developer for a 3D feature film."
                moreInfo={
                  <div className="space-y-2">
                    <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
                      <li>Lead compositor for character integration scenes.</li>
                      <li>Developed custom Nuke tools for pipeline optimization.</li>
                      <li>Collaborated with 3D artists for seamless integration.</li>
                    </ul>
                  </div>
                }
                media={null}
                mediaType={null}
              />
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h1>
            <div className="space-y-6">
              <ProjectCard
                title="Proud Princess - Compositor"
                duration="PFX Studio | September 2024 - October 2024"
                description="- Worked on compositing for the feature film."
                moreInfo={null}
                media={null}
                mediaType={null}
              />
              <ProjectCard
                title="Nuke Compositor & VFX Supervisor"
                duration="Incognito Studio | August 2021 - Present"
                description="- Provided VFX services for various high-profile clients."
                moreInfo={
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
                    <p className="text-gray-700 leading-relaxed">
                      VFX Supervisor for the Creditas project.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Working on "Rosa & Dara a jejich velké letní dobrodružství", a 3D feature film.
                    </p>
                  </div>
                }
                media={null}
                mediaType={null}
              />
              <ProjectCard
                title="Freelance Motion Graphic Designer"
                duration="VIG Production | October 2023 - Present"
                description="- Created motion graphics for various client projects."
                moreInfo={null}
                media={null}
                mediaType={null}
              />
              <ProjectCard
                title="Freelance Nuke Compositor"
                duration="Let it Roll Festival | July 2023 - August 2023"
                description="- Co-created a 5-minute opening sequence using Nuke and Nuke Studio."
                moreInfo={null}
                media={null}
                mediaType={null}
              />
              {/* Education Section with Border */}
              <ProjectCard
                title="Education"
                description="- The University of Creative Communication, Prague - Degree in VFX and Animation"
                moreInfo={null}
                media={null}
                mediaType={null}
              />
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Skills</h1>
            <div className="grid grid-cols-1 gap-6">
              <ProjectCard
                title="Software Proficiency"
                description={`• Nuke (3 years)
• After Effects (8 years)
• DaVinci Resolve
• Adobe Creative Suite
• Resolume Arena
• TouchDesigner`}
                moreInfo={
                  <p className="text-gray-700 leading-relaxed">
                    Experienced in creating complex visual effects and motion graphics using these
                    software tools.
                  </p>
                }
                media={null}
                mediaType={null}
              />
              <ProjectCard
                title="Pipeline & Workflow"
                description={`• OpenPype
• Ayon
• On-set VFX Supervision
• 2D and 3D Animation Integration`}
                moreInfo={
                  <p className="text-gray-700 leading-relaxed">
                    Skilled in optimizing production pipelines and integrating various animation
                    techniques.
                  </p>
                }
                media={null}
                mediaType={null}
              />
              <ProjectCard
                title="VJing"
                description={`• Resolume Arena
• TouchDesigner`}
                moreInfo={
                  <p className="text-gray-700 leading-relaxed">
                    Experience in live visual performances and interactive installations.
                  </p>
                }
                media={null}
                mediaType={null}
              />
              <ProjectCard
                title="Programming and Technical Direction"
                description={`• Python
• JavaScript`}
                moreInfo={
                  <p className="text-gray-700 leading-relaxed">
                    Developed tailored scripts and tools for pipeline optimization in VFX production,
                    enhancing efficiency and productivity.
                  </p>
                }
                media={null}
                mediaType={null}
              />
              <ProjectCard
                title="AI"
                description={`• Understanding of AI and machine learning
• Huge interest in new technology`}
                moreInfo={
                  <p className="text-gray-700 leading-relaxed">
                    Exploring the integration of AI and machine learning into creative workflows.
                  </p>
                }
                media={null}
                mediaType={null}
              />
            </div>
          </div>
        );
      case 'personal':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Personal Projects</h1>

            {/* Bachelor Movie */}
            <ProjectCard
              title="Bachelor Movie - Combining 3D Animation, AI, and Analog"
              description="Created my own movie combining 3D animation, AI, and analog techniques to achieve unique visual effects."
              moreInfo={
                <div className="space-y-2">
                  <a
                    href="https://youtu.be/M6bm6yRKshA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    Watch the movie on YouTube
                  </a>
                  <p className="text-gray-700 leading-relaxed">
                    This project explores the fusion of traditional and modern techniques,
                    integrating AI-generated content, 3D animations, and analog processes to create
                    a unique narrative experience.
                  </p>
                </div>
              }
              media={null}
              mediaType={null}
              alwaysExpanded={true}
              className="col-span-1 md:col-span-2"
            />

            {/* Nuke Grab Tool */}
            <ProjectCard
              title="Nuke Grab Tool"
              description="Implemented the Blender Grab Tool within Nuke, enhancing node movement capabilities."
              moreInfo={
                <div className="space-y-2">
                  <a
                    href="http://www.nukepedia.com/python/nodegraph/nuke-grab-tool"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    View the tool on Nukepedia
                  </a>
                  <p className="text-gray-700 leading-relaxed">
                    This script implements the whole Blender Grab Tool within Nuke, bringing its
                    full node movement capabilities to your compositing workflow.
                  </p>
                </div>
              }
              media={null}
              mediaType={null}
              alwaysExpanded={true}
              className="col-span-1 md:col-span-2"
            />

            {/* Experimental Animation & Glitch Art */}
            <ProjectCard
              title="Experimental Animation & Glitch Art"
              description="Playing and experimenting with AI image and video, LLMs, and creating experimental animations and glitch art."
              moreInfo={
                <div className="space-y-2">
                  <h4 className="font-semibold mb-2">Activities:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
                    <li>Experimenting with AI tools for image and video generation</li>
                    <li>Creating glitch art through analog and digital methods</li>
                    <li>Integrating AI and machine learning into creative workflows</li>
                  </ul>
                </div>
              }
              media={placeholderVideos}
              mediaType="video"
              alwaysExpanded={true}
              className="col-span-1 md:col-span-2"
            />

            {/* Analog Photography */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProjectCard
                title="Analog Photography"
                description="Capturing moments through analog lenses and developing alternative film processes."
                moreInfo={
                  <div className="space-y-2">
                    <h4 className="font-semibold mb-2">Activities:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
                      <li>Film photography using various camera models</li>
                      <li>Darkroom development techniques</li>
                      <li>Creative photo manipulation</li>
                    </ul>
                  </div>
                }
                media={placeholderImages}
                mediaType="image"
                alwaysExpanded={true}
                className="col-span-1 md:col-span-2"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <nav className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 p-6">
        <div className="flex flex-col md:h-full">
          {/* Profile Picture */}
          <div className="mb-6 flex items-center">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Martin Tomek</h2>
              <p className="text-sm text-gray-500 mt-1">Motion Designer & VFX Artist</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-6 space-y-2">
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
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            {sections.map((section) => (
              <NavItem
                key={section.id}
                id={section.id}
                icon={section.icon}
                label={section.label}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">Available for new opportunities</p>
            <p className="text-sm text-gray-500 mt-1">
              Willing to relocate to Canary Islands
            </p>
            <a
              href="#"
              className="flex items-center mt-4 text-gray-600 hover:text-black transition-colors"
            >
              <Download size={16} className="mr-2" />
              <span className="text-sm">Download Resume</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-[600px]">
        {renderContent()}
      </main>
    </div>
  );
};

export default HomePage;
