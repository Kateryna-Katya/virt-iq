/**
 * VIRT-IQ.ORG Core Script
 * Includes: Navigation, Animations, Form Logic, Captcha, Cookies
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация иконок Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Инициализация AOS (анимация при скролле)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-expo',
            once: true,
            offset: 100
        });
    }

    // 3. Управление хедером при скролле
    const header = document.getElementById('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // 4. Мобильное меню (Бургер)
    const burger = document.getElementById('burger-menu');
    const overlay = document.getElementById('mobile-overlay');
    const navLinks = document.querySelectorAll('.mobile-nav a');

    const toggleMenu = () => {
        const isActive = burger.classList.toggle('burger--active');
        overlay.style.display = isActive ? 'flex' : 'none';
        document.body.style.overflow = isActive ? 'hidden' : 'initial';
        
        if (isActive) {
            gsap.from(".mobile-nav li", {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.4,
                ease: "power2.out"
            });
        }
    };

    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (burger.classList.contains('burger--active')) toggleMenu();
        });
    });

    // 5. GSAP Hero Text Animation
    if (typeof gsap !== 'undefined') {
        gsap.to("#hero-title", {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "expo.out",
            delay: 0.3
        });
    }

    // 6. Математическая капча
    const captchaLabel = document.getElementById('captcha-label');
    const captchaInput = document.getElementById('captcha-input');
    let captchaResult = 0;

    const generateCaptcha = () => {
        const n1 = Math.floor(Math.random() * 10) + 1;
        const n2 = Math.floor(Math.random() * 10) + 1;
        captchaResult = n1 + n2;
        if (captchaLabel) captchaLabel.innerText = `Подтвердите, что вы не робот: ${n1} + ${n2} = ?`;
    };
    generateCaptcha();

    // 7. Валидация и отправка формы (AJAX имитация)
    const contactForm = document.getElementById('main-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Проверка капчи
            if (parseInt(captchaInput.value) !== captchaResult) {
                formStatus.innerText = "Ошибка капчи. Попробуйте еще раз.";
                formStatus.className = "form__status error";
                generateCaptcha();
                captchaInput.value = '';
                return;
            }

            // Имитация отправки
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerText = "Отправка...";
            
            setTimeout(() => {
                formStatus.innerText = "Успешно! Ваша заявка принята. Мы свяжемся с вами.";
                formStatus.className = "form__status success";
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = "Отправить запрос";
                generateCaptcha();
            }, 2000);
        });
    }

    // 8. Cookie Popup
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (cookiePopup && !localStorage.getItem('virtiq_cookies')) {
        setTimeout(() => {
            cookiePopup.style.display = 'block';
            gsap.from(cookiePopup, { y: 100, opacity: 0, duration: 0.6 });
        }, 3000);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('virtiq_cookies', 'true');
            cookiePopup.style.display = 'none';
        });
    }
});