document.addEventListener('DOMContentLoaded', () => {
    // 返回顶部按钮功能
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 给所有按钮添加点击事件
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!button.getAttribute('href')) {
                e.preventDefault();
                // 简单的点击效果
                button.textContent = '处理中...';
                button.style.opacity = '0.7';

                // 模拟处理
                setTimeout(() => {
                    button.textContent = '订购成功';
                    button.style.backgroundColor = '#28a745';
                    button.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

                    // 恢复按钮
                    setTimeout(() => {
                        button.textContent = '立即订购';
                        button.style.opacity = '1';
                        button.style.background = 'linear-gradient(135deg, #6e8efb, #a777e3)';
                    }, 2000);
                }, 1000);
            }
        });
    });

    // 添加卡片悬停效果增强
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // 添加轻微的放大效果
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            // 恢复正常状态
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
        });
    });
}); 