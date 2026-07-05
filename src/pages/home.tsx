import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Twitter, Linkedin, Mail, Code2, Layers, Cpu, Globe, Zap, ArrowRight, ExternalLink, Send, Check, Loader2, Download, Menu, X } from "lucide-react";
import { Link } from "wouter";
import { SpotlightCard } from "@/components/SpotlightCard";

import { NavLogo } from "@/components/NavLogo";

const navItems = [
  { name: "Work", href: "#work", external: false },
  { name: "Expertise", href: "#expertise", external: false },
  { name: "Experience", href: "#experience", external: false },
  { name: "Education", href: "/education", external: true },
  { name: "Contact", href: "#contact", external: false },
];

const projects = [
  {
    title: "HeartInsights",
    category: "Full-Stack · Machine Learning",
    description: "A heart disease prediction system that uses machine learning to assess cardiovascular risk from user health data. Delivers real-time results through a clean, interactive interface built on the MERN stack.",
    image: "/images/project-1.png",
    tech: ["React.js", "Node.js", "MongoDB", "Machine Learning", "Bootstrap"],
    link: "https://github.com/PranavDDabade/heartinsights"
  }
];

const skills = [
  { name: "MERN Stack Development", description: "MongoDB, Express.js, React.js, Node.js", icon: <Globe className="w-5 h-5" /> },
  { name: "Frontend Engineering", description: "HTML, CSS, JavaScript, React.js, Tailwind CSS, Bootstrap", icon: <Layers className="w-5 h-5" /> },
  { name: "Programming Languages", description: "C++, Java, Python, JavaScript", icon: <Code2 className="w-5 h-5" /> },
  { name: "Databases & Tools", description: "MySQL, MongoDB, Firebase, Git, GitHub, Postman, VS Code", icon: <Cpu className="w-5 h-5" /> },
  { name: "Core Concepts", description: "OOP, Data Structures & Algorithms, DBMS, Operating Systems", icon: <Zap className="w-5 h-5" /> },
  { name: "Mobile Development", description: "Android Development, Android Studio", icon: <Cpu className="w-5 h-5" /> }
];

const experiences = [
  {
    role: "MERN Stack Intern",
    company: "Soft Nexis Technology · Online",
    period: "Feb 2026 — Apr 2026",
    description: "Built and shipped full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Worked with Tailwind CSS for modern UI and used Git & GitHub for version control across collaborative projects."
  },
  {
    role: "Android Developer Intern",
    company: "Onestar Software Solution · Offline",
    period: "Jun 2023 — Jul 2023",
    description: "Designed and developed native Android applications using Android Studio. Focused on intuitive UI design, layout responsiveness, and core Android development practices."
  }
];

