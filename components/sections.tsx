"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  MapPin,
  Send,
  Menu,
  X,
  CheckCircle2,
  Star,
  Check,
  ArrowRight,
} from "lucide-react";
import { BranchSVG, Logo, Section } from "./ui";
import { submitCareerForm } from "@/app/sections";
// ... импорт server actions (об этом ниже)

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setIsDesktop(true);
    }
  }, []);
  return isDesktop;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

// --- HEADER ---
export const Header = ({
  setCursor,
  scrollTo,
}: {
  setCursor: any;
  scrollTo: (id: string) => void;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  return (
    <>
      <motion.header
        style={{ opacity }}
        className="fixed top-0 left-0 w-full px-6 md:px-10 py-6 md:py-8 flex justify-between items-center z-50 mix-blend-difference"
      >
        <div className="cursor-pointer" onClick={() => scrollTo("hero")}>
          <Logo />
        </div>

        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-12 uppercase text-sm font-semibold tracking-[0.2em] text-white">
          {[
            { name: "Отели", id: "hotels" },
            { name: "Вкусы", id: "restaurants" },
            { name: "Залы", id: "events" },
            { name: "Новости", id: "news" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.id)}
              className="hover:text-taiga-gold transition-colors relative group"
              onMouseEnter={() => isDesktop && setCursor(false, "")}
              onMouseLeave={() => isDesktop && setCursor(false, "")}
            >
              {item.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-taiga-gold transition-all group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollTo("hotels")}
            className="hidden md:block border border-white/40 text-white px-8 py-3 rounded-sm text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-all duration-500 tracking-widest"
          >
            Забронировать
          </button>
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-0 bg-[#151C19] z-[100] flex flex-col items-center justify-center text-[#F2F5F3]"
          >
            <button
              className="absolute top-6 right-6"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col gap-8 text-2xl font-serif items-center">
              {[
                { name: "Отели", id: "hotels" },
                { name: "Вкусы", id: "restaurants" },
                { name: "Конференц-залы", id: "events" },
                { name: "Контакты", id: "footer" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollTo(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- HERO (ИСПРАВЛЕНО: Четкий текст) ---
export const Hero = ({ onEnter }: any) => {
  const { scrollY } = useScroll();
  const scrollRange = [0, 1000];
  const scale = useTransform(scrollY, scrollRange, [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 700, 1000], [1, 1, 0]);

  const youtubeVideoId = "rV_ERKtNyNA";

  const [index, setIndex] = useState(0);
  const words = ["ДОВЕРИЯ", "КОМФОРТА", "СЕРВИСА", "ПРИРОДЫ"];

  useEffect(() => {
    const i = setInterval(
      () => setIndex((prev) => (prev + 1) % words.length),
      2500,
    );
    return () => clearInterval(i);
  }, []);

  return (
    <Section
      id="hero"
      onEnter={onEnter}
      className="h-[100vh] md:h-[140vh] relative"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* ИЗМЕНЕНИЯ ЗДЕСЬ: Убран mix-blend-difference, добавлен drop-shadow и белый цвет */}
        <div className="text-center z-20 text-white px-4 mt-20 md:mt-0 drop-shadow-lg">
          <p className="text-[10px] md:text-[10px] uppercase tracking-[0.6em] mb-4 border-b border-white/50 pb-2 inline-block shadow-black/50">
            Сеть отелей и ресторанов
          </p>
          <h1 className="text-[13vw] md:text-[8vw] leading-[0.9] font-serif font-medium">
            ТЕРРИТОРИЯ <br />
            <span className="block h-[1.1em] overflow-hidden text-taiga-gold">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="block"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
        </div>

        <motion.div
          style={{ scale, opacity }}
          className="absolute inset-0 w-full h-full z-10"
        >
          <motion.video
            src={encodeURI("/tit.mp4")}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="
    w-full h-full absolute top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2
    min-w-[300%] md:min-w-[150%]
    min-h-[150%]
    object-cover
    pointer-events-none
  "
          />

          {/* затемнение для контраста */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </div>
    </Section>
  );
};

// ... Остальные компоненты (Hotels, Restaurants и т.д.) остаются без изменений ...
// ... Ниже только измененный компонент Career для обработки формы ...

export const Hotels = ({ onEnter, setCursor, setHoverBg, setTheme }: any) => {
  const isDesktop = useIsDesktop();
  const hotelsData = [
    {
      name: "АЗАТАЙ",
      themeId: "azatai",
      type: "Парк-отель",
      desc: "Загородный отдых на берегу Байкала",
      loc: "п. Большое Голоустное",
      img: "japanese-zen-hotel-room-white-sakura-minimalist-ba.jpg",
      themeBg: "#3A2226",
      poster: "",
      link: "https://www.azatay.ru/",
    },
    {
      name: "ЯКОВЛЕВ",
      themeId: "yakovlev",
      type: "Исторический",
      desc: "Отель в доме купца Н.В. Яковлева",
      loc: "Центр города",
      img: "historical-wooden-noble-hotel-dark-brown-interior.jpg",
      themeBg: "#2F2520",
      poster: "",

      link: "https://yakovlevhotel.ru/",
    },
    {
      name: "ВИКТОРИЯ",
      themeId: "victoria",
      type: "City Hotel",
      desc: "Стиль и комфорт в самом центре",
      loc: "Центр города",
      img: "/elegant-comfortable-hotel-in-historic-city-center.jpg",
      themeBg: "#3D3628",
      poster: "",

      link: "https://victoryhotel.ru/",
    },
    {
      name: "АТЛАС",
      themeId: "atlas",
      type: "Бизнес",
      desc: "Уютный уголок недалеко от центра",
      loc: "Тихий центр",
      img: "АТЛАС.mp4",
      themeBg: "#1D2530",
      poster: "modern-bright-hotel-lobby-blue-white-green-colors.jpg",

      link: "https://atlas-irk.ru/",
    },
    {
      name: "ТАЙГА",
      themeId: "taiga",
      type: "Дизайнерский",
      desc: "Любимое место для гостей и жителей города",
      loc: "Иркутск",
      img: "ТАЙГА.mp4",
      themeBg: "#151C19",
      poster: "forest-themed-hotel-green-nature-siberian-taiga.jpg",

      link: "https://taigahotel.ru/",
    },
  ];

  const isVideo = (path: string) => path.match(/\.(mp4|webm|ogg)$/i);

  return (
    <Section
      id="hotels"
      onEnter={onEnter}
      className="py-16 md:py-32 text-taiga-snow relative z-10"
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12 md:mb-24 border-b border-white/10 pb-8">
          <h2 className="text-4xl md:text-8xl font-serif">ОТЕЛИ</h2>
          <p className="text-[10px] md:text-xs uppercase tracking-widest max-w-xs opacity-60 text-right">
            Коллекция уникальных мест
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24"
        >
          {hotelsData.map((h, i) => (
            <motion.a
              href={h.link}
              target="_blank"
              rel="noopener noreferrer"
              key={h.themeId}
              variants={itemVariants}
              className={`group block relative ${i % 2 !== 0 ? "md:translate-y-32" : ""}`}
              onMouseEnter={() =>
                isDesktop && (setHoverBg(h.themeBg), setTheme(h.themeId))
              }
              onMouseLeave={() =>
                isDesktop && (setHoverBg(null), setTheme(null))
              }
            >
              {/* Контейнер медиа */}
              <div className="h-[280px] md:h-[450px] rounded-sm overflow-hidden mb-6 relative bg-white/5">
                {isVideo(h.img) ? (
                  <motion.video
                    src={encodeURI(h.img)}
                    // Poster - это критично! Показывается мгновенно до загрузки видео
                    poster={h.poster || ""}
                    autoPlay
                    muted
                    loop
                    playsInline
                    // Смена metadata на auto для мобильных может помочь, но ест трафик
                    preload="auto"
                    whileHover={isDesktop ? { scale: 1.05 } : {}}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full object-cover pointer-events-none"
                    // Фикс для мобильных: принудительный запуск при рендере
                    onCanPlay={(e) => e.currentTarget.play()}
                  />
                ) : (
                  <motion.img
                    src={h.img}
                    alt={h.name}
                    loading="lazy"
                    whileHover={isDesktop ? { scale: 1.05 } : {}}
                    transition={{ duration: 0.7 }}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Лейбл типа отеля */}
                <div className="absolute top-4 right-4 bg-taiga-snow text-taiga-deep px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest shadow-lg z-10">
                  {h.type}
                </div>
              </div>

              {/* Текстовый блок */}
              <h3
                className={`text-2xl md:text-4xl font-serif mb-3 transition-colors duration-500 ${isDesktop ? "group-hover:text-taiga-gold" : "text-taiga-gold"}`}
              >
                {h.name}
              </h3>
              <p className="text-xs md:text-sm opacity-80 mb-2 font-light">
                {h.desc}
              </p>
              <div className="flex items-center gap-2 text-[10px] opacity-50 uppercase tracking-widest">
                <MapPin size={14} /> {h.loc}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export const Restaurants = ({ onEnter, setCursor }: any) => {
  const restaurantsData = [
    {
      name: "АЗАТАЙ",
      desc: "Панорамный вид на Байкал",
      imgRest: "DSC03659.jpg",
      imgFood: "food1.png", // замените на реальный путь
      link: "https://azatai-rest.ru",
    },
    {
      name: "ТАЙГА",
      desc: "Сибирский вкус в сердце города",
      imgRest: "DSC_7380.png.webp",
      imgFood: "food2.png", // замените на реальный путь
      link: "https://taigahotel.ru/restaurant#/",
    },
  ];

  return (
    <Section
      id="restaurants"
      onEnter={onEnter}
      className="py-20 md:py-40 text-taiga-deep relative z-10"
    >
      <div className="container mx-auto px-6">
        {/* Заголовок */}
        <div className="border-b border-taiga-deep/10 pb-8 mb-16 text-center md:text-left">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 opacity-60">
            Гастрономия
          </p>
          <h2 className="text-5xl md:text-8xl font-light uppercase tracking-tighter">
            Вкусы Сибири
          </h2>
        </div>

        {/* Список */}
        <div className="grid grid-cols-1 gap-12 md:gap-24">
          {restaurantsData.map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row items-center gap-8 md:gap-16 cursor-none"
              onMouseEnter={() => setCursor(true, "СМОТРЕТЬ")}
              onMouseLeave={() => setCursor(false, "")}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              {/* Контейнер с фото */}
              <div className="relative w-full md:w-[55%] aspect-[16/9] overflow-hidden rounded-2xl shadow-xl">
                {/* Основное фото (Ресторан) */}
                <motion.img
                  src={item.imgRest}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={item.name}
                />

                {/* Второе фото (Блюдо) - появляется сбоку при наведении */}
                <motion.div className="absolute top-4 right-4 w-1/3 aspect-square rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl hidden md:block opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                  <img
                    src={item.imgFood || item.imgRest}
                    className="w-full h-full object-cover"
                    alt="Dish"
                  />
                </motion.div>

                {/* Оверлей при наведении */}
                <div className="absolute inset-0 bg-taiga-deep/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Текст */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <span className="text-taiga-gold font-bold text-sm tracking-widest">
                    0{i + 1}
                  </span>
                  <div className="h-[1px] w-8 bg-taiga-gold/40" />
                </div>

                <h3 className="text-4xl md:text-6xl mb-4 group-hover:text-taiga-gold transition-colors duration-300">
                  {item.name}
                </h3>

                <p className="text-sm md:text-base opacity-60 uppercase tracking-widest leading-relaxed mb-6">
                  {item.desc}
                </p>

                <div className="inline-flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
                    Перейти на сайт
                  </span>
                  <ArrowUpRight size={18} className="text-taiga-gold" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
};

export const Events = ({ onEnter, setCursor }: any) => {
  const isDesktop = useIsDesktop();
  return (
    <Section
      id="events"
      onEnter={onEnter}
      className="py-16 md:py-32 text-taiga-deep relative z-10"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 border-b border-taiga-deep/10 pb-8 gap-4">
          <h2 className="text-4xl md:text-7xl font-serif">
            Конференц-зал
            <br />
            <span className="text-taiga-green italic"></span>
          </h2>
          <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-60">
            Площадки для ваших событий
          </p>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {[
            {
              name: "Конференц-зал Азатай",
              cap: "до 200 персон",
              img: "photo_5413853646258569104_y.jpg",
              link: "https://azatay.ru/konferenc-zal",
            },
            {
              name: "Конференц-зал Тайга",
              cap: "до 200 персон",
              img: "photo_5413853646258569104_y.jpg",
              link: "https://azatay.ru/konferenc-zal",
            },
          ].map((h, i) => (
            <motion.a
              href={h.link}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              variants={itemVariants}
              whileHover={isDesktop ? { y: -10 } : {}}
              className={`group block relative ${
                i % 2 !== 0 ? "md:translate-y-20" : ""
              }`}
              onMouseEnter={() => isDesktop && setCursor(false, "")}
              onMouseLeave={() => isDesktop && setCursor(false, "")}
            >
              <div className="h-[220px] md:h-[400px] rounded-xl overflow-hidden mb-4 md:mb-6 relative shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
                <img
                  src={h.img}
                  className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-1000 md:group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur px-4 py-3 md:px-6 md:py-4 w-full flex justify-between items-center">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-taiga-green">
                    {h.cap}
                  </span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif mb-1">{h.name}</h3>
              <p className="text-[10px] opacity-50 uppercase tracking-widest">
                Панорамный конферец зал с видом на Байкал
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export const Career = ({ onEnter, setCursor }: any) => {
  const [status, setStatus] = useState("idle");

  return (
    <Section onEnter={onEnter} className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-2xl">
          {/* Левая часть: Фото (50%) */}
          <div className="md:w-1/2 h-[300px] md:h-auto relative">
            <img
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200"
              className="absolute inset-0 w-full h-full object-cover"
              alt="Career at Taiga"
            />
            <div className="absolute inset-0 bg-taiga-deep/20" />
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-[10px] uppercase tracking-[0.3em] opacity-80 mb-2">
                Работа у нас
              </p>
              <h2 className="text-3xl md:text-4xl font-light uppercase tracking-tighter">
                Станьте частью <br /> атмосферы
              </h2>
            </div>
          </div>

          {/* Правая часть: Простая форма (50%) */}
          <div className="md:w-1/2 p-8 md:p-16 bg-white flex flex-col justify-center">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-taiga-green text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl text-taiga-deep font-medium">
                  Заявка отправлена
                </h3>
                <p className="text-taiga-deep/50 text-sm">
                  Мы перезвоним вам в ближайшее время.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-2xl text-taiga-deep uppercase ">
                    Оставьте контакты
                  </h3>
                  <p className="text-taiga-deep/40 text-sm">
                    Мы свяжемся с вами, чтобы обсудить вакансии
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStatus("success");
                  }}
                  className="space-y-6"
                >
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    required
                    className="w-full bg-taiga-snow border-none rounded-xl py-4 px-6 text-taiga-deep outline-none focus:ring-1 focus:ring-taiga-gold transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    required
                    className="w-full bg-taiga-snow border-none rounded-xl py-4 px-6 text-taiga-deep outline-none focus:ring-1 focus:ring-taiga-gold transition-all"
                  />

                  <button
                    type="submit"
                    onMouseEnter={() => setCursor(true, "SEND")}
                    onMouseLeave={() => setCursor(false, "")}
                    className="w-full bg-[#D6C6B0] hover:bg-[#D6C6B0] text-white h-16 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-taiga-deep/10"
                  >
                    Отправить
                    <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export const News = ({ onEnter, setCursor, isDesktop }: any) => {
  const newsData = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      title: "Афиша мероприятий ресторана АЗАТАЙ",
      desc: "Музыкальные вечера, гастроужины и атмосфера байкальского гостеприимства в новом месяце.",
      href: "https://azatay.ru/afisha#/",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
      title: "Гастрономический сет «Тайга»",
      desc: "Уникальное путешествие по вкусам Сибири в сопровождении авторских напитков.",
      href: "https://azatay.ru/afisha#/",
    },
  ];

  // Массив ягод (увеличено до 60 штук для густоты)
  const berries = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 45}%`, // Рассыпаны по левой части
    size: Math.random() * 10 + 6,
    blur: Math.random() > 0.8 ? "2px" : "0px",
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <Section
      id="news"
      onEnter={onEnter}
      className="py-24 md:py-40 text-taiga-deep overflow-hidden relative" // Убрал bg-белый, теперь фон из handleSetSectionBg
    >
      {/* ДЕКОР СЛЕВА: Ветка и россыпь мерцающей брусники */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 0.18, x: 0 }}
          transition={{ duration: 2 }}
          className="absolute -left-10 top-0 w-1/2 h-full"
        >
          <BranchSVG />
        </motion.div>

        {berries.map((berry) => (
          <motion.div
            key={berry.id}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            transition={{ delay: Math.random() * 1.2, duration: 1 }}
            className="absolute rounded-full"
            style={{
              top: berry.top,
              left: berry.left,
              width: berry.size,
              height: berry.size,
              filter: `blur(${berry.blur})`,
              background:
                "radial-gradient(circle at 35% 35%, #b91c1c, #450a0a)",
              boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.4)",
            }}
          >
            {/* Эффект мерцания блика */}
            <motion.div
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: berry.duration,
                repeat: Infinity,
                delay: berry.delay,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-white/40 blur-[1px]"
            />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-end">
          {/* Заголовок (справа, крупный) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-right"
          >
            <p className="text-xs uppercase tracking-[0.4em] opacity-40 mb-4">
              События
            </p>
            <h2 className="text-6xl md:text-8xl font-light leading-none uppercase tracking-tighter">
              Афиша
            </h2>
          </motion.div>

          {/* КОНТЕЙНЕР НОВОСТЕЙ В РЯД (Увеличил ширину) */}
          <div className="flex flex-col md:flex-row gap-12 justify-end w-full lg:w-[85%]">
            {newsData.map((item) => (
              <motion.a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative w-full md:w-[400px]" // Увеличенная ширина карточки
                onMouseEnter={() => isDesktop && setCursor(true, "СМОТРЕТЬ")}
                onMouseLeave={() => isDesktop && setCursor(false, "")}
              >
                {/* Картинка: крупная и четкая */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 shadow-2xl border border-taiga-deep/5">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-taiga-deep/10 group-hover:bg-transparent transition-colors duration-700" />
                </div>

                {/* Текстовый блок */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-taiga-deep/10 pb-4">
                    <span className="text-sm font-medium opacity-60 uppercase tracking-widest">
                      {item.date}
                    </span>
                    <div className="w-12 h-12 rounded-full border border-taiga-deep/20 flex items-center justify-center group-hover:bg-taiga-deep group-hover:text-white transition-all duration-500">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-light leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-50 max-w-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Линия декоративная снизу */}
      <div className="absolute bottom-10 right-0 w-1/2 h-px bg-gradient-to-l from-taiga-deep/10 to-transparent" />
    </Section>
  );
};
export const Footer = ({ onEnter, setCursor }: any) => {
  const isDesktop = true;
  const hotels = [
    { name: "Азатай", href: "https://www.azatay.ru/" },
    { name: "Яковлев", href: "https://yakovlevhotel.ru/" },
    { name: "Виктория", href: "https://victoryhotel.ru/" },
    { name: "Атлас", href: "https://atlas-irk.ru/" },
    { name: "Тайга", href: "https://taigahotel.ru/" },
  ];
  const restaurants = [
    { name: "Ресторан Азатай", href: "https://azatai-rest.ru" },
    { name: "Ресторан Тайга", href: "https://taigahotel.ru/restaurant#/" },
  ];
  const conferenceHalls = [
    { name: "Конференц-зал Азатай", href: "https://azatay.ru/konferenc-zal" },
  ];
  const socialLinks = [
    { name: "Telegram Тайга", href: "https://t.me/taiga_irkutsk_hotel" },
    { name: "Telegram Азатай", href: " https://t.me/azataybaikal" },
  ];

  return (
    <Section
      id="footer"
      onEnter={onEnter}
      viewportOverride={{ amount: 0.2 }}
      className="pt-16 md:pt-24 pb-12 bg-taiga-snow text-taiga-deep border-t border-taiga-deep/5 w-full"
    >
      <div
        className="px-6 md:px-10 lg:px-20"
        onMouseEnter={() => isDesktop && setCursor(false, "")}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:gap-16 mb-16 md:mb-24">
          <div>
            <h4 className="font-bold text-[10px] mb-4 md:mb-8 uppercase tracking-widest text-taiga-green">
              Отели
            </h4>
            <ul className="space-y-3 text-xs opacity-70 uppercase tracking-wider">
              {hotels.map((i) => (
                <li key={i.name}>
                  <a href={i.href} className="hover:text-taiga-deep">
                    {i.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[10px] mb-4 md:mb-8 uppercase tracking-widest text-taiga-green">
              Рестораны
            </h4>
            <ul className="space-y-3 text-xs opacity-70 uppercase tracking-wider">
              {restaurants.map((i) => (
                <li key={i.name}>
                  <a href={i.href} className="hover:text-taiga-deep">
                    {i.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[10px] mb-4 md:mb-8 uppercase tracking-widest text-taiga-green">
              Конференц-залы
            </h4>
            <ul className="space-y-3 text-xs opacity-70 uppercase tracking-wider">
              {conferenceHalls.map((i) => (
                <li key={i.name}>
                  <a href={i.href} className="hover:text-taiga-deep">
                    {i.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[10px] mb-4 md:mb-8 uppercase tracking-widest text-taiga-green">
              Соцсети
            </h4>
            <ul className="space-y-3 text-xs opacity-70 uppercase tracking-wider">
              {socialLinks.map((i) => (
                <li key={i.name}>
                  <a href={i.href} className="hover:text-taiga-deep">
                    {i.name}
                  </a>
                </li>
              ))}
            </ul>
            {/* <h4 className="font-bold text-[10px] mt-8 mb-4 md:mb-8 uppercase tracking-widest text-taiga-green">
              Контакты
            </h4>
            <p className="text-lg md:text-xl font-serif mb-2">
              +7 (3952) 00-00-00
            </p> */}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end text-[9px] uppercase opacity-20 tracking-widest border-t border-taiga-deep/5 pt-8 gap-2">
          <p>Все права защищены.</p>
          <p>Made with Nature</p>
        </div>
      </div>
    </Section>
  );
};
