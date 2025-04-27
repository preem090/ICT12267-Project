function showPopup(productName) {
    const popup = document.getElementById('popup');
    // ตั้งค่าข้อความใน popup
    popup.textContent = `เพิ่ม ${productName} ลงในตะกร้าสินค้าเรียบร้อยแล้ว!`;
    popup.classList.remove('hidden'); // เอา hidden ออก

    // ซ่อน popup หลังจาก 2 วินาที
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    // แบนเนอร์สไลด์
    let currentSlide = 0;
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    // สร้างดอทนำทาง
    createDots();

    // เริ่มต้นสไลด์
    showSlide(currentSlide);

    // อัตโนมัติเปลี่ยนสไลด์ทุก 5 วินาที
    let slideInterval = setInterval(nextSlide, 5000);

    // ปุ่มนำทาง
    document.querySelector('.prev').addEventListener('click', prevSlide);
    document.querySelector('.next').addEventListener('click', nextSlide);

    // เมื่อโฮเวอร์ที่แบนเนอร์ ให้หยุดสไลด์อัตโนมัติ
    const banner = document.querySelector('.banner');
    banner.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    banner.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // ฟังก์ชันสร้างจุดนำทาง
    function createDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'banner-dots';

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.dataset.index = i;
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        document.querySelector('.banner').appendChild(dotsContainer);
    }

    // ฟังก์ชันแสดงสไลด์
    function showSlide(index) {
        // ปรับตำแหน่งสไลด์
        document.querySelector('.banner-slider').style.transform = `translateX(-${index * 100}%)`;

        // อัพเดตจุดนำทาง
        updateDots(index);
    }

    // ฟังก์ชันอัพเดตจุดนำทาง
    function updateDots(index) {
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    // ฟังก์ชันสไลด์ถัดไป
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // ฟังก์ชันสไลด์ก่อนหน้า
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // ฟังก์ชันไปยังสไลด์ที่กำหนด
    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    // เอฟเฟกต์เมื่อเลื่อนหน้าจอ
    const animateOnScroll = () => {
        const products = document.querySelectorAll('.product-card');

        products.forEach(product => {
            const productPosition = product.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (productPosition < screenPosition) {
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            }
        });
    };

    // ตั้งค่าเริ่มต้นสำหรับเอฟเฟกต์
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        product.style.opacity = '0';
        product.style.transform = 'translateY(20px)';
        product.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // เรียกใช้เมื่อเลื่อน
    window.addEventListener('scroll', animateOnScroll);
    // เรียกใช้ครั้งแรกเมื่อโหลดหน้า
    animateOnScroll();

    // เพิ่มเอฟเฟกต์เมื่อคลิกปุ่มสั่งซื้อ
    const buyButtons = document.querySelectorAll('.btn-buy');
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // เอฟเฟกต์การคลิก
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);

            // แสดง popup แทน alert
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            showPopup(productName);
        });
    });
});

// ฟังก์ชันแสดง Popup
function showPopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden'); // เอา hidden ออก

    // ซ่อน popup หลังจาก 2 วินาที
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 2000);
}

// ใส่ Event Listener ให้ปุ่มสั่งซื้อทุกปุ่ม
const buyButtons = document.querySelectorAll('.btn-buy');
buyButtons.forEach(button => {
    button.addEventListener('click', showPopup);
});