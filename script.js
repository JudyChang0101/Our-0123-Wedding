"use strict";

/* 可編輯設定。倒數與 RSVP 使用以下設定。
 * 若更改日期，請一併修改 index.html 的顯示文字及 datetime。
 */
const WEDDING_CONFIG = Object.freeze({
  weddingDate: "2027-01-23T11:00:00+08:00",
  timeZone: "Asia/Taipei",
  rsvpUrl: "https://docs.google.com/forms/d/e/1FAIpQLScfFhU0wPoU-n5aJ1Sqf4HNEOuYsChwdaBxTbFPQC2u9FwxBA/viewform",
  rsvpEmbedUrl: "https://docs.google.com/forms/d/e/1FAIpQLScfFhU0wPoU-n5aJ1Sqf4HNEOuYsChwdaBxTbFPQC2u9FwxBA/viewform?embedded=true",
  rsvpDeadline: "2026/12/21 (一)",
  rsvpDeadlineEn: "Mon, Dec 21, 2026",
  dressCode: "Smart Casual",
  milestone: 2,
});

/* 中英切換：中文以 HTML 原文為準，英文寫在下方 EN。
 * 網址加 ?lang=en 直接開英文版；選擇會記在瀏覽器。
 * 選項的 value 維持中文，送進 Google 表單的內容不受語言影響。 */
