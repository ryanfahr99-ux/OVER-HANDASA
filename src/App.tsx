/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  ClipboardCheck, 
  Menu, 
  X, 
  Mail,
  MapPin,
  ChevronLeft,
  Droplets,
  HardHat,
  Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_NUMBER = "972543324494"; // User number
const PHONE_NUMBER = "054-3324494"; // User number

interface Service {
  id: string;
  title: string;
  icon: any;
  shortDesc: string;
  fullDesc: string;
  mainImage: string;
}

interface ProjectStage {
  title: string;
  images: string[];
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  driveLink?: string;
  images?: string[];
  stages?: ProjectStage[];
}

const servicesData: Service[] = [
  {
    id: "moisture",
    title: "ייעוץ ואבחון נזקי מים ואיטום",
    icon: Droplets,
    shortDesc: "אבחון מדויק של מקור הנזילה — איטום או אינסטלציה — עם המלצות לתיקון ממוקדות.",
    fullDesc: "נזקי מים הם מהתקלות המורכבות והיקרות לטיפול  — חשוב לאבחן אותן בצורה מדויקת כבר מהשלב הראשון. אנו מתמחים באיתור מקור נזילות, בעיות איטום וכשלים במערכות אינסטלציה, תוך שימוש בגישה מקצועית ושיטתית שמונעת ניסויים וטעייה מיותר. השירות כולל אבחון בשטח, ניתוח מקור התקלה והמלצות לפתרון יעיל וחסכוני.",
    mainImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "inspection",
    title: "בדק בית וחוות דעת הנדסית",
    icon: ShieldCheck,
    shortDesc: "בדיקות מקצועיות לדירות חדשות ויד שנייה, כולל איתור ליקויי בנייה והפקת דוח הנדסי מפורט וברור.",
    fullDesc: "קונים דירה או משפצים? אל תתפשרו על הביטחון שלכם. אנו מבצעים בדק בית מקיף לדירות חדשות ויד שנייה, מאתרים ליקויים ובודקים מערכות. תקבלו חוות דעת הנדסית מקצועית ומפורטת, שתעמוד לצידכם מול קבלנים, יזמים ובכל הליך משפטי נדרש.",
    mainImage: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "legal",
    title: "שמאות נזקי רכוש",
    icon: Scale,
    shortDesc: "הערכת נזק מקצועית, כולל ליווי מול חברות ביטוח למיצוי זכויות מלא.",
    fullDesc: "שמאות מקצועית היא הבסיס להתנהלות נכונה מול חברות ביטוח ולמיצוי הזכויות. אנו מספקים שירותי שמאות לנזקי רכוש, בדגש על נזקי מים, רטיבות ונזקים מבניים, כולל הערכה מדויקת והפקת חוות דעת מקצועית.",
    mainImage: "https://shpak-law.com/wp-content/uploads/2020/03/Litigation.jpg",
  },
  {
    id: "supervision",
    title: "פיקוח ובקרת איכות",
    icon: HardHat,
    shortDesc: "ליווי מקצועי בפרויקטים פרטיים — כדי לוודא שהעבודה מצוינת ברמה גבוהה, בזמן ובאיכות.",
    fullDesc: "בנייה או שיפוץ ללא פיקוח מקצועי עלולים להוביל לליקויים, עיכובים ובלת'מים. אנו מספקים שירותי פיקוח ובקרת איכות לאורך כל שלבי הפרויקט — משלב התכנון ועד למסירה — תוך שמירה על סטנדרטים גבוהים, הקפדה על ביצוע נכון ומניעת טעויות בשטח.",
    mainImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "turnkey",
    title: "ביצוע פרויקטים עד המפתח",
    icon: ClipboardCheck,
    shortDesc: "ניהול וביצוע מלא של פרויקטי בנייה ושיפוץ, מהתכנון ועד למסירת נכס מוכן למגורים.",
    fullDesc: "ניהול וביצוע פרויקט בנייה או שיפוץ דורש ניסיון, מקצועיות ושליטה מלאה בכל שלבי העבודה. אנו מציעים שירות כולל של ביצוע פרויקטים 'עד המפתח' — משלב התכנון, דרך ניהול הקבלנים והעבודות ועד למסירה מלאה של נכס מוכן למגורים.\n✔ ניהול כולל של הפרויקט\n✔ עבודה עם בעלי מקצוע מובילים\n✔ עמידה בזמנים ובתקציב\n✔ תוצאה איכותית ברמת גימור גבוהה",
    mainImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
  }
];

