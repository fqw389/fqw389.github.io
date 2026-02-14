document.addEventListener("DOMContentLoaded", () => {
  // ========================
  // 0. 卡片随机排序逻辑
  // ========================
  function shuffleCards() {
    const container = document.querySelector(".card-container");
    if (!container) return;

    const cards = Array.from(container.children);

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    cards.forEach((card) => container.appendChild(card));
  }

  // 执行洗牌
  shuffleCards();

  // ========================
  // 0.5 新增：刷新/随机提示逻辑
  // ========================
  function showRefreshToast() {
    // 创建 Toast 元素
    const toast = document.createElement("div");
    toast.className = "refresh-toast";

    // 这里使用一个简单的 SVG 图标字符串
    toast.innerHTML = `
      <svg class="icon" viewBox="0 0 512 512">
        <path fill="currentColor" d="M403.5 30.6c15.8 4.7 20.9 25 9.7 34.6L378.1 94c34.3 40 53.9 91.5 53.9 146c0 106.8-73.4 196.4-172.6 222.1c-14.9 3.9-30.2-5.1-34-20s5.1-30.2 20-34C319.4 386.9 368 319.4 368 240c0-43.2-15.8-82.6-42.3-112.9l-26.6 35.8c-10.3 13.9-31.5 13-35.8-3.7L241.6 5.6C238.9-5.1 250.7-14.7 260.6-11.4l142.9 42zM128 240c0 43.2 15.8 82.6 42.3 112.9l26.6-35.8c10.3-13.9 31.5-13 35.8 3.7l21.6 153.6c2.7 10.7-9.1 20.3-19.1 17l-142.9-42c-15.8-4.7-20.9-25-9.7-34.6l35.1-28.8C83.6 346 64 294.5 64 240C64 133.2 137.4 43.6 236.6 17.9c14.9-3.9 30.2 5.1 34 20s-5.1 30.2-20 34C192.6 93.1 144 160.6 144 240z"/>
      </svg>
      已为您随机推荐机场
    `;

    document.body.appendChild(toast);

    // 稍微延迟后显示（产生滑入动画）
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    // 3秒后自动消失
    setTimeout(() => {
      toast.classList.remove("show");
      // 动画结束后从 DOM 移除
      setTimeout(() => {
        toast.remove();
      }, 600);
    }, 3000);
  }

  // ========================
  // 1. 进度条加载逻辑
  // ========================
  const preloader = document.getElementById("preloader");
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  let progress = 0;
  const intervalTime = 30;

  const interval = setInterval(() => {
    if (progress < 90) {
      progress += Math.random() * 5;
      if (progress > 90) progress = 90;
      updateLoader(progress);
    }
  }, intervalTime);

  function updateLoader(value) {
    const roundedVal = Math.floor(value);
    if (progressBar) progressBar.style.width = `${roundedVal}%`;
    if (progressText) progressText.textContent = `${roundedVal}%`;
  }

  // 当页面加载完毕后
  window.addEventListener("load", () => {
    clearInterval(interval);
    updateLoader(100);

    setTimeout(() => {
      if (preloader) {
        preloader.classList.add("fade-out");
        setTimeout(() => {
          preloader.style.display = "none";
          // 页面加载动画完全结束后，显示刷新提示
          showRefreshToast();
        }, 500);
      } else {
        // 如果没有 preloader，直接显示提示
        showRefreshToast();
      }
    }, 500);
  });

  // ========================
  // 2. 滚动显现动画 (Intersection Observer)
  // ========================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 重要：重新获取 DOM 元素，因为之前进行了随机排序
  const scrollElements = document.querySelectorAll(".scroll-reveal");
  scrollElements.forEach((el) => observer.observe(el));

  // ========================
  // 3. 返回顶部按钮
  // ========================
  const backToTopButton = document.getElementById("back-to-top");

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ========================
  // 4. 按钮点击反馈
  // ========================
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 100);
    });
  });
});