const LINE_URL = "https://line.me/ti/";
const EN = {
  pageTitle: "Ming-Kai & Wei-Cheng | We're Getting Married",
  pageDesc: "Ming-Kai Hsieh and Wei-Cheng Chang are getting married. Saturday, January 23, 2027, at Le Méridien Taipei.",
  skip: "Skip to wedding details",
  heroLabel: "We're getting married",
  heroAlt: "Ming-Kai and Wei-Cheng gazing at each other on a seaside lawn, Wei-Cheng holding a clear umbrella decorated with flowers.",
  menuOpen: "Open section menu", menuClose: "Close section menu", menuLabel: "Sections",
  langZh: "Mandarin", langEn: "English",
  navInfo: "Information", navCountdown: "Countdown", navRsvp: "RSVP", navGallery: "Gallery", navAbout: "About Us",
  coupleNames: "Ming-Kai Hsieh &amp; Wei-Cheng Chang",
  inviteLine: "We warmly invite you<span>to our wedding</span>",
  weekday: "(Saturday)",
  ceremony: "Outdoor Ceremony", luncheon: "Wedding Luncheon",
  venueName: "Le Méridien Taipei",
  venueRooms: "3F Jadeite<span class=\"venue__plus\"> + </span>Amber",
  venueQuube: "5F <span lang=\"en\">QUUBE</span> (Ceremony)",
  address: "No. 38, Songren Rd., Xinyi Dist., Taipei City",
  untilWedding: "Time until the wedding", countdownLabel: "Wedding countdown",
  scrapLabel: "Our everyday moments",
  altCity: "Ming-Kai and Wei-Cheng running hand in hand across a crosswalk, Wei-Cheng in a red dress.",
  altHarbor: "Wei-Cheng hugging Ming-Kai from behind by the harbor, both smiling.",
  replyBy: "Please reply by", replyBySuffix: "",
  rsvpTitle: "RSVP",
  fName: "🎵 Your Name *", phName: "Enter your full name",
  fEmail: "📪 Email *",
  fRel: "✅ How do you know us? *",
  choose: "Please select",
  oGroomFamily: "Groom's family", oGroomFriend: "Groom's friend", oGroomWork: "Groom's colleague",
  oBrideFamily: "Bride's family", oBrideFriend: "Bride's friend", oBrideWork: "Bride's colleague",
  oBoth: "Close with both of you — don't make me pick a side (?)",
  fAttend: "🧑‍🤝‍🧑 Will you attend?",
  oYes: "Wouldn't miss it — count me in!", oNo: "Can't make it, but sending all my love",
  fAdults: "🧑‍🤝‍🧑 Adults (including you) *", fKids: "🧒 Children",
  fDiet: "🍎 Dietary Preference *", oMeat: "No restrictions", oVeg: "Vegetarian", oOther: "Other",
  fDietOther: "Other dietary needs *",
  fNeeds: "🎤 Special Requests (e.g., high chair)", phNeeds: "e.g., high chair",
  fPaper: "📣 Would you like a printed invitation? *", oYesPaper: "Yes", oNoPaper: "No",
  fAddress: "📪 Mailing Address for Printed Invitation (please double-check so it arrives safely)",
  fMessage: "🎤 A Note for Us ❤️❤️❤️", phMessage: "Leave us a message",
  submit: "SUBMIT",
  resultTitle: "Google Forms response", resultFrame: "Google Forms submission result",
  openForm: "Open Google Form ↗",
  galleryTitle: "Gallery", zoom: "View larger photo: ",
  altG1: "The two of them strolling side by side on a seaside lawn.",
  altG2: "The two of them running hand in hand down a city street.",
  altG3: "The two of them embracing happily by the harbor.",
  altG4: "The two of them holding a branch and puckering their lips at a cockatiel perched on it.",
  altG5: "The two of them with a guitar and keyboard on a blue music-themed set.",
  altG6: "The two of them holding records in front of a silver backdrop.",
  aboutTitle: "About Us",
  altGroom: "Groom Ming-Kai Hsieh", altBride: "Wei-Cheng Chang smiling, front-facing portrait",
  groomName: "<span>MING-KAI HSIEH</span>", brideName: "<span>WEI-CHENG CHANG</span>",
  igLabel: "Open Instagram (account link coming soon)",
  qSign: "Zodiac Sign", qFood: "Favorite Food", qHate: "Can't Stand", qCallBride: "What He Calls Her", qCallGroom: "What She Calls Him",
  gSign: "Virgo", gFood: "Anything That Slaps, Every Kind of Tea", gHate: "Sweet Green Peppers, Durian", gCall: "Babe",
  bSign: "Taurus",
  bFood: "Anything Spicy, Milk Tea, Pho, Matcha",
  bHate: "Shiitake Mushrooms, Cockroaches", bCall: "Babe",
  ps: `If you'd like to join our outdoor ceremony, please reach out to us on Instagram or through our official LINE account, “<a class="postscript__line" href="${LINE_URL}" target="_blank" rel="noopener noreferrer">Ming-Kai &amp; Wei-Cheng 123</a>”.`,
  closingLabel: "We can't wait to celebrate with you",
  altClosing: "Ming-Kai and Wei-Cheng standing on the grass, looking out at the ocean and sky together.",
  lightboxTitle: "Wedding photo viewer", closePhoto: "Close photo", prevPhoto: "Previous photo", nextPhoto: "Next photo",
  // 程式動態文字
  countdownTbd: "Wedding date to be confirmed",
  countdownAria: (v) => `${v.days} days, ${v.hours} hours, ${v.minutes} minutes, ${v.seconds} seconds until the wedding`,
  todayMsg: "It's today! We can't wait to celebrate with you.",
  afterMsg: "Thank you for sharing this day with us.",
  sending: "Sending…", sendingStatus: "Sending to Google Forms, please wait.",
  timeoutStatus: "No response from Google yet. Check the result below, or open the Google Form to confirm.",
  resend: "RESUBMIT", doneStatus: "Please check Google's response below to confirm your reply was received.", again: "SUBMIT AGAIN",
};
const ZH = {
  pageTitle: document.title,
  pageDesc: document.querySelector('meta[name="description"]').content,
  menuOpen: "開啟章節導覽", menuClose: "關閉章節導覽",
  rsvpDeadline: WEDDING_CONFIG.rsvpDeadline,
  countdownTbd: "婚禮日期待確定",
  countdownAria: (v) => `距離婚禮還有 ${v.days} 天 ${v.hours} 小時 ${v.minutes} 分 ${v.seconds} 秒`,
  todayMsg: "就是今天！期待與您一起慶祝。",
  afterMsg: "謝謝您，與我們一起珍藏這一天。",
  sending: "正在送出…", sendingStatus: "正在傳送至 Google 表單，請稍候。",
  timeoutStatus: "尚未取得 Google 回覆；請查看下方結果，或另開 Google 表單確認。",
  resend: "重新送出 SUBMIT", doneStatus: "請查看下方 Google 回覆，確認是否已成功提交。", again: "再次送出 SUBMIT",
};
EN.rsvpDeadline = WEDDING_CONFIG.rsvpDeadlineEn;
// 先記下 HTML 裡的中文原文
document.querySelectorAll("[data-i18n]").forEach((el) => { el.dataset.zh = el.innerHTML; });
document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
  el.dataset.i18nAttr.split(",").forEach((pair) => {
    const attr = pair.split(":")[0];
    el.setAttribute(`data-zh-${attr}`, el.getAttribute(attr) || "");
  });
});
let currentLang = "zh";
function t(key) { return (currentLang === "en" ? EN : ZH)[key]; }
function setLang(lang, remember = true) {
  currentLang = lang === "en" ? "en" : "zh";
  const en = currentLang === "en";
  document.documentElement.lang = en ? "en" : "zh-Hant";
  document.documentElement.dataset.lang = currentLang;
  document.title = t("pageTitle");
  document.querySelector('meta[name="description"]').content = t("pageDesc");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.innerHTML = en && key in EN ? EN[key] : el.dataset.zh;
  });
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attr, spec] = pair.split(":");
      const [key, suffix = ""] = spec.split("|");
      el.setAttribute(attr, en && key in EN ? EN[key] + suffix : el.getAttribute(`data-zh-${attr}`));
    });
  });
  document.querySelectorAll("[data-set-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.setLang === currentLang)));
  const deadline = document.querySelector("[data-rsvp-deadline]");
  if (deadline) deadline.textContent = t("rsvpDeadline");
  if (typeof menu !== "undefined") menuToggle.setAttribute("aria-label", t(menu.hidden ? "menuOpen" : "menuClose"));
  if (remember) {
    try { localStorage.setItem("wedding-lang", currentLang); } catch (e) { /* 無法記憶時略過 */ }
    const url = new URL(location.href);
    if (en) url.searchParams.set("lang", "en"); else url.searchParams.delete("lang");
    history.replaceState(null, "", url);
  }
  if (typeof updateCountdown === "function") updateCountdown();
}

