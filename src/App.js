// App.js
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

// Placeholder video URL for your showreel
const showreelVideo = 'https://www.w3schools.com/html/mov_bbb.mp4'; // Replace with your showreel URL

// Placeholder videos for personal projects
const placeholderVideos = [
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://www.w3schools.com/html/movie.mp4',
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://www.w3schools.com/html/movie.mp4',
];

// Placeholder images for Analog Photography
const placeholderImages = [
  'https://via.placeholder.com/400x300.png?text=Analog+Photo+1',
  'https://via.placeholder.com/400x300.png?text=Analog+Photo+2',
  'https://via.placeholder.com/400x300.png?text=Analog+Photo+3',
  'https://via.placeholder.com/400x300.png?text=Analog+Photo+4',
];

// Black square placeholder for logos
const blackSquare = 'https://via.placeholder.com/150/000000/FFFFFF?text=Logo';

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
  thumbnail, // Thumbnail image or video
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
        {thumbnail && (
          <div className="mr-4">
            <img
              src={thumbnail}
              alt={`${title} Thumbnail`}
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>
        )}
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
                  {media.map((imageSrc, index) => (
                    <img
                      key={index}
                      src={imageSrc}
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
            {/* Add any additional details you want to show on hover */}
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
const App = () => {
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
              <video
                src={showreelVideo}
                controls
                autoPlay
                muted
                loop
                className="w-full rounded-xl shadow-lg"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Hello, I'm <span className="text-indigo-600">Martin Tomek</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
              I'm a <strong>Mid-Level Compositor</strong> and{' '}
              <strong>Technical Director (TD)</strong> based in{' '}
              <strong>Prague, Czech Republic</strong>, with a passion for{' '}
              <strong>visual storytelling</strong> and a keen eye for detail. With over{' '}
              <strong>three years of experience</strong> in compositing, pipeline development, and
              motion graphics, I specialize in using <strong>Nuke</strong> for creating seamless
              visual effects and developing tailored VFX tools and scripts.
            </p>
            <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
              Currently, I work with <strong>Incognito Studio</strong> and <strong>PFX Studio</strong>,
              contributing to major projects like <em>"Proud Princess"</em> and{' '}
              <em>"Rosa & Dara a jejich velké letní dobrodružství"</em>, a 3D feature film that blends
              2D and 3D animation. My expertise extends to on-set VFX supervision and integrating
              analog and digital media, including <strong>VJing</strong> with{' '}
              <strong>Resolume Arena</strong> and <strong>TouchDesigner</strong>.
            </p>
            <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
              I'm always eager to embrace new challenges and opportunities, and I'm willing to
              relocate, with a particular interest in the <strong>Canary Islands</strong>.
            </p>
          </div>
        );
      case 'film':
        return (
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Film Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProjectCard
                title='"Proud Princess"'
                duration="PFX Studio | October 2023 - Present"
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
                thumbnail={blackSquare}
              />
              <ProjectCard
                title='"Rosa & Dara a jejich velké letní dobrodružství"'
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
                thumbnail={blackSquare}
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
                title="Mid Compositor & Technical Director"
                duration="Incognito Studio | August 2021 - Present"
                description={`- VFX Compositing and development work for clients including Panasonic Japan, Moneta Bank, and McDonald's
- VFX Supervisor for the Creditas project`}
                moreInfo={null}
                media={null}
                mediaType={null}
                thumbnail={blackSquare}
              />
              <ProjectCard
                title="Freelance Nuke Compositor"
                duration="Let it Roll Festival | July 2023 - August 2023"
                description="- Compositing of a 5-minute opening sequence using Nuke and Nuke Studio"
                moreInfo={null}
                media={null}
                mediaType={null}
                thumbnail={blackSquare}
              />
              <ProjectCard
                title="Freelance Motion Graphic Designer"
                duration="VIG Production | October 2023 - Present"
                description="- Created motion graphics for various client projects"
                moreInfo={null}
                media={null}
                mediaType={null}
                thumbnail={blackSquare}
              />
              <h2 className="text-2xl font-bold text-gray-900 mt-8">Education</h2>
              <div className="mt-4">
                <p className="text-gray-700 leading-relaxed">
                  - The University of Creative Communication, Prague - Degree in VFX and Animation
                </p>
              </div>
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
                description={`• Nuke
• After Effects
• DaVinci Resolve
• Adobe Creative Suite
• Resolume Arena
• TouchDesigner`}
                moreInfo={
                  <p className="text-gray-700 leading-relaxed">
                    Experience in creating complex visual effects and motion graphics using these
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
• 2D and 3D Animation Integration
• VJing`}
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
                title="Technical Direction"
                description="Developed tailored scripts and tools for pipeline optimization in VFX production, enhancing efficiency and productivity."
                moreInfo={
                  <p className="text-gray-700 leading-relaxed">
                    Proficient in scripting and tool development to streamline workflows.
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

            {/* Experimental Animation & Glitch Art */}
            <ProjectCard
              title="Experimental Animation & Glitch Art"
              description="Creating experimental animations and glitch art by integrating analog and digital media."
              moreInfo={
                <div className="space-y-2">
                  <h4 className="font-semibold mb-2">Activities:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
                    <li>Analog photography and alternative film development</li>
                    <li>VJing using Resolume Arena and TouchDesigner</li>
                    <li>Mixed media art projects</li>
                  </ul>
                </div>
              }
              media={placeholderVideos}
              mediaType="video"
              alwaysExpanded={true} // Always show additional content
              className="col-span-1 md:col-span-2" // Span both columns
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
              <p className="text-sm text-gray-500 mt-1">Mid-Level Compositor & TD</p>
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
          <div className="mt-auto pt-6 border-t border-gray-200 hidden md:block">
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
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">{renderContent()}</main>
    </div>
  );
};

export default App;
