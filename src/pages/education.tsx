import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { NavLogo } from "@/components/NavLogo";
import {
  ArrowLeft,
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

const education = [
  {
    degree: "B.Tech, Computer Science & Business Systems",
    institution: "KIT College of Engineering and Technology",
    affiliation: "Affiliated to Shivaji University, Kolhapur (SUK)",
    period: "2024 — 2025",
    score: "SGPA 7.7",
    location: "Kolhapur, India",
    description:
      "Pursuing an undergraduate degree blending core computer science with business systems. My academic focus combines software engineering principles with applied product thinking.",
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Object-Oriented Programming",
      "Web Development",
      "Business Systems",
    ],
    icon: <GraduationCap className="w-6 h-6" />,
    accent: "from-primary/30 to-violet-400/10",
  },
  {
    degree: "Diploma in Computer Science & Engineering",
    institution: "Sharad Institute of Technology",
    affiliation: "Maharashtra State Board of Technical Education (MSBTE)",
    period: "Completed 2024",
    score: "85.94%",
    location: "Ichalkaranji, India",
    description:
      "Built a strong foundation in programming, databases, and software engineering fundamentals — graduating with distinction.",
    coursework: [
      "Programming in C / C++",
      "Java Programming",
      "Python",
      "Database Systems",
      "Software Engineering",
      "Computer Networks",
    ],
    icon: <Award className="w-6 h-6" />,
    accent: "from-cyan-400/20 to-primary/20",
  },
];

export default function Education() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased relative overflow-x-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />
      </div>

      {/* Top nav */}
      <nav className="sticky top-0 z-40 px-6 py-6 backdrop-blur-md bg-background/60 border-b border-border/30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to portfolio
          </Link>
          <NavLogo />
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-24 pb-16 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium tracking-wider uppercase text-primary">
              Academic Journey
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-medium tracking-tighter leading-[0.95] mb-6"
          >
            Education &<br />
            <span className="text-gradient">academic foundation.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-light"
          >
            The institutions, coursework, and milestones that shaped my approach
            to computer science, software engineering, and product thinking.
          </motion.p>
        </div>
      </section>

      {/* Quick stats */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Diploma Score", value: "85.94%", icon: <Award className="w-5 h-5" /> },
            { label: "Current SGPA", value: "7.7", icon: <TrendingUp className="w-5 h-5" /> },
            { label: "Years of Study", value: "5+", icon: <Calendar className="w-5 h-5" /> },
            { label: "Specialization", value: "CS & BS", icon: <BookOpen className="w-5 h-5" /> },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <SpotlightCard className="glass-panel rounded-2xl p-5 group hover:border-primary/40">
                <div className="text-primary/70 group-hover:text-primary transition-colors mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-display font-medium mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education timeline */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto space-y-8">
          {education.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard className="glass-panel rounded-3xl px-8 pt-5 pb-7 md:px-10 md:pt-6 md:pb-9 group hover:border-primary/40 relative overflow-hidden">
                {/* Accent gradient blob */}
                <div
                  className={`absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-50 bg-gradient-to-br ${item.accent} pointer-events-none transition-opacity duration-700 group-hover:opacity-80`}
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative">
                  {/* Left: icon + period */}
                  <div className="md:col-span-3 flex md:flex-col gap-4 md:gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_0_30px_rgba(139,92,246,0)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                      {item.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.period}
                      </div>
                      <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </div>
                    </div>
                  </div>

                  {/* Right: content */}
                  <div className="md:col-span-9">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <h2 className="text-2xl md:text-3xl font-display font-medium tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                        {item.degree}
                      </h2>
                      <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium font-mono group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-500 shadow-[0_0_0_rgba(139,92,246,0)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]">
                        {item.score}
                      </div>
                    </div>

                    <div className="text-primary font-medium mb-1">
                      {item.institution}
                    </div>
                    <div className="text-sm text-muted-foreground mb-6">
                      {item.affiliation}
                    </div>

                    <p className="text-muted-foreground leading-relaxed font-light mb-8">
                      {item.description}
                    </p>

                    {/* Coursework chips */}
                    <div>
                      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
                        Key coursework
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.coursework.map((course, j) => (
                          <motion.span
                            key={course}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.4,
                              delay: 0.2 + j * 0.04,
                            }}
                            whileHover={{ y: -2, scale: 1.05 }}
                            className="px-3 py-1.5 text-xs rounded-full border border-border/60 text-muted-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/10 transition-colors cursor-default"
                          >
                            {course}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom shimmer line */}
                <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA back to portfolio */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel rounded-3xl p-12 relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 blur-[120px] rounded-full pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mb-4 relative">
              Want to see what I've built?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto font-light relative">
              Head back to my portfolio to explore projects, skills, and how to
              get in touch.
            </p>
            <Link
              href="/"
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-[0_0_40px_rgba(139,92,246,0.35)] relative"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to portfolio
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50 text-center text-muted-foreground text-sm">
        <div className="max-w-7xl mx-auto">
          © {new Date().getFullYear()} Pranav Dabade. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
