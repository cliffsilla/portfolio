"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Mail, Linkedin, Github, Phone, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import emailjs from '@emailjs/browser'

// Initialize EmailJS with your public key
emailjs.init({
  publicKey: 'l74XoEQhK3LzBfIAJ',
})

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")
  const [showAllExperiences, setShowAllExperiences] = useState(false)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = [
      { ref: heroRef.current, id: "hero" },
      { ref: aboutRef.current, id: "about" },
      { ref: projectsRef.current, id: "projects" },
      { ref: skillsRef.current, id: "skills" },
      { ref: contactRef.current, id: "contact" },
    ]

    sections.forEach((section) => {
      if (section.ref) {
        observer.observe(section.ref)
      }
    })

    return () => {
      sections.forEach((section) => {
        if (section.ref) {
          observer.unobserve(section.ref)
        }
      })
    }
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields')
      return
    }
    
    setIsSubmitting(true)
    setFormStatus('idle')
    
    try {
      // Send email using EmailJS
      await emailjs.send(
        'service_silla', // Your EmailJS service ID
        'template_tl7wjeg', // Your EmailJS template ID
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact Form',
          message: formData.message,
          to_name: 'Clifford Silla'
        }
        // No need to include public key here since we initialized it above
      )
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setFormStatus('success')
    } catch (error) {
      console.error('Email sending failed:', error)
      setFormStatus('error')
      // Log detailed error information to help with debugging
      if (error instanceof Error) {
        console.error('Error message:', error.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const skills = [
    {
      category: "Programming Languages & Frameworks",
      items: ["Java", "JavaScript", "TypeScript", "Angular", "React", "Spring Framework", "Laravel"],
    },
    {
      category: "Cloud & DevOps",
      items: ["Azure", "Google Cloud Platform", "Docker", "Kubernetes", "CI/CD pipelines"],
    },
    { category: "Databases", items: ["Microsoft SQL", "PostgreSQL", "MongoDB", "NoSQL databases"] },
    { category: "Web Technologies", items: ["RESTful API design", "HTML5", "CSS3", "UI/UX principles"] },
    {
      category: "Tools & Methodologies",
      items: ["Git", "Agile/Scrum", "Version Control", "Unit Testing", "Automated Deployment"],
    },
  ]

  const projects = [
    {
      title: "Enterprise Integration Platform",
      description:
        "Architected and implemented a scalable integration platform connecting core banking systems with payment gateways and third-party services.",
      tags: ["Java", "Spring", "Microservices", "Azure"],
      link: "#",
    },
    {
      title: "Secure Payment Gateway",
      description:
        "Developed a PCI DSS compliant payment processing system with robust security features and real-time transaction monitoring.",
      tags: ["TypeScript", "Node.js", "MongoDB", "Docker"],
      link: "#",
    },
    {
      title: "Legacy System Modernization",
      description:
        "Led the transformation of legacy applications to modern cloud-native architecture, improving performance and maintainability.",
      tags: ["React", "RESTful APIs", "CI/CD", "Kubernetes"],
      link: "#",
    },
  ]

  const experiences = [
    {
      role: "Software Engineer & Systems Integrator",
      company: "Equity Group",
      period: "Mar 2022 - Present",
      description:
        "Design, develop, integrate secure solutions; optimize core banking systems; ensure PCI DSS, GDPR compliance; mentor junior developers; collaborate with cross-functional teams.",
    },
    {
      role: "Software Developer & Systems Integrator (Contract)",
      company: "Techsavanna Ltd – Contracted to Equity Group",
      period: "Sept 2020 – Feb 2022",
      description:
        "Develop secure solutions; implement payment gateways; modernize systems using Azure; mentor juniors; support Agile practices.",
    },
    {
      role: "Software Solutions Analyst",
      company: "Enigma Score Ltd",
      period: "Aug 2019 - Jul 2020",
      description:
        "Plan, design software systems; analyze requirements; create documentation; collaborate with stakeholders; provide technical support.",
    },
    {
      role: "Freelance Web Solutions Developer",
      company: "Synergy Vault ltd",
      period: "Nov 2015 - Aug 2019",
      description:
        "Design, develop web applications; manage lifecycle; advise on digital strategy; ensure timely delivery.",
    },
    {
      role: "Web & Application Developer",
      company: "Efficaxx Ltd",
      period: "Feb 2014 – Oct 2015",
      description: "Modernize legacy systems; enhance UI; integrate new features; improve system performance.",
    },
  ]

  const competencies = [
    "Enterprise Integration",
    "Architecture & Systems Design",
    "Governance & Compliance",
    "Stakeholder Engagement",
    "Team Leadership & Mentorship",
    "DevOps & CI/CD",
  ]

  const getBackgroundClass = () => {
    switch (activeSection) {
      case "hero":
        return 'bg-hero'
      case "about":
        return 'bg-about'
      case "projects":
        return 'bg-projects'
      case "skills":
        return 'bg-skills'
      case "contact":
        return 'bg-contact'
      default:
        return 'bg-hero'
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 w-full h-full bg-cover bg-center bg-fixed transition-all duration-1000 ease-in-out ${getBackgroundClass()}`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      <div className="relative min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/10 border-b border-white/10">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-bold text-xl text-white"
            >
              Clifford Silla
            </motion.div>
            <div className="hidden md:flex space-x-6">
              {[
                { name: "Home", ref: heroRef },
                { name: "About", ref: aboutRef },
                { name: "Projects", ref: projectsRef },
                { name: "Skills", ref: skillsRef },
                { name: "Contact", ref: contactRef },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.ref)}
                  className={`text-white hover:text-primary transition-colors ${
                    activeSection === item.name.toLowerCase() ? "border-b-2 border-primary" : ""
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="flex items-center">
              <Button className="hidden md:flex bg-primary hover:bg-primary/80" onClick={() => window.open('/files/Resume - Clifford Silla.pdf', '_blank')}>
                Download Resume
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <motion.section
          id="hero"
          ref={heroRef}
          style={{ opacity, scale }}
          className="min-h-screen flex flex-col justify-center items-center pt-20 relative overflow-hidden"
        >
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10 z-10">
            <div className="flex-1 space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="text-sm font-medium text-primary mb-2">Hello, I'm</div>
                <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white">Clifford Silla</h1>
                <h2 className="text-2xl md:text-3xl font-medium text-white/80 mb-4">
                  Software Developer & Systems Integrator
                </h2>
                <p className="text-lg max-w-xl text-white/70">
                  Innovative and results-driven Software Engineer with over 10 years' experience in full-stack
                  development, enterprise integration, and systems architecture.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap gap-3"
              >
                <Button onClick={() => scrollToSection(contactRef)} className="bg-primary hover:bg-primary/80">
                  Get in touch
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection(projectsRef)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  View projects
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex gap-4"
              >
                <button
                  onClick={() => scrollToSection(contactRef)}
                  aria-label="Email me"
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-black/50 text-white hover:text-primary hover:bg-black/70 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </button>
                <a
                  href="https://linkedin.com/in/cliff-silla"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-black/50 text-white hover:text-primary hover:bg-black/70 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/cliffsilla"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-black/50 text-white hover:text-primary hover:bg-black/70 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="tel:+254721577557"
                  aria-label="Phone"
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-black/50 text-white hover:text-primary hover:bg-black/70 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20"
            >
              <img
                src="/profile-image.png"
                alt="Clifford Silla"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
            onClick={() => scrollToSection(aboutRef)}
          >
            <ChevronDown className="h-8 w-8 animate-bounce text-white" />
          </motion.div>
        </motion.section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-2 text-white">About Me</h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-lg text-white/80">
                  Adept at designing, integrating, and optimizing secure, scalable solutions for fintech and various
                  business domains. Proven track record in leading cross-functional teams, mentoring junior developers,
                  and managing complex projects that adhere to high standards of governance, compliance, and
                  performance.
                </p>
                <p className="text-lg text-white/80">
                  Passionate about continuous learning and leveraging emerging technologies to drive business growth and
                  operational efficiency.
                </p>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Core Competencies</h3>
                  <div className="flex flex-wrap gap-2">
                    {competencies.map((competency, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 text-white"
                      >
                        {competency}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Tabs defaultValue="experience" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-white/10">
                    <TabsTrigger value="experience" className="data-[state=active]:bg-primary text-white">
                      Experience
                    </TabsTrigger>
                    <TabsTrigger value="education" className="data-[state=active]:bg-primary text-white">
                      Education
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="experience" className="space-y-4 mt-4">
                    <div className={`space-y-4 ${showAllExperiences ? 'max-h-[400px] overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
                      {(showAllExperiences ? experiences : experiences.slice(0, 3)).map((exp, index) => (
                        <Card key={index} className="bg-white/10 border-white/5 backdrop-blur-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-white">{exp.role}</CardTitle>
                            <CardDescription className="text-white/70">
                              {exp.company} | {exp.period}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-white/60">{exp.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full text-white hover:bg-white/10 hover:text-primary"
                      onClick={() => setShowAllExperiences(!showAllExperiences)}
                    >
                      {showAllExperiences ? 'Show Less' : 'View More'}
                    </Button>
                  </TabsContent>
                  <TabsContent value="education" className="space-y-4 mt-4">
                    <Card className="bg-white/10 border-white/5 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-white">MSc in Computing and Information Systems</CardTitle>
                        <CardDescription className="text-white/70">
                          Liverpool John Moores University | Ongoing
                        </CardDescription>
                      </CardHeader>
                    </Card>
                    <Card className="bg-white/10 border-white/5 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-white">Bachelor of Information Technology</CardTitle>
                        <CardDescription className="text-white/70">Kenyatta University | 2018</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card className="bg-white/10 border-white/5 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-white">Professional Certifications</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-white/70">
                        <p className="text-sm">
                          • Application Security for Developers and DevOps Professionals – IBM, May 2024
                        </p>
                        <p className="text-sm">• Developing AI Applications with Python and Flask – IBM, May 2024</p>
                        <p className="text-sm">
                          • Application Development using Microservices and Serverless – IBM, May 2024
                        </p>
                        <p className="text-sm">• PCI DSS Compliance Training – Panacea Infosec, January 2024</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-2 text-white">Featured Projects</h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300 border-white/10 bg-white/10 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center text-white">
                        <span>{project.title}</span>
                        <a 
                          href={project.link} 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          title={`Visit ${project.title} project`}
                          aria-label={`Visit ${project.title} project`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-white/70">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="text-xs font-medium border-white/20 text-white bg-black/60 hover:bg-black/80 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <div className="h-1 w-0 group-hover:w-full bg-primary transition-all duration-300"></div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-2 text-white">Technical Skills</h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-white/10 border-white/10 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white">{skillGroup.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <motion.div
                            key={skillIndex}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Badge className="px-3 py-1 bg-primary/80 hover:bg-primary text-white">{skill}</Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="md:col-span-2"
              >
                <Card className="bg-white/10 border-white/10 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-white">Senior Leadership & Additional Expertise</CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-white">Architectural Leadership</h4>
                      <p className="text-sm text-white/70">
                        Proven experience in designing scalable, modular solutions using microservices and distributed
                        systems architecture.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-white">Process Optimization</h4>
                      <p className="text-sm text-white/70">
                        Initiate and lead process improvement initiatives to increase efficiency and ensure high system
                        performance.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-white">Mentorship & Coaching</h4>
                      <p className="text-sm text-white/70">
                        Strong commitment to developing talent with ongoing training sessions, code reviews, and best
                        practice dissemination.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-white">Innovation & Emerging Technologies</h4>
                      <p className="text-sm text-white/70">
                        Dedicated to exploring and incorporating innovative approaches (e.g., AI/ML integration,
                        advanced analytics) to maintain competitive advantage.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="py-20 relative z-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-2 text-white">Get In Touch</h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold text-white">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-black/60 text-white">
                      <Mail className="h-5 w-5" />
                    </div>
                    <span className="text-white">
                      Email me using the contact form
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-black/60 text-white">
                      <Phone className="h-5 w-5" />
                    </div>
                    <a href="tel:+254721577557" className="text-white hover:text-primary transition-colors">
                      +254-721-577557
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-black/60 text-white">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <a
                      href="https://linkedin.com/in/cliff-silla"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary transition-colors"
                    >
                      linkedin.com/in/cliff-silla
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-black/60 text-white">
                      <Github className="h-5 w-5" />
                    </div>
                    <a
                      href="https://github.com/cliffsilla"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary transition-colors"
                    >
                      github.com/cliffsilla
                    </a>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-xl font-semibold mb-4 text-white">Professional Interests</h3>
                  <div className="space-y-2">
                    <p className="text-white/70">
                      <span className="font-medium text-white">Technology Blogging:</span> Sharing knowledge on software
                      development, programming languages, frameworks, and best practices.
                    </p>
                    <p className="text-white/70">
                      <span className="font-medium text-white">Artificial Intelligence & Machine Learning:</span>{" "}
                      Exploring AI/ML algorithms, data analysis, and implementing solutions in software applications.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Send Me a Message</CardTitle>
                    <CardDescription className="text-white/70">
                      Fill out the form below and I'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                      {formStatus === 'success' && (
                        <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-md flex items-center gap-2 text-white">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>Message sent successfully! I'll get back to you soon.</span>
                        </div>
                      )}
                      
                      {formStatus === 'error' && (
                        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md flex items-center gap-2 text-white">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                          <span>Failed to send message. Please try again later.</span>
                        </div>
                      )}
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-white">
                            Name
                          </label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your name"
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus-visible:ring-primary"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-white">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Your email"
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus-visible:ring-primary"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium text-white">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Subject"
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-white">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Your message"
                          rows={5}
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus-visible:ring-primary"
                          required
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/80"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 border-t border-white/10 relative z-10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/60">© {new Date().getFullYear()} Clifford Silla. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
