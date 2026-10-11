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
  dressCode: "Smart Casual",
  milestone: 2,
});

const navigation = document.querySelector(".navigation");
const menuToggle = document.querySelector(".navigation__toggle");
const menu = document.querySelector(".navigation__panel");

function closeMenu(restoreFocus = false) {
  menu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "開啟章節導覽");
  if (restoreFocus) menuToggle.focus();
}

menuToggle.addEventListener("click", () => {
  const opening = menu.hidden;
  menu.hidden = !opening;
  menuToggle.setAttribute("aria-expanded", String(opening));
  menuToggle.setAttribute("aria-label", opening ? "關閉章節導覽" : "開啟章節導覽");
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
    countdownMessage.textContent = '婚禮日期待確定';
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
  countdown.setAttribute('aria-label', `距離婚禮還有 ${values.days} 天 ${values.hours} 小時 ${values.minutes} 分 ${values.seconds} 秒`);
  if (remaining === 0) {
    const sameDay = new Intl.DateTimeFormat('en-CA',{timeZone:WEDDING_CONFIG.timeZone}).format(new Date()) === new Intl.DateTimeFormat('en-CA',{timeZone:WEDDING_CONFIG.timeZone}).format(new Date(target));
    countdownMessage.hidden = false;
    countdownMessage.textContent = sameDay ? '就是今天！期待與您一起慶祝。' : '謝謝您，與我們一起珍藏這一天。';
    return false;
  }
  return true;
}
if (updateCountdown()) countdownInterval = setInterval(() => { if (!updateCountdown()) clearInterval(countdownInterval); },1000);

document.querySelector("[data-rsvp-deadline]").textContent = WEDDING_CONFIG.rsvpDeadline;
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
  rsvpSubmit.textContent = '正在送出…';
  rsvpStatus.textContent = '正在傳送至 Google 表單，請稍候。';
  rsvpResult.hidden = false;
  rsvpTimeout = setTimeout(() => {
    rsvpStatus.textContent = '尚未取得 Google 回覆；請查看下方結果，或另開 Google 表單確認。';
    rsvpSending = false;
    rsvpSubmit.disabled = false;
    rsvpSubmit.textContent = '重新送出 SUBMIT';
  }, 20000);
});
rsvpFrame.addEventListener('load', () => {
  if (!rsvpSending) return;
  clearTimeout(rsvpTimeout);
  rsvpSending = false;
  // Cross-origin load does not prove storage. Show Google's actual confirmation or error.
  rsvpStatus.textContent = '請查看下方 Google 回覆，確認是否已成功提交。';
  rsvpSubmit.disabled = false;
  rsvpSubmit.textContent = '再次送出 SUBMIT';
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