const projectsData: Project[] = [
  {
    id: "p4",
    title: "ביצוע פרויקטים",
    category: "ביצוע פרויקטים עד המפתח",
    description: "ניהול וביצוע מלא של פרויקטי בנייה ושיפוץ, מהתכנון ועד למסירת נכס מוכן למגורים.",
    driveLink: "YOUR_DRIVE_LINK_HERE",
    stages: [
      {
        title: "בניית ספא",
        images: [
          "https://www.sharespa.co.il/cdn/shop/products/8.jpg?v=1771873473&width=1080",
          "https://www.sharespa.co.il/cdn/shop/products/8.jpg?v=1771873473&width=1080"
        ]
      },
      {
        title: "בניית שלד לוילה",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGTvK0am61CjgAWbmOfmChq50BAu3nB_DZOw&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD3LXWBmxwezuJftwxzNAd_fhYKYzWTT97Ew&s"
        ]
      },
      {
        title: "שיפוץ בית",
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800"
        ]
      }
    ]
  },
  {
    id: "p1",
    title: "בדק בית וחוות דעת הנדסית",
    category: "בדק בית וחוות דעת הנדסית",
    description: "בדיקה מקיפה של ליקויי בנייה, הפקת דוח הנדסי מפורט וקביל בבית משפט.",
    driveLink: "https://raw.githubusercontent.com/ryanfahr99-ux/site-assets-/main/assets/PDF.pdf"
  },
  {
    id: "p2",
    title: "שמאות נזקי רכוש",
    category: "שמאות נזקי רכוש",
    description: "הערכת נזק מקצועית, ליווי מול חברות ביטוח ומיצוי זכויות מלא.",
    driveLink: "https://raw.githubusercontent.com/ryanfahr99-ux/site-assets-/main/assets/PDF.pdf"
  },
  {
    id: "p3",
    title: "בקרת איכות ופיקוח",
    category: "פיקוח ובקרת איכות",
    description: "ליווי מקצועי ובקרת איכות לאורך כל שלבי הפרויקט, למניעת טעויות וחיסכון בעלויות.",
    driveLink: "https://raw.githubusercontent.com/ryanfahr99-ux/site-assets-/main/assets/PDF.pdf"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<{url: string, index: number, allImages: string[]} | null>(null);
  const [activeStages, setActiveStages] = useState<Record<string, number>>({});
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [testimonialName, setTestimonialName] = useState("");
  const [testimonialText, setTestimonialText] = useState("");
  const [testimonialSubmitted, setTestimonialSubmitted] = useState(false);
  const [showContactSuccess, setShowContactSuccess] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Initialize activeStages
    const initialStages: Record<string, number> = {};
    projectsData.forEach(project => {
      initialStages[project.id] = 0;
    });
    setActiveStages(initialStages);

    // Initial scroll for all project image containers
    projectsData.forEach(project => {
      if (project.stages) {
        const container = document.getElementById(`images-container-${project.id}`);
        if (container) {
          container.scrollTo({ left: 0, behavior: 'auto' });
        }
      }
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stageIndex = parseInt(entry.target.getAttribute('data-stage-index') || '0');
            const projectId = entry.target.getAttribute('data-project-id') || '';
            setActiveStages(prev => ({...prev, [projectId]: stageIndex}));
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document.querySelectorAll('[data-stage-index]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [projectsData]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.current) return;

    try {
      await emailjs.sendForm(
        'service_75wbi4q', 
        'template_a9j5d4k', 
        form.current, 
        '--tLZtunGJ8IJphXt'
      );
      console.log("Email sent successfully!");
      setShowContactSuccess(true);
      form.current.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      alert('שגיאה בשליחת ההודעה. אנא נסה שוב מאוחר יותר.');
    }
  };

  const openService = (service: Service) => {
    setSelectedService(service);
  };

  const closeService = () => {
    setSelectedService(null);
  };

  const navLinks = [
    { name: 'דף הבית', href: '#home' },
    { name: 'אודות', href: '#about' },
    { name: 'שירותים ומומחיות', href: '#services' },
    { name: 'הפרויקטים שלנו', href: '#projects' },
    { name: 'המלצות', href: '#testimonials' },
    { name: 'צור קשר', href: '#contact' },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Small delay to allow menu to start closing before scrolling
    setTimeout(() => {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80; // Header height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="WhatsApp"
        id="whatsapp-float"
      >
        <MessageCircle size={32} />
      </a>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-300 ${(scrolled && !isMenuOpen) ? 'glass-header py-2' : 'bg-transparent py-4'}`}
        id="main-header"
        role="banner"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
            src="https://lh3.googleusercontent.com/u/0/d/1VzP5uKM2xi2LmxDqE-AIvzI68uhL-LXv" 
            alt="לוגו OVER הנדסה" 
            className={`h-16 md:h-24 w-auto transition-all ${(scrolled && !isMenuOpen) ? '' : 'brightness-0 invert drop-shadow-md'}`}
            referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="תפריט ראשי">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => scrollToSection(e, link.href)}
                className={`font-medium transition-colors hover:text-accent ${scrolled ? 'text-slate-700' : 'text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href={`tel:${PHONE_NUMBER}`} 
              className="bg-accent text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 relative z-50 pointer-events-auto"
              aria-label={`חייג עכשיו למספר ${PHONE_NUMBER}`}
            >
              <Phone size={18} />
              חייג עכשיו
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden relative z-[120] ${isMenuOpen ? 'text-white' : (scrolled ? 'text-primary' : 'text-white')}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            id="menu-toggle"
            aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
            aria-expanded={isMenuOpen}
          >
            <Menu size={32} />
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-[100] bg-slate-900 overflow-y-auto"
            id="mobile-nav"
            onClick={() => setIsMenuOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="תפריט ניווט נייד"
          >
            <div className="min-h-screen w-full flex items-center justify-center py-24 px-6">
              <div className="w-full max-w-md flex flex-col gap-12 items-center text-center" onClick={(e) => e.stopPropagation()}>
                <nav className="flex flex-col gap-8" aria-label="תפריט ניווט נייד">
                  {navLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      className="text-4xl md:text-6xl font-black text-white hover:text-accent transition-colors tracking-tighter leading-tight"
                      onClick={(e) => scrollToSection(e, link.href)}
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
                
                <div className="w-full flex flex-col gap-4">
                  <a 
                    href={`tel:${PHONE_NUMBER}`} 
                    className="w-full bg-accent text-white py-6 rounded-2xl font-black text-2xl flex items-center justify-center gap-3 shadow-2xl shadow-accent/20 relative z-50 pointer-events-auto"
                    aria-label={`חייג עכשיו למספר ${PHONE_NUMBER}`}
                  >
                    <Phone size={28} />
                    חייג עכשיו
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero-section min-h-[80vh] flex items-center pt-32 md:pt-40 relative overflow-hidden">
          {/* Background Image */}
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover z-0"
            referrerPolicy="no-referrer"
            aria-hidden="true"
          />
          
          {/* Overlay to darken the background */}
          <div className="absolute inset-0 bg-slate-900/75 z-[1]"></div>

          <div className="hero-grid z-[2]" aria-hidden="true"></div>
          <div className="hero-glow z-[2]" aria-hidden="true"></div>
          <div className="scanline z-[2]" aria-hidden="true"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-start text-right"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-[2px] w-16 bg-accent"></div>
                  <span className="font-mono text-accent font-bold tracking-[0.3em] uppercase text-sm md:text-base">
                    השקט הנפשי שלכם, המומחיות שלנו.
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-7xl font-black text-white leading-relaxed md:leading-[1.1] mb-6 tracking-tight">
                 ביצוע פרויקטים, פיקוח בנייה, בדק בית, איתור נזקי מים ושמאות רכוש
                </h1>
                
                <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
                  <div className="max-w-xl">
                    <p className="text-lg md:text-2xl text-slate-200 leading-tight font-light py-2">
                   היתרון שלנו הוא שילוב מלא בין פיקוח הנדסי לביצוע בפועל. השליטה בתקני הבנייה מבטיחה לכם מבנה איכותי ובטוח, המגובה בדוחות ובחוות דעת מומחה קבילות בבית משפט.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 border-r border-white/10 pr-4">
                    <div>
                      <div className="text-3xl font-black text-white">30+</div>
                      <div className="text-slate-400 text-xs font-bold uppercase">שנות ניסיון</div>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-white">100%</div>
                      <div className="text-slate-400 text-xs font-bold uppercase">דיוק הנדסי</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
                  <a 
                    href={`tel:${PHONE_NUMBER}`}
                    className="bg-accent text-white px-8 py-4 rounded-lg font-black text-xl flex items-center justify-center gap-3 hover:bg-accent-hover transition-all shadow-2xl shadow-accent/40 relative z-50 pointer-events-auto"
                    aria-label={`חייג עכשיו למספר ${PHONE_NUMBER}`}
                  >
                    <Phone size={24} />
                    קבלו ייעוץ ראשוני ללא התחייבות
                  </a>
                  <button 
                    onClick={(e) => scrollToSection(e, '#contact-form-section')}
                    className="bg-white/5 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-lg font-black text-xl flex items-center justify-center gap-3 hover:bg-white hover:text-slate-900 transition-all"
                  >
                    השארת פרטים
                    <ClipboardCheck size={24} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-12 left-12 hidden lg:block" aria-hidden="true">
            <div className="font-mono text-[10px] text-white/30 space-y-1">
              <div>LAT: 32.0853° N</div>
              <div>LONG: 34.7818° E</div>
              <div>STATUS: OPERATIONAL</div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 md:py-32 relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1581092160607-ee22521dd763?auto=format&fit=crop&q=80&w=2000" 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover opacity-5"
            referrerPolicy="no-referrer"
            aria-hidden="true"
          />
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-24">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="lg:w-1/2 relative w-full"
              >
                <div className="relative z-10">
                  <img 
                    src="https://raw.githubusercontent.com/ryanfahr99-ux/site-assets-/main/assets/%D7%AA%D7%9E%D7%95%D7%A0%D7%94%20%D7%9C%D7%90%D7%95%D7%93%D7%95%D7%AA.png" 
                    alt="מהנדס אזרחי מקצועי בשטח" 
                    className="w-full h-auto object-cover shadow-2xl rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                id="about"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="technical-label">אודות החברה</div>
                <h2 className="text-5xl md:text-7xl font-black mb-10 text-slate-900 leading-[1.1]">
                  OVER הנדסה <br />
                  <span className="text-accent">העיניים שלכם בשטח.</span>
                </h2>
                
                <div className="space-y-8 text-xl text-slate-600 leading-relaxed">
                  <p className="font-medium text-slate-900">
                    המשרד מנוהל על ידי אנשי מקצוע בעלי ניסיון רב בתחום הבנייה, בקרת איכות וניהול פרויקטים, עם התמחות בליקויי בנייה ונזקי מים.
                  </p>
                  <p>
                    הגישה שלנו משלבת ידע הנדסי מעמיק עם ניסיון מעשי מהשטח — לספק פתרונות מדויקים, אמינים וישימים.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10">
                    {[
                      "ניסיון מעשי בשטח ולא רק תיאורטי",
                      "שילוב ייחודי של הנדסה + ביצוע + שמאות",
                      "אמינות ושקיפות מלאה מול הלקוח",
                      "יחס אישי וליווי עד פתרון מלא"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded bg-slate-900 text-white flex items-center justify-center group-hover:bg-accent transition-colors">
                          <CheckCircle2 size={24} aria-hidden="true" />
                        </div>
                        <span className="font-black text-slate-900 uppercase tracking-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-slate-900 text-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-12">
              <div className="max-w-3xl w-full text-center md:text-right">
                <h3 className="text-5xl md:text-8xl font-black leading-[1.1]">המומחיות שלנו</h3>
              </div>
              <p className="text-2xl text-slate-400 max-w-md pr-8 py-2">
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesData.map((service, idx) => (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white hover:text-slate-900 flex flex-col"
                  onClick={() => openService(service)}
                  role="button"
                  aria-label={`למידע נוסף על ${service.title}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      openService(service);
                    }
                  }}
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img 
                      src={service.mainImage} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white font-black uppercase tracking-widest border-2 border-white px-4 py-2 text-sm">למידע נוסף</span>
                    </div>
                    <div className="absolute top-3 right-3 w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white shadow-lg">
                      <service.icon size={20} aria-hidden="true" />
                    </div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                    <h4 className="text-xl font-black mb-2 uppercase tracking-tighter leading-tight">{service.title}</h4>
                    <p className="text-slate-400 group-hover:text-slate-600 leading-snug text-sm flex-grow">{service.shortDesc}</p>
                    <div className="mt-4 flex items-center gap-1 text-accent font-bold uppercase tracking-wide text-xs">
                      <span>קרא עוד</span>
                      <ChevronLeft size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-white relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#0f172a 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}></div>
          
          <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
            <h3 className="text-4xl md:text-6xl font-black mb-16 text-center text-slate-950">הפרויקטים שלנו</h3>
            <div className="space-y-16">
              {projectsData.map((project, idx) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.7 }}
                  className={`bg-white p-4 md:p-12 rounded-none border-r-4 border-slate-950 shadow-xl shadow-slate-100 ${project.id === 'p4' ? 'cursor-pointer hover:bg-slate-50 transition-colors' : ''}`}
                  onClick={() => project.id === 'p4' && setSelectedProject(project)}
                >
                  <div className="flex flex-col gap-6">
                    <div className="text-right">
                      <h4 className="text-2xl md:text-5xl font-extrabold mt-3 mb-4 text-slate-950 tracking-tight">{project.title}</h4>
                      <p className="text-slate-600 leading-relaxed text-base md:text-xl max-w-3xl">{project.description}</p>
                    </div>
                    
                    {project.stages && (
                      <div className="bg-slate-50 p-3 md:p-10 rounded-xl border border-slate-100">
                        <div className="space-y-6">
                          <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-4 md:mx-0 md:px-0 scrollbar-hide">
                            {project.stages.map((stage, i) => (
                              <button
                                key={i}
                                id={`btn-${project.id}-${i}`}
                                data-target-category={i}
                                onClick={(e) => { 
                                  e.stopPropagation(); 
                                  const container = document.getElementById(`gallery-${project.id}`);
                                  const firstItem = container?.querySelector(`[data-category="${i}"]`);
                                  if (firstItem) {
                                    firstItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                                  }
                                  setActiveStages(prev => ({...prev, [project.id]: i}));
                                }}
                                className={`px-4 py-2 rounded-full font-bold text-xs md:text-sm whitespace-nowrap transition-all border-2 ${
                                  (activeStages[project.id] || 0) === i 
                                    ? 'bg-slate-950 text-white border-slate-950' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                                }`}
                              >
                                {stage.title}
                              </button>
                            ))}
                          </div>
                          <div 
                            id={`gallery-${project.id}`}
                            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide"
                            ref={(el) => {
                              if (!el) return;
                              const observer = new IntersectionObserver((entries) => {
                                entries.forEach(entry => {
                                  if (entry.isIntersecting) {
                                    const category = parseInt(entry.target.getAttribute('data-category') || '0');
                                    setActiveStages(prev => {
                                      if (prev[project.id] !== category) {
                                        // Find the button container and the active button
                                        const buttonsContainer = entry.target.closest('.space-y-6')?.querySelector('.overflow-x-auto') as HTMLElement;
                                        const activeButton = document.getElementById(`btn-${project.id}-${category}`);
                                        
                                        if (buttonsContainer && activeButton) {
                                          const scrollPos = activeButton.offsetLeft - (buttonsContainer.offsetWidth / 2) + (activeButton.offsetWidth / 2);
                                          buttonsContainer.scrollTo({ left: scrollPos, behavior: 'smooth' });
                                        }
                                        return {...prev, [project.id]: category};
                                      }
                                      return prev;
                                    });
                                  }
                                });
                              }, { root: el, rootMargin: '0px -40% 0px -40%', threshold: 0 });
                              
                              el.querySelectorAll('.gallery-item').forEach(item => observer.observe(item));
                            }}
                          >
                            {project.stages.flatMap((stage, stageIdx) => 
                              stage.images.map((img, imgIdx) => (
                                <div 
                                  key={`${stageIdx}-${imgIdx}`} 
                                  data-category={stageIdx}
                                  className="gallery-item flex-shrink-0 w-64 snap-center flex flex-col items-center gap-2"
                                >
                                  <img 
                                    src={img} 
                                    alt={`${stage.title} ${imgIdx+1}`} 
                                    className="rounded-lg w-full aspect-video object-cover" 
                                    referrerPolicy="no-referrer" 
                                  />
                                  <p className="text-sm font-medium text-slate-700">{stage.title}</p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {project.driveLink && project.id !== 'p4' && (
                      <div className="text-right pt-4">
                        <a 
                          href={project.driveLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-4 bg-white text-slate-950 px-10 py-4 border-2 border-slate-950 font-bold hover:bg-slate-950 hover:text-white transition-all text-base md:text-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          צפה בדוח המלא <span>&rarr;</span>
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[200] p-4 md:p-6" role="dialog" aria-modal="true">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col"
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-10 p-2 bg-white/50 backdrop-blur-md rounded-full text-slate-900 hover:bg-white transition-all"
                  aria-label="סגור"
                >
                  <X size={28} />
                </button>
                
                <div className="p-8 md:p-12 overflow-y-auto">
                  <div className="mb-10 border-b border-slate-100 pb-8">
                    <h3 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter mb-4">{selectedProject.title}</h3>
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl">{selectedProject.description}</p>
                  </div>
                  
                  {selectedProject.stages ? (
                    <div className="space-y-16">
                      {selectedProject.stages.map((stage, i) => {
                        const allProjectImages = selectedProject.stages!.flatMap(s => s.images);
                        const stageImagesOffset = selectedProject.stages!.slice(0, i).reduce((acc, s) => acc + s.images.length, 0);
                        
                        return (
                          <div key={i}>
                            <h4 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-black">{i + 1}</span>
                              {stage.title}
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {stage.images.map((img, j) => (
                                <div key={j} className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                                  <img 
                                    src={img} 
                                    alt={`${stage.title} ${j+1}`} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer" 
                                    referrerPolicy="no-referrer"
                                    onClick={() => setFullscreenImage({url: img, index: stageImagesOffset + j, allImages: allProjectImages})}
                                  />
                                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-full text-sm backdrop-blur-sm">הגדל</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : selectedProject.images && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedProject.images.map((img, i) => (
                        <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                          <img 
                            src={img} 
                            alt={`${selectedProject.title} ${i+1}`} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer" 
                            referrerPolicy="no-referrer"
                            onClick={() => setFullscreenImage({url: img, index: i, allImages: selectedProject.images!})}
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-full text-sm backdrop-blur-sm">הגדל</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Fullscreen Image Viewer */}
        <AnimatePresence>
          {fullscreenImage && (
            <div className="fixed inset-0 bg-black z-[300] flex items-center justify-center p-4" role="dialog" aria-modal="true">
              <button 
                onClick={() => setFullscreenImage(null)}
                className="absolute top-6 right-6 text-white hover:text-slate-300 z-10"
                aria-label="סגור"
              >
                <X size={40} />
              </button>
              
              {fullscreenImage.index > 0 && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setFullscreenImage({url: fullscreenImage.allImages[fullscreenImage.index - 1], index: fullscreenImage.index - 1, allImages: fullscreenImage.allImages})}}
                  className="absolute right-6 text-white hover:text-slate-300 z-10"
                  aria-label="תמונה קודמת"
                >
                  <ChevronLeft size={40} className="rotate-180" />
                </button>
              )}
              
              <img src={fullscreenImage.url} alt="Full screen" className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
              
              {fullscreenImage.index < fullscreenImage.allImages.length - 1 && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setFullscreenImage({url: fullscreenImage.allImages[fullscreenImage.index + 1], index: fullscreenImage.index + 1, allImages: fullscreenImage.allImages})}}
                  className="absolute left-6 text-white hover:text-slate-300 z-10"
                  aria-label="תמונה הבאה"
                >
                  <ChevronLeft size={40} />
                </button>
              )}
            </div>
          )}
        </AnimatePresence>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-slate-50 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="technical-label">לקוחות ממליצים</div>
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[1.1]">המלצות <br /><span className="text-accent">של לקוחות.</span></h3>
              <button 
                onClick={() => setShowTestimonialModal(true)}
                className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-all"
                aria-label="הוסף המלצה משלך"
              >
                הוסף המלצה משלך
              </button>
            </div>

            {/* Testimonial Modal */}
            <AnimatePresence>
              {showTestimonialModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-6" role="dialog" aria-modal="true" aria-label="הוסף המלצה">
                  <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
                    {testimonialSubmitted ? (
                      <div className="text-center">
                        <h4 className="text-2xl font-black mb-6">תודה רבה!</h4>
                        <p className="mb-6">ההמלצה שלך נשלחה בהצלחה.</p>
                        <button 
                          onClick={() => {
                            setShowTestimonialModal(false);
                            setTestimonialSubmitted(false);
                            setTestimonialName("");
                            setTestimonialText("");
                          }}
                          className="bg-slate-900 text-white px-8 py-2 rounded-full font-bold hover:bg-slate-800 transition-all"
                        >
                          סגור
                        </button>
                      </div>
                    ) : (
                      <>
                        <h4 className="text-2xl font-black mb-6">הוסף המלצה</h4>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="testimonial-name" className="sr-only">שם מלא</label>
                            <input 
                              id="testimonial-name"
                              type="text" 
                              placeholder="שם מלא" 
                              className="w-full p-3 border border-slate-300 rounded-lg"
                              value={testimonialName}
                              onChange={(e) => setTestimonialName(e.target.value)}
                              aria-label="שם מלא"
                            />
                          </div>
                          <div>
                            <label htmlFor="testimonial-text" className="sr-only">ההמלצה שלך</label>
                            <textarea 
                              id="testimonial-text"
                              placeholder="כתוב את ההמלצה שלך..." 
                              className="w-full p-3 border border-slate-300 rounded-lg h-32"
                              value={testimonialText}
                              onChange={(e) => setTestimonialText(e.target.value)}
                              aria-label="כתוב את ההמלצה שלך"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                          <button 
                            onClick={() => setShowTestimonialModal(false)}
                            className="px-6 py-2 text-slate-600 font-bold"
                          >
                            ביטול
                          </button>
                          <button 
                            onClick={() => {
                              if (testimonialName && testimonialText) {
                                setTestimonialSubmitted(true);
                              }
                            }}
                            className="bg-accent text-white px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition-all"
                          >
                            שלח המלצה
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </AnimatePresence>

            <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide">
              {[
                { name: "ישראל כהן", text: "הייתה לנו נזילה סמויה בקיר שלא הבנו מאיפה היא מגיעה. הצוות של OVER הנדסה הגיע עם ציוד מתקדם, איתר את הבעיה תוך דקות וחסך לנו המון כסף על שיפוצים מיותרים. שירות מקצועי ואישי." },
                { name: "מיכל לוי", text: "לפני שקנינו את הדירה, הזמנו אותם לבדק בית. הם מצאו ליקויים שלא היינו חולמים לבדוק בעצמנו. בזכות הדוח המפורט שלהם, הקבלן נאלץ לתקן הכל לפני המסירה. שווה כל שקל." },
                { name: "דוד אברהם", text: "בנינו בית פרטי ולקחנו את OVER הנדסה לפיקוח. הם היו העיניים שלנו בשטח. הקפידו על כל פרט, מנעו טעויות של קבלני משנה וחסכו לנו המון כאב ראש. ממליץ בחום!" },
                { name: "אבי כהן", text: "אמינות זה שם המשחק אצלם. עמדו בלוחות זמנים, היו זמינים לכל שאלה והסבירו הכל בגובה העיניים. מרגישים שיש על מי לסמוך." },
                { name: "רונית ששון", text: "הזמנתי אותם לשמאות נזקי רכוש אחרי הצפה. הם עשו עבודה יסודית, הפיקו דוח מקצועי שהתקבל ללא עוררין על ידי חברת הביטוח. פשוט מקצוענים." },
                { name: "יוסי לוי", text: "פרויקט שיפוץ מורכב שהפך לחוויה טובה בזכות הפיקוח של OVER הנדסה. הם מנעו מאיתנו טעויות יקרות ודאגו שהקבלן יעבוד לפי התקנים." },
                { name: "אורית גולן", text: "השירות הכי טוב שקיבלתי בתחום הבנייה. זמינים, אדיבים ומקצועיים. אין ספק שאפנה אליהם שוב בעתיד." }
              ].map((t, i) => (
                <motion.div 
                  key={i}
                  className="bg-white p-8 border border-slate-200 flex-shrink-0 w-80 snap-start"
                >
                  <p className="text-md mb-6 text-slate-600 leading-relaxed italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-slate-900"></div>
                    <div className="font-black text-slate-900 uppercase tracking-widest text-xs">{t.name}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="contact" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden flex flex-col lg:flex-row">
              {/* Contact Details */}
              <div className="lg:w-2/5 p-12 lg:p-16 lg:pl-12 text-white">
                <h3 className="text-4xl font-black mb-12 tracking-tight">צור קשר</h3>
                <div className="space-y-8 pl-8">
                  <div className="flex items-center justify-start gap-4 text-right">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <a href={`tel:${PHONE_NUMBER}`} className="text-lg md:text-2xl font-bold hover:text-accent transition-colors text-right" style={{ direction: 'ltr' }}>{PHONE_NUMBER}</a>
                  </div>
                  <div className="flex items-center justify-start gap-4 text-right">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <a href="mailto:Samehover@gmail.com" className="text-lg md:text-2xl font-bold hover:text-accent transition-colors text-right" style={{ direction: 'ltr' }}>Samehover@gmail.com</a>
                  </div>
                  <div className="flex items-center justify-start gap-4 text-right">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-accent flex-shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-right">פריסה ארצית</div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div id="contact-form-section" className="lg:w-2/3 p-10 md:p-16 bg-white">
                <form ref={form} onSubmit={handleFormSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <input 
                      name="name"
                      type="text" 
                      required
                      className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-950 text-lg transition-all"
                      placeholder="שם מלא"
                    />
                    <input 
                      name="phone"
                      type="tel" 
                      required
                      className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-950 text-lg transition-all"
                      placeholder="מספר טלפון"
                    />
                  </div>
                  <select 
                    name="subject"
                    required
                    className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-950 text-lg transition-all"
                  >
                    <option value="">בחר שירות</option>
                    {servicesData.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                    <option value="אחר">אחר</option>
                  </select>
                  <textarea 
                    name="message"
                    rows={4}
                    className="w-full p-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-slate-950 text-lg transition-all"
                    placeholder="איך נוכל לעזור?"
                  ></textarea>
                  <button type="submit" className="w-full bg-slate-950 text-white py-5 rounded-2xl font-black text-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl">
                    שלח הודעה
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16" role="contentinfo">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <img 
              src="https://lh3.googleusercontent.com/u/0/d/1VzP5uKM2xi2LmxDqE-AIvzI68uhL-LXv" 
              alt="לוגו OVER הנדסה" 
              className="h-20 w-auto"
              referrerPolicy="no-referrer"
            />
            <nav className="flex flex-row gap-2 md:gap-8 text-xs md:text-base" aria-label="תפריט תחתון">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} className="text-slate-400 hover:text-white transition-colors whitespace-nowrap">
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
          <div className="pt-12 border-t border-slate-800 text-center text-slate-500">
            <p>© {new Date().getFullYear()} OVER הנדסה. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>

      {/* Contact Success Modal */}
      {showContactSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl text-center">
            <h4 className="text-2xl font-black mb-6">תודה רבה!</h4>
            <p className="mb-6">הפרטים התקבלו בהצלחה. ניצור איתך קשר בהקדם.</p>
            <button 
              onClick={() => setShowContactSuccess(false)}
              className="bg-slate-900 text-white px-8 py-2 rounded-full font-bold hover:bg-slate-800 transition-all"
            >
              סגור
            </button>
          </div>
        </div>
      )}
      
      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={closeService}
            role="dialog"
            aria-modal="true"
            aria-label={`פרטי שירות: ${selectedService.title}`}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[95vh] flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              dir="rtl"
            >
              {/* Image Section - Smaller on mobile */}
              <div className="relative bg-slate-100 h-48 md:h-64 flex-shrink-0">
                <img 
                  src={selectedService.mainImage} 
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={closeService}
                  className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-full text-slate-900 hover:bg-white transition-colors"
                  aria-label="סגור חלון"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Details Section - Optimized for mobile */}
              <div className="p-6 md:p-10 flex flex-col overflow-y-auto">
                <div className="w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4">
                  <selectedService.icon size={20} aria-hidden="true" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight">{selectedService.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-base md:text-lg">
                  {selectedService.fullDesc}
                </p>
                
                <div className="mt-auto pt-4">
                  <a 
                    href={`tel:${PHONE_NUMBER}`}
                    className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-colors relative z-50 pointer-events-auto"
                    aria-label={`חייג לייעוץ וקביעת פגישה: ${PHONE_NUMBER}`}
                  >
                    <Phone size={18} />
                    לייעוץ וקביעת פגישה
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
