'use client';

import { useState, useEffect, useRef } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tristan Chen | Experience',
};

export default function Experience() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Combined timeline data (work + education)
  const timelineData = [
    {
      id: 1,
      title: "Software Engineering Intern",
      organization: "Google",
      location: "New Taipei City, Taiwan",
      period: "Summer 2025",
      duration: "12 weeks",
      type: "work",
      description: "Developed an Auto-Detection System for Abnormal Userspace Memory Usage",
      language: ["Python", "Java", "SQL"],
      technique: ["Concurrent Programming", "Data Analysis"],
    },
    {
      id: 2,
      year: "Junior",
      school: "National Taiwan University",
      department: "Computer Science and Information Engineering",
      period: "Fall 2024 - Spring 2025",
      type: "education",
      description: "Acquired a deep understanding of Machine Learning and Artificial Intelligence",
      courses: ["Machine Learning", "Deep Reinforcement Learning", "Foundations of Artificial Intelligence"],
      gpa: "4.3/4.3 • Dean's List Award x 1"
    },
    {
      id: 3,
      title: "IOI Teacher",
      organization: "Kang Chiao International School",
      location: "New Taipei City, Taiwan",
      period: "Mar 2024 - Jun 2025",
      duration: "3 semesters",
      type: "work",
      description: "Established a strong programming foundation for young students, aiming for future success in IOI competitions.",
      language: ["Python"],
    },
    {
      id: 4,
      year: "Sophomore",
      school: "National Taiwan University",
      department: "Computer Science and Information Engineering",
      period: "Fall 2023 - Spring 2024",
      type: "education",
      description: "Cultivated a comprehensive understanding of core system concepts, specifically in system programming, operating systems, and systems administration.",
      courses: ["Systems Programming", "Operating Systems", "Network Administration and System Administration"],
      gpa: "4.27/4.3"
    },
    {
      id: 5,
      type: "transfer",
      title: "NCKU ➡️ NTU",
      description: "Transferred from National Cheng Kung University to National Taiwan University.",
    },
    {
      id: 6,
      year: "Sophomore",
      school: "National Cheng Kung University",
      department: "Computer Science and Information Engineering",
      period: "Fall 2022 - Spring 2023",
      type: "education",
      description: "Acquired a strong foundation in Computer Science and Information Engineering",
      courses: ["Data Structures", "Algorithm", "Computer Organization", "Computer Network", "Discrete Mathematics", "Probability and Statistics"],
      gpa: "4.3/4.3 • Dean's List Award x 2"
    },
    {
      id: 7,
      title: "Quanta-NCKU Joint AI Research Center Intern",
      organization: "Quanta • NCKU",
      period: "Nov 2021 - Jul 2022",
      type: "work",
      description: "Conducted vehicle detection and traffic flow analysis at key intersections.",
      language: ["Python"],
      technique: ["Data Analysis", "Computer Vision"],
    },
    {
      id: 8,
      title: "Freshman",
      school: "National Cheng Kung University",
      department: "Computer Science and Information Engineering",
      period: "Fall 2021 - Spring 2022",
      type: "education",
      description: "Developed a strong programming foundation.",
      courses: ["Program Design", "Object-Oriented Programming", "Linear Algebra"],
      gpa: "4.27/4.3 • Dean's List Award x 2"
    },
  ];


  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const timeline = timelineRef.current;
        const windowHeight = window.innerHeight;
        const timelineHeight = timeline.offsetHeight;
        
        const scrollTop = window.scrollY;
        const timelineTop = timeline.offsetTop;
        
        // Calculate progress based on scroll position relative to timeline
        const timelineBottom = timelineTop + timelineHeight;
        const viewportCenter = scrollTop + windowHeight / 2;
        
        // Calculate progress: 0 when timeline starts, 1 when timeline ends
        // But cap it so it reaches 100% when scrolled about 60% through the page
        const timelineStart = timelineTop - windowHeight * 0.2; // Start 20% before timeline
        const timelineEnd = timelineBottom - windowHeight * 0.25; // End 40% before bottom
        
        let progress = 0;
        
        if (viewportCenter >= timelineStart && viewportCenter <= timelineEnd) {
          // Linear progress between start and end
          progress = (viewportCenter - timelineStart) / (timelineEnd - timelineStart);
        } else if (viewportCenter > timelineEnd) {
          // Timeline is complete
          progress = 1;
        }
        
        // Ensure progress is between 0 and 1
        progress = Math.max(0, Math.min(1, progress));
        
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-light-bg-light to-light-bg-dark dark:from-dark-bg-dark dark:to-dark-bg-light">
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              <span className="text-primary-light">
                Experience
              </span>
            </h1>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            My career and academic path
            </p>
          </div>


          {/* Timeline */}
          <div className="max-w-4xl mx-auto" ref={timelineRef}>
            <div className="relative">
              {/* Dynamic Timeline Line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-0.5 top-0 w-0.5 bg-foreground/20"></div>
              <div 
                className="absolute left-4 md:left-1/2 transform md:-translate-x-0.5 top-0 w-0.5 bg-foreground transition-all duration-300"
                style={{ height: `${scrollProgress * 100}%` }}
              ></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                {timelineData.map((item, index) => (
                  <div key={item.id} className="relative flex items-start">
                    {/* Timeline Dot */}
                    <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background shadow-lg z-10 transition-all duration-500 ${
                      scrollProgress > (index / timelineData.length) 
                        ? 'bg-foreground scale-110'
                        : 'bg-foreground/30'
                    }`}></div>

                    {/* Content Card */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'
                    }`}>
                      <div className="bg-background/80 backdrop-blur-sm border border-foreground/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                        {/* Type Badge */}
                        <div className="mb-3">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            item.type === 'transfer' ? 'bg-primary-dark/10 text-primary-dark' :
                            item.type === 'education' 
                              ? 'bg-blue-200/80 text-blue-900'
                              : 'bg-green-200/80 text-green-900'
                          }`}>
                            {item.type === 'transfer' ? '🔄 Transfer' : 
                            item.type === 'education' ? '🎓 Education' : '💼 Work'}
                          </span>
                        </div>

                        {/* Header */}
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary-light transition-colors">
                            {item.title || item.year}
                          </h3>
                          <p className="text-lg font-semibold text-primary-light mb-1">
                            {item.organization || item.school}
                          </p>
                          {item.department && (
                            <p className="text-base font-medium text-foreground/70 mb-1">
                              {item.department}
                            </p>
                          )}
                          <div className={`flex flex-wrap gap-2 text-sm text-foreground/70 ${
                            index % 2 === 0 ? 'md:justify-end' : ''
                          }`}>
                            {item.period && <span>{item.period}</span>}
                            {item.duration && <span>• {item.duration}</span>}
                            {item.location && <span>{item.location}</span>}
                            {item.gpa && <span>GPA: {item.gpa}</span>}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-foreground/80 mb-4 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Technologies/Languages/Courses */}
                        <div className="space-y-3">
                          {/* Work: Languages and Techniques */}
                          {item.type === 'work' && (
                            <>
                              {item.language && (
                                <div>
                                  <h4 className={`text-sm font-semibold text-foreground mb-2 ${
                                    index % 2 === 0 ? 'md:text-right' : ''
                                  }`}>Languages:</h4>
                                  <div className={`flex flex-wrap gap-2 ${
                                    index % 2 === 0 ? 'md:justify-end' : ''
                                  }`}>
                                    {item.language.map((lang, langIndex) => (
                                      <span
                                        key={langIndex}
                                        className="px-3 py-1 bg-primary-dark/10 text-primary-dark text-sm rounded-full border border-primary-dark/20"
                                      >
                                        {lang}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {item.technique && (
                                <div>
                                  <h4 className={`text-sm font-semibold text-foreground mb-2 ${
                                    index % 2 === 0 ? 'md:text-right' : ''
                                  }`}>Techniques:</h4>
                                  <div className={`flex flex-wrap gap-2 ${
                                    index % 2 === 0 ? 'md:justify-end' : ''
                                  }`}>
                                    {item.technique.map((tech, techIndex) => (
                                      <span
                                        key={techIndex}
                                        className="px-3 py-1 bg-primary-dark/10 text-primary-dark text-sm rounded-full border border-primary-dark/20"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                          
                          {/* Education: Courses */}
                          {item.type === 'education' && item.courses && (
                            <div>
                              <h4 className={`text-sm font-semibold text-foreground mb-2 ${
                                index % 2 === 0 ? 'md:text-right' : ''
                              }`}>Key Courses:</h4>
                              <div className={`flex flex-wrap gap-2 ${
                                index % 2 === 0 ? 'md:justify-end' : ''
                              }`}>
                                {item.courses.map((course, courseIndex) => (
                                  <span
                                    key={courseIndex}
                                    className="px-3 py-1 bg-primary-dark/10 text-primary-dark text-sm rounded-full border border-primary-dark/20"
                                  >
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}