const navigation = document.querySelector(".navigation");
const menuToggle = document.querySelector(".navigation__toggle");
const menu = document.querySelector(".navigation__panel");

function closeMenu(restoreFocus = false) {
  menu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", t("menuOpen"));
  if (restoreFocus) menuToggle.focus();
}

menuToggle.addEventListener("click", () => {
  const opening = menu.hidden;
  menu.hidden = !opening;
  menuToggle.setAttribute("aria-expanded", String(opening));
  menuToggle.setAttribute("aria-label", t(opening ? "menuClose" : "menuOpen"));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !menu.hidden) closeMenu(true);
});
document.addEventListener("click", (event) => {
  if (!navigation.contains(event.target)) closeMenu();
});
document.addEventListener("focusin", (event) => {
  if (!navigation.contains(event.target)) closeMenu();
});
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => closeMenu(true));
});

// 倒數：日期包含 +08:00，避免裝置所在時區改變婚禮時間。
const countdown = document.querySelector('.countdown');
const countdownMessage = document.querySelector('.countdown-message');
let countdownInterval;
function updateCountdown() {
  const target = Date.parse(WEDDING_CONFIG.weddingDate);
  if (!Number.isFinite(target)) {
    countdown.querySelectorAll('[data-unit]').forEach(el => { el.textContent = 'xxx'; });
    countdownMessage.hidden = false;
    countdownMessage.textContent = t('countdownTbd');
    return false;
  }
  const remaining = Math.max(0, Math.floor((target - Date.now()) / 1000));
  const values = {days: Math.floor(remaining / 86400), hours: Math.floor(remaining / 3600) % 24, minutes: Math.floor(remaining / 60) % 60, seconds: remaining % 60};
  Object.entries(values).forEach(([unit,value]) => {
    const el = countdown.querySelector(`[data-unit="${unit}"]`);
    const text = String(value).padStart(unit === 'days' ? 3 : 2, '0');
    if (el.textContent !== text) {
      el.textContent = text;
      el.parentElement.classList.remove('is-flipping');
      void el.parentElement.offsetWidth;
      el.parentElement.classList.add('is-flipping');
    }
  });
  countdown.setAttribute('aria-label', t('countdownAria')(values));
  if (remaining === 0) {
    const sameDay = new Intl.DateTimeFormat('en-CA',{timeZone:WEDDING_CONFIG.timeZone}).format(new Date()) === new Intl.DateTimeFormat('en-CA',{timeZone:WEDDING_CONFIG.timeZone}).format(new Date(target));
    countdownMessage.hidden = false;
    countdownMessage.textContent = sameDay ? t('todayMsg') : t('afterMsg');
    return false;
  }
  return true;
}
if (updateCountdown()) countdownInterval = setInterval(() => { if (!updateCountdown()) clearInterval(countdownInterval); },1000);