function MagneticButton({ children, className, ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const toggle = () => setIsOpen((prev) => !prev);
    document.addEventListener('toggle-mobile-nav', toggle);
    return () => document.removeEventListener('toggle-mobile-nav', toggle);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 md:hidden"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          />

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Nav links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative z-10 flex flex-col items-center justify-center h-full gap-8"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
              >
                {item.external ? (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-display font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      const el = document.querySelector(item.href);
                      if (el) {
                        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
                      }
                    }}
                    className="text-2xl font-display font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                )}
              </motion.div>
            ))}

            {/* Social links in mobile nav */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex items-center gap-4 mt-8 pt-8 border-t border-border/40"
            >
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:pranavddabade@gmail.com" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Smooth scroll
  useEffect(() => {
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    document.addEventListener('click', handleHashClick);
    return () => document.removeEventListener('click', handleHashClick);
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden selection:bg-primary/30">
      
      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      {/* Navigation */}
      <MobileNav />
      <nav className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 md:px-8 lg:px-16 py-3 backdrop-blur-md bg-background/60 border-b border-border/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <NavLogo />
          </motion.div>
          
          {/* Desktop nav */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }}
            className="hidden md:flex items-center gap-8 text-sm font-medium"
          >
            {navItems.map((item, i) =>
              item.external ? (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </motion.a>
              ),
            )}
          </motion.div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => document.dispatchEvent(new CustomEvent('toggle-mobile-nav'))}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen lg:h-screen lg:max-h-screen flex items-center justify-center pt-20 lg:pt-15 pb-12 lg:pb-0 overflow-hidden">
        {/* Abstract background */}
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] z-10" />
          <img 
            src="/images/hero-bg.png" 
            alt="Abstract Background" 
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-4 md:mb-8"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs sm:text-sm font-medium tracking-wider uppercase text-primary">Open to internship opportunities</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tighter leading-[0.9] mb-6 md:mb-8"
              >
                Building with <br />
                <span className="text-muted-foreground">the MERN stack.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8 md:mb-12 font-light"
              >
                I'm Pranav, a Computer Science & Business Systems undergrad crafting scalable, user-focused web applications with MongoDB, Express, React, and Node.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
              >
                <MagneticButton
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Work <ArrowDownIcon className="w-4 h-4" />
                </MagneticButton>
                <div className="flex items-center gap-4">
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:pranavddabade@gmail.com" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Profile portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 60 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative flex justify-center    lg:justify-end items-end"
            >
              <div className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[440px] mx-auto lg:mx-0 aspect-[3/4]">
                {/* Glow halo behind */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[80%] rounded-full bg-primary/30 blur-[100px]"></div>
                  <div className="absolute right-0 bottom-1/4 w-1/2 h-1/2 rounded-full bg-amber-500/10 blur-[80px]"></div>
                </div>

                {/* Decorative grid lines */}
                <div className="absolute inset-0 -z-10 opacity-30">
                  <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                  <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-foreground/20 to-transparent"></div>
                </div>

                <motion.img
                  src="/images/profile.png"
                  alt="Portrait of Pranav Dabade"
                  initial={{ y: 20 }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full h-full object-contain rounded-full object-bottom drop-shadow-[0_25px_45px_rgba(139,92,246,0.35)]"
                />

                {/* Floating accent badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -left-1 bottom-20 hidden md:flex items-center gap-3 glass-panel px-4 py-3 rounded-2xl backdrop-blur-md"
                >
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <div className="text-xs">
                    <div className="font-medium leading-tight">Based in India</div>
                    <div className="text-muted-foreground leading-tight">IST · Remote friendly</div>
                  </div>
                </motion.div>

                {/* Circular resume download button */}
                <motion.a
                  href="/PranavResume.pdf"
                  download="Pranav_Dabade_Resume.pdf"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.08 }}
                  className="absolute bottom-12 sm:bottom-20 right-0 w-[64px] h-[64px] sm:w-[88px] sm:h-[88px] flex items-center justify-center group cursor-pointer z-20"
                  aria-label="Download Resume"
                >
                  {/* Spinning text ring */}
                  <motion.svg
                    width="88"
                    height="88"
                    viewBox="0 0 88 88"
                    className="absolute inset-0 w-full h-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  >
                    <defs>
                      <path
                        id="resume-circle-path"
                        d="M 44,44 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"
                      />
                    </defs>
                    <text fontSize="7.2" fontFamily="Space Grotesk, Arial, sans-serif" fontWeight="600" letterSpacing="2.8" fill="#a78bfa">
                      <textPath href="#resume-circle-path">
                        DOWNLOAD RESUME · DOWNLOAD RESUME ·
                      </textPath>
                    </text>
                  </motion.svg>

                  {/* Center circle */}
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-[0_0_28px_rgba(139,92,246,0.65)] group-hover:shadow-[0_0_42px_rgba(139,92,246,1)] group-hover:scale-110 transition-all duration-300 z-10">
                    <Download className="w-5 h-5 text-white group-hover:translate-y-0.5 transition-transform duration-300" />
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-6 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center gap-4 z-10"
        >
          <div className="text-xs tracking-widest text-muted-foreground uppercase rotate-90 md:rotate-0 md:writing-mode-vertical md:mb-4">Scroll</div>
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent hidden md:block"></div>
        </motion.div>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-16 md:py-32 px-4 sm:px-6 md:px-8 lg:px-16 relative z-20 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end justify-between mb-20 border-b border-border/50 pb-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-medium tracking-tight">Selected Work</h2>
            <span className="text-muted-foreground font-mono text-sm hidden md:block">(01 — 01)</span>
          </motion.div>

          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${index % 2 !== 0 ? 'lg:rtl' : ''}`}
              >
                <div className={`lg:col-span-7 overflow-hidden rounded-2xl bg-muted/20 relative aspect-[16/10] glow-border ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:saturate-150 group-hover:contrast-110"
                    />
                    {/* Color sweep on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay"></div>
                    {/* Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500"></div>
                    {/* Floating "View" pill */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute top-6 right-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                    >
                      Live <ExternalLink className="w-3.5 h-3.5" />
                    </motion.div>
                  </motion.div>
                </div>

                <div className={`lg:col-span-5 flex flex-col justify-center ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div className="text-primary font-mono text-sm mb-4 inline-flex items-center gap-2">
                    <span className="h-px w-8 bg-primary"></span>
                    {project.category}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-medium mb-6 group-hover:text-primary transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 text-lg font-light">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.tech.map((tech, i) => (
                      <motion.span
                        key={tech}
                        whileHover={{ y: -3, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="px-3 py-1.5 text-xs rounded-full border border-border/60 text-muted-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/10 transition-colors cursor-default"
                        style={{ transitionDelay: `${i * 30}ms` }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <a href={project.link} className="group/link inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors w-fit relative">
                    <span className="relative">
                      View Project
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover/link:w-full transition-all duration-300"></span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section id="expertise" className="py-16 md:py-32 px-4 sm:px-6 md:px-8 lg:px-16 bg-card relative z-20 border-y border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight mb-6">Skills & Expertise</h2>
              <p className="text-muted-foreground leading-relaxed font-light">
                A toolkit centered on the MERN stack and modern web development, backed by a strong foundation in computer science fundamentals and a curiosity for building scalable, user-focused products.
              </p>
            </motion.div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <SpotlightCard className="glass-panel p-7 rounded-2xl overflow-hidden group h-full hover:border-primary/40">
                    <div className="absolute top-5 right-5 p-3 rounded-xl bg-primary/10 text-primary/70 group-hover:bg-primary/20 group-hover:text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-3 pr-12 group-hover:text-primary transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {skill.description}
                    </p>
                    <div className="mt-5 h-px w-12 bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-700 ease-out" />
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-16 md:py-32 px-4 sm:px-6 md:px-8 lg:px-16 relative z-20">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight mb-4">Experience</h2>
            <p className="text-muted-foreground font-light">Internships and roles where I've shipped real software.</p>
          </motion.div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
                whileHover={{ x: 4 }}
              >
                <SpotlightCard className="glass-panel rounded-2xl p-8 group hover:border-primary/40 grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-3 flex md:flex-col items-baseline md:items-start gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary group-hover:scale-150 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.8)] transition-all duration-500"></span>
                    <span className="text-muted-foreground font-mono text-sm group-hover:text-primary transition-colors duration-300">
                      {exp.period}
                    </span>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="text-2xl font-display font-medium mb-2 group-hover:translate-x-1 transition-transform duration-300">
                      {exp.role}
                    </h3>
                    <div className="text-primary font-medium mb-4 inline-flex items-center gap-2">
                      {exp.company}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed font-light">
                      {exp.description}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 flex justify-center bg-secondary"
          >
            <Link
              href="/education"
              className="group inline-flex items-center gap-3 glass-panel px-6 py-4 rounded-full hover:border-primary/50 transition-colors"
            >
              <span className="text-sm font-medium">View education & academic background</span>
              <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="py-16 md:py-32 px-4 sm:px-6 md:px-8 lg:px-16 relative z-20 bg-primary/5 border-t border-primary/10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-medium tracking-tight mb-6">
              Let's build something <br/>
              <span className="text-gradient">extraordinary.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              Currently available for freelance projects and open to full-time opportunities. Drop a message or find me elsewhere.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: socials & info */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-5 space-y-8"
            >
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Reach me at</div>
                <a
                  href="mailto:pranavddabade@gmail.com"
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-medium hover:text-primary transition-colors inline-flex items-center gap-3 group break-all sm:break-normal"
                >
                  pranavddabade@gmail.com
                  <ArrowUpRight className="w-6 h-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </a>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Find me on</div>
                <div className="flex flex-wrap items-center gap-3">
                  {[
                    { label: "Gmail", href: "mailto:pranavddabade@gmail.com", Icon: Mail },
                    { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: Linkedin },
                    { label: "GitHub", href: "https://github.com/", Icon: Github },
                  ].map(({ label, href, Icon }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="glass-panel inline-flex items-center gap-3 px-5 py-3 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-border/40">
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Response time</div>
                <p className="text-base text-muted-foreground font-light leading-relaxed">
                  Usually within 24 hours. For urgent inquiries, mention it in the subject line.
                </p>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50 text-center relative z-20 bg-background text-muted-foreground text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} Pranav Dabade. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="mailto:pranavddabade@gmail.com" className="hover:text-foreground transition-colors">Email</a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>


    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    // Simulated submission, then open the user's email client as a fallback
    await new Promise((r) => setTimeout(r, 900));

    const subject = encodeURIComponent(`New message from ${formData.name || "your portfolio"}`);
    const body = encodeURIComponent(
      `${formData.message}\n\n— ${formData.name}${formData.email ? `\n${formData.email}` : ""}`,
    );
    window.location.href = `mailto:pranavddabade@gmail.com?subject=${subject}&body=${body}`;

    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setFormData({ name: "", email: "", message: "" });
    }, 2400);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="glass-panel rounded-2xl p-6 md:p-8 space-y-5 backdrop-blur-md relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={onChange}
            placeholder="Your name"
            className="w-full bg-background/50 border border-border/60 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={onChange}
            placeholder="you@domain.com"
            className="w-full bg-background/50 border border-border/60 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2 relative">
        <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={onChange}
          placeholder="Tell me about your project, timeline, and what you're hoping to build..."
          className="w-full bg-background/50 border border-border/60 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
        />
      </div>

      <div className="flex items-center justify-between gap-4 pt-2 relative">
        <p className="text-xs text-muted-foreground">
          Or email directly — I read every message.
        </p>
        <motion.button
          type="submit"
          disabled={status === "submitting"}
          whileHover={{ scale: status === "idle" ? 1.03 : 1 }}
          whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium text-sm inline-flex items-center gap-2 disabled:opacity-70 hover:bg-primary/90 transition-colors shadow-[0_0_30px_rgba(139,92,246,0.25)]"
        >
          <AnimatePresence mode="wait">
            {status === "submitting" && (
              <motion.span
                key="submitting"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="inline-flex items-center gap-2"
              >
                <Loader2 className="w-4 h-4 animate-spin" /> Sending
              </motion.span>
            )}
            {status === "success" && (
              <motion.span
                key="success"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="inline-flex items-center gap-2"
              >
                <Check className="w-4 h-4" /> Sent
              </motion.span>
            )}
            {status === "idle" && (
              <motion.span
                key="idle"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="inline-flex items-center gap-2"
              >
                Send message <Send className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </form>
  );
}

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  );
}