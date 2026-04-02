/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Search, 
  ClipboardCheck, 
  Star, 
  Menu, 
  X, 
  ArrowLeft,
  Mail,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Droplets,
  HardHat,
  Scale,
  Calculator
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

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [testimonialName, setTestimonialName] = useState("");
  const [testimonialText, setTestimonialText] = useState("");
  const [testimonialSubmitted, setTestimonialSubmitted] = useState(false);
  const [showContactSuccess, setShowContactSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted, attempting to save to Firestore...");
    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: new Date()
      });
      console.log("Data saved successfully!");
      setShowContactSuccess(true);
      setFormData({ name: '', phone: '', service: '', message: '' });
    } catch (error) {
      console.error("Error saving to Firestore:", error);
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
    <div className="min-h-screen">
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
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
            src="https://lh3.googleusercontent.com/u/0/d/1VzP5uKM2xi2LmxDqE-AIvzI68uhL-LXv" 
            alt="OVER הנדסה" 
            className={`h-12 md:h-24 w-auto transition-all ${(scrolled && !isMenuOpen) ? '' : 'brightness-0 invert drop-shadow-md'}`}
            referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
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
              className="bg-accent text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-accent-hover transition-all shadow-lg shadow-accent/20"
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
          >
            <div className="min-h-screen w-full flex items-center justify-center py-24 px-6">
              <div className="w-full max-w-md flex flex-col gap-12 items-center text-center" onClick={(e) => e.stopPropagation()}>
                <nav className="flex flex-col gap-8">
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
                    className="w-full bg-accent text-white py-6 rounded-2xl font-black text-2xl flex items-center justify-center gap-3 shadow-2xl shadow-accent/20"
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

      {/* Hero Section */}
      <section id="home" className="hero-section min-h-[80vh] flex items-center pt-16 relative overflow-hidden">
        {/* Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
          alt="OVER Engineering Background" 
          className="absolute inset-0 w-full h-full object-cover z-0"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlay to darken the background */}
        <div className="absolute inset-0 bg-slate-900/75 z-[1]"></div>

        <div className="hero-grid z-[2]"></div>
        <div className="hero-glow z-[2]"></div>
        <div className="scanline z-[2]"></div>
        
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
              
              <h1 className="text-4xl md:text-[6rem] font-black text-white leading-[1.1] mb-6 tracking-tighter">
                הנדסה ובדק בית,אבחון נזקי מים , פיקוח ובניה, שמאות רכוש.
              </h1>
              
              <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
                <div className="max-w-xl">
                  <p className="text-lg md:text-2xl text-slate-200 leading-tight font-light py-2">
                    פתרונות הנדסיים מקיפים לבית: בדק בית, ליקויי בנייה, שמאות ופיקוח - שירות מקצועי עם חוות דעת קבילות בבית משפט.
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
                  className="bg-accent text-white px-8 py-4 rounded-lg font-black text-xl flex items-center justify-center gap-3 hover:bg-accent-hover transition-all shadow-2xl shadow-accent/40"
                >
                  <Phone size={24} />
                  קבלו ייעוץ ראשוני ללא התחייבות
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="bg-white/5 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-lg font-black text-xl flex items-center justify-center gap-3 hover:bg-white hover:text-slate-900 transition-all"
                >
                  השארת פרטים
                  <ClipboardCheck size={24} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-12 left-12 hidden lg:block">
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
          alt="Engineering Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-5"
          referrerPolicy="no-referrer"
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
                  src="https://lh3.googleusercontent.com/d/1IgXaikWtZ8H_Drfa6GWpqbLNUBtTncMS" 
                  alt="Civil Engineering Professional" 
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
                  המשרד מנוהל על ידי איש מקצוע בעל ניסיון רב בתחום הבנייה, בקרת איכות וניהול פרויקטים, עם התמחות בליקויי בנייה ונזקי מים.
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
                        <CheckCircle2 size={24} />
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
            <div className="max-w-3xl">
              <h3 className="text-5xl md:text-8xl font-black leading-[1.1]">מומחיות <br />שחוסכת כסף.</h3>
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
                    <service.icon size={20} />
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="technical-label">לקוחות ממליצים</div>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[1.1]">המלצות <br /><span className="text-accent">של לקוחות.</span></h3>
            <button 
              onClick={() => setShowTestimonialModal(true)}
              className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-all"
            >
              הוסף המלצה משלך
            </button>
          </div>

          {/* Testimonial Modal */}
          {showTestimonialModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
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
                    <input 
                      type="text" 
                      placeholder="שם מלא" 
                      className="w-full p-3 mb-4 border border-slate-300 rounded-lg"
                      value={testimonialName}
                      onChange={(e) => setTestimonialName(e.target.value)}
                    />
                    <textarea 
                      placeholder="כתוב את ההמלצה שלך..." 
                      className="w-full p-3 mb-6 border border-slate-300 rounded-lg h-32"
                      value={testimonialText}
                      onChange={(e) => setTestimonialText(e.target.value)}
                    />
                    <div className="flex justify-end gap-4">
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
      
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row border border-slate-200">
            <div className="lg:w-1/2 bg-slate-900 p-12 lg:p-24 text-white relative overflow-hidden">
              <div className="hero-grid opacity-10"></div>
              <div className="relative z-10">
                <div className="technical-label text-accent">צור קשר</div>
                <h3 className="text-5xl md:text-7xl font-black mb-16 leading-none">בואו נדבר <br />הנדסה.</h3>
                
                <div className="space-y-12">
                  <div className="flex items-start gap-8">
                    <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-accent">
                      <Phone size={24} />
                    </div>
                    <div>
                      <div className="technical-label">Phone</div>
                      <a href={`tel:${PHONE_NUMBER}`} className="text-3xl font-black hover:text-accent transition-colors outline-none">{PHONE_NUMBER}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-8">
                    <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-accent">
                      <Mail size={24} />
                    </div>
                    <div>
                      <div className="technical-label">Email</div>
                      <div className="text-2xl font-black">Samehover@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-8">
                    <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-accent">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div className="technical-label">Location</div>
                      <div className="text-2xl font-black">פריסה ארצית</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 p-12 lg:p-24 bg-white">
              <form onSubmit={handleFormSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="border-b-2 border-slate-100 focus-within:border-accent transition-colors py-2">
                    <label className="technical-label">Full Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-transparent border-none focus:ring-0 text-xl font-black p-0"
                      placeholder="הכנס את שמך"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="border-b-2 border-slate-100 focus-within:border-accent transition-colors py-2">
                    <label className="technical-label">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full bg-transparent border-none focus:ring-0 text-xl font-black p-0"
                      placeholder="05X-XXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="border-b-2 border-slate-100 focus-within:border-accent transition-colors py-2">
                  <label className="technical-label">Service</label>
                  <select 
                    required
                    className="w-full bg-transparent border-none focus:ring-0 text-xl font-black p-0"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="">בחר שירות</option>
                    {servicesData.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                    <option value="אחר">אחר</option>
                  </select>
                </div>
                <div className="border-b-2 border-slate-100 focus-within:border-accent transition-colors py-2">
                  <label className="technical-label">Message</label>
                  <textarea 
                    rows={3}
                    className="w-full bg-transparent border-none focus:ring-0 text-xl font-black p-0 resize-none"
                    placeholder="איך נוכל לעזור?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full py-6 text-2xl uppercase tracking-tighter outline-none">
                  שלח הודעה
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <img 
              src="https://lh3.googleusercontent.com/u/0/d/1VzP5uKM2xi2LmxDqE-AIvzI68uhL-LXv" 
              alt="OVER הנדסה" 
              className="h-20 w-auto"
              referrerPolicy="no-referrer"
            />
            <div className="flex gap-8">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} className="text-slate-400 hover:text-white transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
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
                >
                  <X size={20} />
                </button>
              </div>

              {/* Details Section - Optimized for mobile */}
              <div className="p-6 md:p-10 flex flex-col overflow-y-auto">
                <div className="w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4">
                  <selectedService.icon size={20} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight">{selectedService.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-base md:text-lg">
                  {selectedService.fullDesc}
                </p>
                
                <div className="mt-auto pt-4">
                  <a 
                    href={`tel:${PHONE_NUMBER}`}
                    className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-colors"
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
                >
                  <X size={20} />
                </button>
              </div>

              {/* Details Section - Optimized for mobile */}
              <div className="p-6 md:p-10 flex flex-col overflow-y-auto">
                <div className="w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4">
                  <selectedService.icon size={20} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight">{selectedService.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-base md:text-lg">
                  {selectedService.fullDesc}
                </p>
                
                <div className="mt-auto pt-4">
                  <a 
                    href={`tel:${PHONE_NUMBER}`}
                    className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-colors"
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