document.querySelector("[data-dress-code]").textContent = WEDDING_CONFIG.dressCode;

// Custom HTML fields post only when the guest submits; Google renders its actual result.
const rsvpForm = document.querySelector('#google-rsvp');
const rsvpStatus = document.querySelector('#rsvp-status');
const rsvpResult = document.querySelector('#rsvp-result');
const rsvpFrame = rsvpResult.querySelector('iframe');
const rsvpSubmit = rsvpForm.querySelector('[type="submit"]');
const dietSelect = document.querySelector('#guest-diet');
const dietOther = document.querySelector('#diet-other');
document.querySelector('.rsvp-external').href = WEDDING_CONFIG.rsvpUrl;
function syncDietOther() {
  const other = dietSelect.value === '__other_option__';
  document.querySelector('#diet-other-field').hidden = !other;
  dietOther.disabled = !other;
  dietOther.required = other;
}
dietSelect.addEventListener('change', syncDietOther);
syncDietOther();
let rsvpSending = false;
let rsvpTimeout;
rsvpForm.addEventListener('submit', event => {
  if (rsvpSending) { event.preventDefault(); return; }
  rsvpSending = true;
  rsvpSubmit.disabled = true;
  rsvpSubmit.textContent = t('sending');
  rsvpStatus.textContent = t('sendingStatus');
  rsvpResult.hidden = false;
  rsvpTimeout = setTimeout(() => {
    rsvpStatus.textContent = t('timeoutStatus');
    rsvpSending = false;
    rsvpSubmit.disabled = false;
    rsvpSubmit.textContent = t('resend');
  }, 20000);
});
rsvpFrame.addEventListener('load', () => {
  if (!rsvpSending) return;
  clearTimeout(rsvpTimeout);
  rsvpSending = false;
  // Cross-origin load does not prove storage. Show Google's actual confirmation or error.
  rsvpStatus.textContent = t('doneStatus');
  rsvpSubmit.disabled = false;
  rsvpSubmit.textContent = t('again');
  rsvpResult.scrollIntoView({behavior: 'smooth', block: 'start'});
});

// 相簿：原生 dialog 提供鍵盤焦點限制與 Escape 關閉。
const photoButtons = Array.from(document.querySelectorAll('[data-photo]'));
const lightbox = document.querySelector('.lightbox');
const largePhoto = lightbox.querySelector('.lightbox__image');
let currentPhoto = 0;
let galleryTrigger;
function showPhoto(index) {
  currentPhoto = (index + photoButtons.length) % photoButtons.length;
  const button = photoButtons[currentPhoto];
  const alt = button.querySelector('img').alt;
  largePhoto.src = button.dataset.photo;
  largePhoto.alt = alt;
  lightbox.querySelector('.lightbox__caption').textContent = button.dataset.caption || alt;
  lightbox.querySelector('.lightbox__counter').textContent = `${currentPhoto + 1} / ${photoButtons.length}`;
}
photoButtons.forEach((button,index) => button.addEventListener('click', () => {
  galleryTrigger = button;
  showPhoto(index);
  lightbox.showModal();
  document.body.classList.add('has-lightbox');
  lightbox.querySelector('.lightbox__close').focus();
}));
lightbox.querySelector('.lightbox__close').addEventListener('click',()=>lightbox.close());
lightbox.querySelector('[data-gallery-prev]').addEventListener('click',()=>showPhoto(currentPhoto-1));
lightbox.querySelector('[data-gallery-next]').addEventListener('click',()=>showPhoto(currentPhoto+1));
lightbox.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(currentPhoto-1);}
  if(event.key==='ArrowRight'){event.preventDefault();showPhoto(currentPhoto+1);}
});
lightbox.addEventListener('click',event=>{
  if(event.target!==lightbox)return;
  const rect=lightbox.getBoundingClientRect();
  if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)lightbox.close();
});
lightbox.addEventListener('close',()=>{
  document.body.classList.remove('has-lightbox');
  galleryTrigger?.focus();
});

// 語言：網址 ?lang=en 優先，其次是上次的選擇，預設中文。
document.querySelectorAll("[data-set-lang]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.setLang)));
(() => {
  let lang = new URLSearchParams(location.search).get("lang");
  if (!lang) { try { lang = localStorage.getItem("wedding-lang"); } catch (e) { lang = null; } }
  setLang(lang === "en" ? "en" : "zh", false);
})();
