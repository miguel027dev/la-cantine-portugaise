import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, MotionConfig, motion, useAnimationControls, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, MapPin, Phone, Menu as MenuIcon, X, Pause, Play, ExternalLink, Globe2, ChevronDown, Check } from 'lucide-react';
import { CONTACT, MENU, HOURS } from './data';
import { LANGUAGES, translations } from './translations';
import './styles.css';

const ease=[.16,1,.3,1];
const LocaleContext=createContext(null);
const useLocale=()=>useContext(LocaleContext);
const dishImages=[
 {image:'/images/hero-light.webp',fallback:'/images/francesinha.jpg'},
 {image:'/images/pastel-light.webp',fallback:'/images/pastel.jpg'},
 {image:'/images/chicken.jpg'},
];
const menuPrices=Object.values(MENU).map(items=>items.map(item=>item.price));
const assetPath=value=>value?.startsWith('/')?import.meta.env.BASE_URL+value.slice(1):value;
const validLocale=value=>Object.hasOwn(translations,value);
function initialLocale(){try{const stored=localStorage.getItem('cantine-language');return validLocale(stored)?stored:'fr'}catch{return 'fr'}}
function LocaleProvider({children}){
 const [locale,setLocale]=useState(initialLocale);
 const t=translations[locale];
 useEffect(()=>{
  document.documentElement.lang=locale;
  document.title=t.title;
  for(const [selector,value] of [['meta[name="description"]',t.description],['meta[property="og:title"]',t.title],['meta[property="og:description"]',t.description]]) document.querySelector(selector)?.setAttribute('content',value);
  try{localStorage.setItem('cantine-language',locale)}catch{}
 },[locale,t]);
 return <LocaleContext.Provider value={{locale,t,setLocale:value=>{if(validLocale(value))setLocale(value)}}}>{children}<span className="sr-only" role="status" aria-live="polite" aria-atomic="true">{t.languageChanged}</span></LocaleContext.Provider>;
}
function Lines({items}){return items.map((line,i)=><React.Fragment key={i}>{i>0&&<br/>}{line}</React.Fragment>)}
function Photo({src,alt,className='',fallback,priority=false}){
 const [failed,setFailed]=useState(false);
 useEffect(()=>setFailed(false),[src]);
 return <img className={className} src={assetPath(failed?(fallback||'/images/room.jpg'):src)} alt={alt} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async" onError={()=>{if(!failed)setFailed(true)}}/>;
}
function Book({className='',children}){const {t}=useLocale();return <motion.a className={`button ${className}`} href={CONTACT.booking} target="_blank" rel="noreferrer" whileTap={{scale:.97}}>{children||t.book}<ArrowUpRight size={19}/></motion.a>}
function Brand(){const {t}=useLocale();return <a href="#accueil" className="brand" aria-label={t.homeLabel}><span>la cantine</span><b>portugaise<span className="brand-dot">.</span></b></a>}
function LanguageSwitch(){
 const {locale,t,setLocale}=useLocale();
 const [open,setOpen]=useState(false);
 const root=useRef(null),trigger=useRef(null),options=useRef([]);
 const reduced=useReducedMotion();
 const selected=LANGUAGES.findIndex(language=>language.id===locale);
 useEffect(()=>{if(open)options.current[selected]?.focus()},[open]);
 useEffect(()=>{if(!open)return;const outside=e=>{if(!root.current?.contains(e.target))setOpen(false)};document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside)},[open]);
 const close=()=>{setOpen(false);trigger.current?.focus()};
 const choose=id=>{setLocale(id);close()};
 const keys=(e,i)=>{
  let next;
  if(e.key==='ArrowDown')next=(i+1)%LANGUAGES.length;
  if(e.key==='ArrowUp')next=(i-1+LANGUAGES.length)%LANGUAGES.length;
  if(e.key==='Home')next=0;
  if(e.key==='End')next=LANGUAGES.length-1;
  if(next!==undefined){e.preventDefault();options.current[next]?.focus()}
  if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close()}
  if(e.key==='Tab')setOpen(false);
 };
 return <div className="language-switch" ref={root}>
  <motion.button className="language-trigger" ref={trigger} type="button" aria-label={t.languageLabel} aria-haspopup="menu" aria-expanded={open} aria-controls="language-menu" onClick={()=>setOpen(value=>!value)} onKeyDown={e=>{if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();setOpen(true)}if(e.key==='Escape')close()}} whileTap={{scale:.94}}>
   <Globe2 size={17}/><span className="language-code"><AnimatePresence mode="popLayout" initial={false}><motion.span key={locale} initial={{opacity:0,y:reduced?0:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:-6}} transition={{duration:.16}}>{LANGUAGES[selected].code}</motion.span></AnimatePresence></span><motion.span className="language-chevron" animate={{rotate:open?180:0}} transition={{duration:.2}}><ChevronDown size={14}/></motion.span>
  </motion.button>
  <AnimatePresence>{open&&<motion.div className="language-popover" initial={{opacity:0,y:reduced?0:-7,scale:reduced?1:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:reduced?0:-7,scale:reduced?1:.97}} transition={{type:'spring',bounce:0,duration:reduced?.12:.28}}>
   <div className="language-heading"><Globe2 size={19}/><div><p>{t.languageTitle}</p><span>{t.languageHint}</span></div></div>
   <div id="language-menu" role="menu" aria-label={t.languageTitle}>{LANGUAGES.map((language,i)=><button key={language.id} ref={el=>options.current[i]=el} type="button" role="menuitemradio" aria-checked={locale===language.id} tabIndex={locale===language.id?0:-1} onClick={()=>choose(language.id)} onKeyDown={e=>keys(e,i)} className="language-option">
    {locale===language.id&&<motion.span className="language-selected" layoutId="language-selected" transition={{type:'spring',bounce:0,duration:.3}}/>}<span className="language-option-code">{language.code}</span><span className="language-name" lang={language.id}>{language.name}{language.id==='pt-PT'&&<small>Portugal</small>}</span>{locale===language.id&&<Check size={17}/>}
   </button>)}</div>
  </motion.div>}</AnimatePresence>
 </div>;
}
function Header(){
 const {t}=useLocale();const [open,setOpen]=useState(false);const buttonRef=useRef(null);
 useEffect(()=>{if(!open)return;const onKey=e=>{if(e.key==='Escape'){setOpen(false);buttonRef.current?.focus()}};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[open]);
 const links=['#table','#specialites','#carte','#contact'];
 return <header className="header"><Brand/><nav className="desktop-nav" aria-label={t.navLabel}>{links.map((href,i)=><a key={href} href={href}>{t.nav[i]}</a>)}</nav><div className="header-actions"><LanguageSwitch/><Book className="header-book"/><button className="nav-toggle" ref={buttonRef} onClick={()=>setOpen(v=>!v)} aria-label={open?t.closeMenu:t.openMenu} aria-expanded={open} aria-controls="mobile-nav">{open?<X/>:<MenuIcon/>}</button></div><AnimatePresence>{open&&<motion.nav id="mobile-nav" className="mobile-nav" aria-label={t.mobileNav} initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.22}}>{links.map((href,i)=><a key={href} href={href} onClick={()=>setOpen(false)}>{t.nav[i]}<ArrowUpRight size={20}/></a>)}<Book/></motion.nav>}</AnimatePresence></header>;
}
function Hero(){const {t}=useLocale();const reduced=useReducedMotion();return <section id="accueil" className="hero"><div className="hero-copy"><h1>{t.heroTitle.map((line,i)=><span className="line-mask" key={i}><motion.span initial={false} animate={reduced?{}:{transform:['translateY(105%)','translateY(0%)']}} transition={{duration:.8,delay:i*.12,ease}}>{line}</motion.span></span>)}</h1><div className="hero-intro"><span className="eyebrow">LA CANTINE PORTUGAISE · NANTES</span><p><Lines items={t.heroIntro}/></p><div className="hero-actions"><Book/><a className="plain-link" href="#carte">{t.explore}<ArrowDown size={17}/></a></div></div></div><div className="hero-image"><Photo src="/images/hero-light.webp" fallback="/images/francesinha.jpg" alt={t.heroAlt} priority/><span className="hero-seal" aria-hidden="true"><span>PORTUGAL</span><svg viewBox="0 0 72 72" fill="none"><path d="M36 5C36 22 22 36 5 36c17 0 31 14 31 31 0-17 14-31 31-31C50 36 36 22 36 5Z" stroke="currentColor" strokeWidth="2"/><circle cx="36" cy="36" r="10" stroke="currentColor" strokeWidth="2"/></svg><span>{t.atNantes}</span></span><div className="photo-caption"><p><Lines items={t.heroCaption}/></p><a className="down" href="#specialites" aria-label={t.discover}><ArrowDown size={24}/></a></div></div><div className="hero-bottom"><a href="#contact"><MapPin size={16}/>57 Quai Magellan · Nantes</a><span>{t.foodCredit}</span></div></section>}
function TasteBand(){const {t}=useLocale();return <div className="taste-band" aria-label={t.cuisine}>{t.band.map((item,i)=><React.Fragment key={i}>{i>0&&<span aria-hidden="true">✳</span>}<span>{item}</span></React.Fragment>)}</div>}
function Story(){const {t}=useLocale();return <section id="table" className="story section"><div className="story-heading"><h2><Lines items={t.storyTitle}/></h2><p>{t.storyCopy}</p></div><div className="story-layout"><figure className="room-photo facade-photo"><Photo src="/images/facade.webp" alt={t.facadeAlt}/><figcaption><span>{t.facadeCaption}</span><a href="https://www.facebook.com/photo.php?fbid=1469323468532801&type=3" target="_blank" rel="noreferrer">{t.facadeCredit}<ArrowUpRight size={12}/></a></figcaption></figure><div className="story-aside"><span className="big-address">57<span>quai Magellan</span></span><p><Lines items={t.storyAside}/></p><a className="plain-link" href="#contact">{t.visitLink}<ArrowUpRight size={19}/></a><svg className="tile-art" viewBox="0 0 180 180" fill="none" aria-hidden="true"><path d="M90 8C90 53 53 90 8 90c45 0 82 37 82 82 0-45 37-82 82-82-45 0-82-37-82-82Z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 8h164v164H8z" stroke="currentColor"/><circle cx="90" cy="90" r="25" stroke="currentColor"/></svg></div></div></section>}
function Specialties(){
 const {t}=useLocale();const [index,setIndex]=useState(0),[slow,setSlow]=useState(false),[direction,setDirection]=useState(1);const reduced=useReducedMotion();const current=t.dishes[index];const change=d=>{setDirection(d);setIndex(i=>(i+d+dishImages.length)%dishImages.length)};const duration=reduced?.15:slow?1.25:.65;
 return <section id="specialites" className="specialties section"><div className="section-top"><h2>{t.specialtiesTitle}</h2><p><Lines items={t.specialtiesIntro}/></p></div><div className="dish-spread"><div className="dish-visual"><div className="dish-frame"><AnimatePresence initial={false} custom={direction}><motion.figure key={index} custom={direction} initial={reduced?{opacity:0}:{opacity:0,transform:`translateX(${direction*8}%) rotate(${direction*5}deg) scale(.96)`}} animate={{opacity:1,transform:'translateX(0%) rotate(0deg) scale(1)'}} exit={reduced?{opacity:0}:{opacity:0,transform:`translateX(${-direction*8}%) rotate(${-direction*5}deg) scale(.96)`}} transition={{duration,ease}} drag={reduced?false:'x'} dragConstraints={{left:0,right:0}} dragElastic={.12} onDragEnd={(_,info)=>{if(Math.abs(info.offset.x)>45||Math.abs(info.velocity.x)>400)change(info.offset.x<0?1:-1)}}><Photo src={dishImages[index].image} fallback={dishImages[index].fallback} alt={current.alt}/></motion.figure></AnimatePresence></div><div className="dish-image-foot"><span>{String(index+1).padStart(2,'0')} / 03</span><span>{index===2?t.realFood:t.illustrative}</span></div></div><div className="dish-copy"><span className="dish-origin">{current.origin}</span><AnimatePresence mode="wait" initial={false}><motion.div key={index} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?.1:.18}} aria-live="polite" aria-atomic="true"><h3>{current.name}</h3><p>{current.copy}</p><span className="price">{current.price}</span></motion.div></AnimatePresence><div className="dish-control-row"><div className="dish-controls"><button onClick={()=>change(-1)} aria-label={t.previousDish}><ArrowLeft/></button><button onClick={()=>change(1)} aria-label={t.nextDish}><ArrowRight/></button></div><button className="slow-control" aria-pressed={slow} onClick={()=>setSlow(v=>!v)}>{slow?<Play size={15}/>:<Pause size={15}/>} {slow?t.normal:t.slow}</button></div><div className="dish-picker" aria-label={t.chooseDish}>{t.dishes.map((dish,i)=><button key={i} aria-label={`${t.viewDish} ${dish.name}`} aria-pressed={index===i} onClick={()=>{setDirection(i>index?1:-1);setIndex(i)}}><span className={index===i?'active':''}/></button>)}</div></div></div></section>;
}
function MenuSection(){
 const {locale,t}=useLocale();const [active,setActive]=useState(0);const refs=useRef([]);
 const select=(e,i)=>{let j;if(e.key==='ArrowRight')j=(i+1)%t.menuCategories.length;if(e.key==='ArrowLeft')j=(i-1+t.menuCategories.length)%t.menuCategories.length;if(e.key==='Home')j=0;if(e.key==='End')j=t.menuCategories.length-1;if(j!==undefined){e.preventDefault();setActive(j);refs.current[j]?.focus()}};
 const price=i=>{const amount=Number.parseFloat(menuPrices[active][i].replace(',','.'));return new Intl.NumberFormat(locale==='en'?'en-GB':locale,{style:'currency',currency:'EUR',minimumFractionDigits:Number.isInteger(amount)?0:2,maximumFractionDigits:2}).format(amount)};
 return <section id="carte" className="menu-section section"><div className="menu-title"><h2><Lines items={t.menuTitle}/></h2><div><p>{t.menuIntro}</p><a className="plain-link" href={CONTACT.menu} target="_blank" rel="noreferrer">{t.sourceMenu}<ExternalLink size={16}/></a></div></div><div className="menu-spread"><figure className="menu-photo"><Photo src="/images/pastel-light.webp" fallback="/images/pastel.jpg" alt={t.menuPhotoAlt}/><figcaption>{t.menuPhotoCaption}<span>{t.illustrative}</span></figcaption></figure><div className="menu-content"><div role="tablist" aria-label={t.categoryLabel} className="menu-tabs">{t.menuCategories.map((category,i)=><button ref={el=>refs.current[i]=el} key={i} id={`tab-${i}`} role="tab" aria-selected={active===i} aria-controls="menu-panel" tabIndex={active===i?0:-1} onKeyDown={e=>select(e,i)} onClick={()=>setActive(i)}>{category}{active===i&&<motion.span className="tab-line" layoutId="menu-underline" transition={{type:'spring',bounce:0,duration:.35}}/>}</button>)}</div><div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${active}`} tabIndex={0}><motion.div key={active} initial={{opacity:.5}} animate={{opacity:1}} transition={{duration:.18}} className="menu-rows">{t.menuItems[active].map(([name,description],i)=><article className="menu-row" key={i}><div><h3>{name}</h3><p>{description}</p></div><span>{price(i)}</span></article>)}</motion.div></div><p className="menu-note">{t.menuNote}</p></div></div></section>;
}
function Gallery(){const {t}=useLocale();return <section className="gallery section"><div className="gallery-caption"><h2><Lines items={t.galleryTitle}/></h2><div><p><Lines items={t.galleryIntro}/></p><Book/></div></div><div className="gallery-photos"><figure><Photo src="/images/room.jpg" alt={t.roomAlt}/><figcaption>{t.roomCaption}</figcaption></figure><figure><Photo src="/images/room-detail.jpg" alt={t.roomDetailAlt}/><figcaption>{t.detailCaption}</figcaption></figure></div></section>}
function Visit(){
 const {t}=useLocale();const key=import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY;const q=encodeURIComponent(CONTACT.address);const map=key?`https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=${q}&language=${t.mapLanguage}`:`https://maps.google.com/maps?q=${q}&z=16&output=embed&hl=${t.mapLanguage}`;
 return <section id="contact" className="visit section"><div className="visit-title"><h2><Lines items={t.visitTitle}/></h2><a href={CONTACT.directions} target="_blank" rel="noreferrer" className="plain-link">{t.directions}<ArrowUpRight size={20}/></a></div><div className="visit-details"><div className="visit-address"><MapPin size={23}/><address>57 Quai Magellan<br/>44000 Nantes, {t.country}</address><a href={CONTACT.phoneHref}><Phone size={17}/>{CONTACT.phone}</a><Book/></div><div className="hours"><h3>{t.hoursTitle}</h3>{HOURS.map(([,hours],i)=><div key={i}><span>{t.days[i]}</span><span>{i===0?t.closed:hours.replace(/h/g,':')}</span></div>)}<p>{t.hoursNote}</p></div></div><div className="map-wrap"><iframe title={t.mapTitle} src={map} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/><a href={CONTACT.directions} target="_blank" rel="noreferrer" className="map-caption"><MapPin size={18}/>La Cantine Portugaise · 57 Quai Magellan<ArrowUpRight size={18}/></a></div></section>;
}
function Footer(){const {t}=useLocale();return <footer><div className="footer-top"><Brand/><span><Lines items={t.footerTagline}/></span><a href="#accueil" className="back-top">{t.backTop}<ArrowUpRight size={18}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} · {t.independent}</span><span>{t.photoNote}</span></div></footer>}
function Site(){
 const {locale,t}=useLocale();const controls=useAnimationControls();const reduced=useReducedMotion();const previous=useRef(locale);
 useEffect(()=>{if(previous.current!==locale){controls.start({opacity:[.65,1],transition:{duration:reduced?.12:.24,ease}});previous.current=locale}},[locale,controls,reduced]);
 return <MotionConfig reducedMotion="user" transition={{ease}}><a href="#table" className="skip-link">{t.skip}</a><Header/><motion.div className="translated-content" animate={controls} initial={false}><Hero/><main><TasteBand/><Specialties/><Story/><MenuSection/><Gallery/><Visit/></main><Footer/></motion.div><div className="mobile-book"><Book/></div></MotionConfig>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><LocaleProvider><Site/></LocaleProvider></React.StrictMode>);
