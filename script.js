document.addEventListener("DOMContentLoaded", () => {
  // ========================
  // 1. 进度条加载逻辑
  // ========================
  const preloader = document.getElementById("preloader");
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  let progress = 0;
  const intervalTime = 30; // 每30毫秒更新一次

  // 模拟进度增长
  const interval = setInterval(() => {
    // 随机增加进度，但不要超过 90%，剩下的 10% 等页面完全加载完再补齐
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

  // 当页面所有资源（图片、样式等）加载完毕后
  window.addEventListener("load", () => {
    clearInterval(interval);

    // 补齐剩下的进度到 100%
    updateLoader(100);

    // 稍微延迟一点，让用户看到 100%
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add("fade-out");
        // 动画结束后移除元素，释放内存
        setTimeout(() => {
          preloader.style.display = "none";
        }, 500);
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
