/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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

const WHATSAPP_NUMBER = "972500000000"; // Placeholder number
const PHONE_NUMBER = "050-0000000"; // Placeholder number

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
    title: "איתור נזילות ורטיבות",
    icon: Droplets,
    shortDesc: "איתור מדויק של מקור הרטיבות ללא הרס באמצעות מצלמות תרמיות ומדדי לחות מתקדמים.",
    fullDesc: "שירות הדגל שלנו. אנו מתמחים באיתור מקורות חדירת מים ונזילות סמויות במבנים, דירות ופנטהאוזים. באמצעות שימוש בטכנולוגיה מתקדמת כגון מצלמות תרמיות, מדי לחות, וסיבים אופטיים, אנו מאתרים את הבעיה בדיוק מרבי וללא צורך בהרס מיותר. השירות כולל הפקת דוח מפורט המציג את מקור הכשל והמלצות לתיקון, מה שחוסך ללקוחותינו עשרות אלפי שקלים ועוגמת נפש.",
    mainImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "inspection",
    title: "בדק בית מקיף",
    icon: ShieldCheck,
    shortDesc: "בדיקת 360 מעלות לנכסים יד שנייה או דירות קבלן לאיתור ליקויים נסתרים לפני חתימה או מסירה.",
    fullDesc: "בדיקה יסודית ומקיפה של הנכס לפני רכישה או קבלת מפתח מקבלן. המהנדסים המומחים שלנו סורקים את הנכס מן המסד ועד הטפחות, כולל בדיקות שלד, מערכות אינסטלציה, חשמל, איטום, ריצוף וחיפויים. אנו מאתרים ליקויי בנייה נסתרים וחריגות מהתקן, ומספקים דוח הנדסי מפורט המאפשר לכם לדרוש תיקונים או להפחית את מחיר הנכס, ומבטיח לכם שקט נפשי.",
    mainImage: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "legal",
    title: "חוות דעת משפטית",
    icon: Scale,
    shortDesc: "הפקת דוחות מומחה הנדסיים קבילים בבית משפט לניצחון במאבקים מול קבלנים ויזמים.",
    fullDesc: "כאשר מתגלים ליקויי בנייה חמורים והקבלן מתנער מאחריות, אנו מספקים חוות דעת מומחה הנדסית הקבילה בבתי משפט. הדוחות שלנו מנוסחים בקפידה, מגובים בתקנים הישראליים, וכוללים תיעוד מצולם והערכת עלויות תיקון. הניסיון הרב שלנו במתן עדות מומחה בערכאות משפטיות מסייע ללקוחותינו למצות את זכויותיהם ולקבל את הפיצוי המגיע להם.",
    mainImage: "https://shpak-law.com/wp-content/uploads/2020/03/Litigation.jpg",
  },
  {
    id: "supervision",
    title: "פיקוח ובקרת איכות",
    icon: HardHat,
    shortDesc: "פיקוח צמוד על פרויקטים המבטיח בנייה בטיחותית, איכותית ובהתאם לתקנים המחמירים.",
    fullDesc: "שירותי פיקוח הנדסי ובקרת איכות לפרויקטים בבנייה, כולל תמ״א 38, פינוי בינוי ובנייה פרטית. אנו משמשים כ'עיניים שלכם בשטח', מוודאים שהקבלן עובד לפי התוכניות, המפרטים והתקנים. אנו מבצעים בדיקות איכות בכל שלבי הבנייה - החל מיציקות השלד, דרך התקנת המערכות ועד לגמרים. נוכחותנו מונעת ליקויים עתידיים ומבטיחה קבלת תוצר איכותי ובטיחותי.",
    mainImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "appraisal",
    title: "שמאות נזקים ומבנים",
    icon: Calculator,
    shortDesc: "הערכת שווי נזקים במבנים, ירידת ערך, ואומדן עלויות שיקום ותיקון.",
    fullDesc: "שירותי שמאות מקיפים להערכת נזקים במבנים כתוצאה מליקויי בנייה, נזקי מים, שריפות או פגעי טבע. אנו מספקים דוחות שמאות מפורטים הכוללים אומדן מדויק של עלויות השיקום, חישוב ירידת ערך הנכס, וחוות דעת מקצועית הנדרשת מול חברות הביטוח, קבלנים וערכאות משפטיות.",
    mainImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `שלום, שמי ${formData.name}. הטלפון שלי הוא ${formData.phone}. הודעה: ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
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
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-300 ${(scrolled && !isMenuOpen) ? 'glass-header py-3' : 'bg-transparent py-6'}`}
        id="main-header"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
            src="https://lh3.googleusercontent.com/u/0/d/1VzP5uKM2xi2LmxDqE-AIvzI68uhL-LXv" 
            alt="OVER הנדסה" 
            className={`h-16 md:h-24 w-auto transition-all ${(scrolled && !isMenuOpen) ? '' : 'brightness-0 invert drop-shadow-md'}`}
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
      <section id="home" className="hero-section min-h-[80vh] flex items-center pt-24 relative overflow-hidden">
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
              
              <h1 className="text-5xl md:text-[8rem] font-black text-white leading-[1.1] mb-6 tracking-tighter">
                לא משאירים מקום <br />
                <span className="text-accent">לספק.</span>
              </h1>
              
              <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                <div className="max-w-xl">
                  <p className="text-xl md:text-2xl text-slate-200 leading-tight font-light pr-8 py-2">
                    מומחים באיתור נזילות ורטיבות, בדק בית מקיף וחוות דעת משפטיות. טכנולוגיה מתקדמת וניסיון של עשרות שנים כדי להגן על הנכס שלכם.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-8 border-r border-white/10 pr-8">
                  <div>
                    <div className="technical-label">Experience</div>
                    <div className="text-4xl font-black text-white">30+</div>
                    <div className="text-slate-400 text-xs font-bold uppercase">שנות ניסיון</div>
                  </div>
                  <div>
                    <div className="technical-label">Precision</div>
                    <div className="text-4xl font-black text-white">100%</div>
                    <div className="text-slate-400 text-xs font-bold uppercase">דיוק הנדסי</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                <a 
                  href={`tel:${PHONE_NUMBER}`}
                  className="bg-accent text-white px-12 py-6 rounded-lg font-black text-2xl flex items-center justify-center gap-4 hover:bg-accent-hover transition-all shadow-2xl shadow-accent/40 hover:-translate-y-2"
                >
                  <Phone size={28} />
                  חייג עכשיו לייעוץ
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="bg-white/5 backdrop-blur-xl border border-white/20 text-white px-12 py-6 rounded-lg font-black text-2xl flex items-center justify-center gap-4 hover:bg-white hover:text-slate-900 transition-all hover:-translate-y-2"
                >
                  השארת פרטים
                  <ClipboardCheck size={28} />
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
      <section id="about" className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000" 
                  alt="Civil Engineering Professional" 
                  className="rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="technical-label">About the Company</div>
              <h2 className="text-5xl md:text-7xl font-black mb-10 text-slate-900 leading-[1.1]">
                OVER הנדסה <br />
                <span className="text-accent">העיניים שלכם בשטח.</span>
              </h2>
              
              <div className="space-y-8 text-xl text-slate-600 leading-relaxed">
                <p className="font-medium text-slate-900">
                  רכישת נכס היא ההשקעה הגדולה בחייכם. חברת OVER הנדסה קיימת כדי לוודא שההשקעה הזו בטוחה, תקינה ונטולת הפתעות יקרות.
                </p>
                <p>
                  עם קרוב ל-30 שנות ניסיון, הפכנו לסמכות המובילה בישראל באיתור ליקויי בנייה מורכבים – בדגש על בעיות רטיבות ונזילות סמויות. אנו משתמשים בטכנולוגיה התרמית המתקדמת בעולם כדי לראות את מה שהעין האנושית מפספסת, וחוסכים ללקוחותינו עוגמת נפש והוצאות עתק.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10">
                  {[
                    "מומחיות באיתור רטיבות",
                    "טכנולוגיה תרמית מתקדמת",
                    "חיסכון של עשרות אלפי שקלים",
                    "דוחות קבילים בבית משפט"
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
      <section id="services" className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-3xl">
              <div className="technical-label text-accent">Our Services & Expertise</div>
              <h3 className="text-5xl md:text-8xl font-black leading-[1.1]">מומחיות <br />שחוסכת כסף.</h3>
            </div>
            <p className="text-2xl text-slate-400 max-w-md pr-8 py-2">
              מעטפת שירותים הנדסיים מקיפה, בדגש על איתור נזילות וליקויים נסתרים. לחצו על כל שירות למידע נוסף ותמונות מהשטח.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
      <section id="testimonials" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="technical-label">Client Feedback</div>
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
              { name: "ישראל כהן", text: "צוות המומחים הגיע לבדוק את הדירה החדשה שקנינו. המקצועיות שלהם פשוט מדהימה. הם מצאו דברים שאף אחד אחר לא ראה." },
              { name: "מיכל לוי", text: "שירות אדיב, מהיר ומקצועי ביותר. הדוח שקיבלנו היה מפורט מאוד ועזר לנו המון מול הקבלן." },
              { name: "דוד אברהם", text: "ממליץ בחום על OVER הנדסה. ניסיון של שנים שרואים בכל מילה ובכל בדיקה. שקט נפשי אמיתי." },
              { name: "אבי כהן", text: "שירות מעולה, עמדו בלוחות הזמנים וסיפקו עבודה ברמה הכי גבוהה שיש." },
              { name: "שרה לוי", text: "הם הצילו אותנו מנזילה נסתרת שגרמה להרס בבית. תודה רבה על המקצועיות!" }
            ].map((t, i) => (
              <motion.div 
                key={i}
                className="bg-white p-8 border border-slate-200 flex-shrink-0 w-80 snap-start"
              >
                <div className="flex gap-1 mb-4 text-accent">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                </div>
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
      <section id="contact" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row border border-slate-200">
            <div className="lg:w-1/2 bg-slate-900 p-12 lg:p-24 text-white relative overflow-hidden">
              <div className="hero-grid opacity-10"></div>
              <div className="relative z-10">
                <div className="technical-label text-accent">Contact</div>
                <h3 className="text-5xl md:text-7xl font-black mb-16 leading-none">בואו נדבר <br />הנדסה.</h3>
                
                <div className="space-y-12">
                  <div className="flex items-start gap-8">
                    <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-accent">
                      <Phone size={24} />
                    </div>
                    <div>
                      <div className="technical-label">Phone</div>
                      <a href={`tel:${PHONE_NUMBER}`} className="text-3xl font-black hover:text-accent transition-colors">{PHONE_NUMBER}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-8">
                    <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-accent">
                      <Mail size={24} />
                    </div>
                    <div>
                      <div className="technical-label">Email</div>
                      <div className="text-2xl font-black">office@over-eng.co.il</div>
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
                  <label className="technical-label">Message</label>
                  <textarea 
                    rows={3}
                    className="w-full bg-transparent border-none focus:ring-0 text-xl font-black p-0 resize-none"
                    placeholder="איך נוכל לעזור?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full py-6 text-2xl uppercase tracking-tighter">
                  שלח הודעה בוואטסאפ
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
            <div className="text-3xl font-black tracking-tighter">
              OVER <span className="text-accent">הנדסה</span>
            </div>
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
              className="bg-white rounded-2xl overflow-hidden max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              dir="rtl"
            >
              {/* Image Section */}
              <div className="md:w-1/2 relative bg-slate-100 flex items-center justify-center h-64 md:h-auto">
                <img 
                  src={selectedService.mainImage} 
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Details Section */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col relative overflow-y-auto">
                <button 
                  onClick={closeService}
                  className="absolute top-6 left-6 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <X size={24} />
                </button>
                
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-6">
                  <selectedService.icon size={24} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-6 leading-tight">{selectedService.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                  {selectedService.fullDesc}
                </p>
                
                <div className="mt-auto pt-8 border-t border-slate-100">
                  <a 
                    href={`tel:${PHONE_NUMBER}`}
                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-colors"
                  >
                    <Phone size={20} />
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
