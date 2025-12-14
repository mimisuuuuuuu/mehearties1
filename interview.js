// ================== DATA ==================
const ARTISTS = {
  h: {
    name: "신혜령",
    desc: "Head · drawing / ???",
    text: `신혜령은 자신만의 ‘이타카(Ithaca)’에 대한 정의를 탐구한다. 
그는 늘 어딘가로 향하고자 하는 충동을 해소하기 위해 먼 곳으로 떠나지만, 여정의 끝에서 해소되지 않는 감정을 안은 
채 다시 돌아오곤 한다. 그러던 중 작가는 도착지보다 ‘여정을 이어가는 상태’ 자체가 자신의 이타카라는 사실을 자각하고, 
그 여정 속에 영원히 머무르길 소망하게 된다. 이러한 탐구의 과정을 작가는 디지털 영상 매체로 담아왔다.`,
    images: ["image/신혜령작업1.jpg"]
  },
  hs: {
    name: "최한수",
    desc: "Chest · ???",
    text: `최한수는 인간의 흔적과 증거를 관찰한다. 그는 우리가 일상 속에서 무심코 남기고 지나가는 흔적들, 
사라져가는 것들, 그리고 쉽게 망각되는 것들 속에서 오히려 인간다움의 본질이 드러난다고 믿는다. 
작가는 인간의 삶을 더욱 ‘인간답게’ 만드는 연약함과 불완전함에 주목하며, 사람들이 세상을 살아가며 
남기는 미세한 증거들을 탐색하는 과정을 회화와 입체설치 그리고 영상 작업을 통해 기록한다.`,
    images: [
      "image/최한수작업1.jpg",
      "image/최한수작업2.jpg",
      "image/최한수작업3.jpg"
    ]
  },
  sy: {
    name: "임성연",
    desc: "Legs · ???",
    text: `임성연은 미래의 지층과 인공물의 유한성을 탐구하며 가상의 화석을 만들어낸다.
‘발굴’의 방향을 과거가 아닌 미래로 돌린다. 그는 지금 이 시대가 먼 미래의 지층 속에 화석으로 
남게 될 순간을 상상하며, 인간이 만들어내는 물질과 시간의 유한성을 탐색한다. 기능을 다한 재료들은 
그의 손에서 절단과 융합, 압착의 과정을 거쳐 가상의 화석 조각으로 재구성된다. 그 표면은 생명과 
폐기물의 경계를 흐리게 만들며, 사라짐과 남겨짐 사이에서 인간이 만든 세계의 유한성을 드러낸다.`,
    images: [
      "image/임성연작업1.jpg",
      "image/임성연작업2.jpg",
      "image/임성연작업3.jpg",
      "image/임성연작업4.jpg"
    ]
  },
  js: {
    name: "김지수",
    desc: "Feet · ???",
    text: `김지수의 작업은 디지털 이미지가 만들어내는 환영성과 믿음의 불안정성을 탐구한다. 
회화, 영상, 웹 인터페이스 등을 넘나들며 픽셀화·모자이크·글리치·AI 생성 이미지 같은 디지털 표면의 
오류와 과잉된 아름다움을 재료로 삼아 ‘무엇이 진짜인가’를 시각적으로 실험한다. CAPTCHA나 웹 장례식 
사이트를 통해 믿음의 작동 방식이 얼마나 쉽게 조작되는지를 드러내고 현실과 디지털, 시각적 진실과 
환영의 경계에서 신앙처럼 소비되는 시각성의 아이러니를 해부한다.`,
    images: [
      "image/김지수작업1.jpg",
      "image/김지수작업2.jpg",
      "image/김지수작업3.jpg",
      "image/김지수작업4.jpg",
      "image/김지수작업5.jpg",
      "image/김지수작업6.jpg"
    ]
  }
};

// ================== MAIN ==================
document.addEventListener("DOMContentLoaded", () => {

  const screenEl = document.getElementById("interview-screen");
  const nameEl   = document.getElementById("artist-name");
  const descEl   = document.getElementById("artist-desc");
  const imagesEl = document.getElementById("artist-images");
  const typingEl = document.getElementById("typing-text");
  const closeBtn = document.querySelector(".close-btn");

  // ================== HOTSPOT ==================
  document.querySelectorAll(".hotspot").forEach(spot => {
    spot.addEventListener("click", () => {
      const key = spot.dataset.target;
      const data = ARTISTS[key];
      if (!data) return;
      openInterview(data);
    });
  });

  function openInterview(artist){
    nameEl.textContent = artist.name || "";
    descEl.textContent = artist.desc || "";

    imagesEl.innerHTML = "";
    (artist.images || []).forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = artist.name + " 작업 이미지";
      imagesEl.appendChild(img);
    });

    typingEl.textContent = "";
    screenEl.classList.add("show");
    screenEl.setAttribute("aria-hidden","false");

    typeWriter(artist.text || "", 0);
  }

  function typeWriter(text, i){
    if (i < text.length){
      typingEl.textContent += text.charAt(i);
      setTimeout(() => typeWriter(text, i+1), 35);
    }
  }

  function closeInterview(){
    screenEl.classList.remove("show");
    screenEl.setAttribute("aria-hidden","true");
  }

  if (closeBtn) closeBtn.addEventListener("click", closeInterview);

  if (screenEl){
    screenEl.addEventListener("click", (e) => {
      if (e.target === screenEl) closeInterview();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeInterview();
  });

  // ================== LIGHTBOX (이미지 확대) ==================
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="닫기">×</button>
    <img class="lightbox-img" alt="">
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  function openLightbox(src, altText = ""){
    lightboxImg.src = src;
    lightboxImg.alt = altText;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox(){
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  }

  // 작업 이미지 클릭 → 확대 (이벤트 위임)
  if (imagesEl){
    imagesEl.addEventListener("click", (e) => {
      const img = e.target.closest("img");
      if (!img) return;
      openLightbox(img.src, img.alt || "");
    });
  }

  // 닫기 트리거
  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

});
