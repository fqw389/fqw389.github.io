document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');

    const backToTop = document.getElementById('back-to-top');
    console.log('Back to top button:', backToTop);

    const announcement = document.getElementById('announcement');
    console.log('Announcement:', announcement);

    // 监听滚动事件
    window.addEventListener('scroll', () => {
        // 当页面滚动超过300px时显示按钮
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // 点击按钮返回顶部
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 公告弹窗控制
    const announcement = document.getElementById('announcement');
    const closeBtn = announcement.querySelector('.close-btn');

    // 检查上次关闭时间
    const lastShownTime = localStorage.getItem('announcementLastShown');
    const currentTime = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24小时的毫秒数

    // 如果没有显示记录，或者距离上次显示超过24小时
    if (!lastShownTime || (currentTime - parseInt(lastShownTime)) > twentyFourHours) {
        setTimeout(() => {
            announcement.classList.add('show');
        }, 500);
    }

    // 关闭按钮点击事件
    closeBtn.addEventListener('click', () => {
        announcement.classList.remove('show');
        localStorage.setItem('announcementLastShown', new Date().getTime().toString());
    });

    // 点击背景关闭
    announcement.addEventListener('click', (e) => {
        if (e.target === announcement) {
            announcement.classList.remove('show');
            localStorage.setItem('announcementLastShown', new Date().getTime().toString());
        }
    });
});

