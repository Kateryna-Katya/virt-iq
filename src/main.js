document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    AOS.init({ duration: 1000, once: true });

    // --- GSAP Hero Animation ---
    gsap.from("#hero-title", {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: "power4.out",
        delay: 0.2
    });

    // --- Mobile Menu ---
    const burger = document.getElementById('burger-menu');
    const overlay = document.getElementById('mobile-overlay');
    
    burger.addEventListener('click', () => {
        burger.classList.toggle('burger--active');
        overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
        document.body.style.overflow = overlay.style.display === 'flex' ? 'hidden' : 'initial';
    });

    // Close menu on link click
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            overlay.style.display = 'none';
            burger.classList.remove('burger--active');
            document.body.style.overflow = 'initial';
        });
    });

    // --- Math Captcha ---
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const captchaLabel = document.getElementById('captcha-label');
    const correctSum = num1 + num2;
    if(captchaLabel) captchaLabel.innerText = `Сколько будет ${num1} + ${num2}?`;

    // --- Form Handling ---
    const form = document.getElementById('main-form');
    const status = document.getElementById('form-status');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const captchaInput = document.getElementById('captcha-input').value;

            if (parseInt(captchaInput) !== correctSum) {
                status.innerText = "Ошибка капчи. Попробуйте снова.";
                status.className = "form__status error";
                return;
            }

            status.innerText = "Отправка...";
            status.className = "form__status";

            // Имитация AJAX
            setTimeout(() => {
                status.innerText = "Спасибо! Мы свяжемся с вами в ближайшее время.";
                status.className = "form__status success";
                form.reset();
            }, 1500);
        });
    }

    // --- Cookie Consent ---
    if (!localStorage.getItem('cookieAccepted')) {
        const cookiePopup = document.getElementById('cookie-popup');
        cookiePopup.style.display = 'block';
        document.getElementById('cookie-accept').addEventListener('click', () => {
            localStorage.setItem('cookieAccepted', 'true');
            cookiePopup.style.display = 'none';
        });
    }
});