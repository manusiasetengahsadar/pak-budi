function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    const offsetTop = element.offsetTop;
    window.scrollTo({
        top: offsetTop - 80, 
        behavior: 'smooth'
    });
}

const sections = document.querySelectorAll('section');
let delay = 0;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            delay += 200; 
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

function openModal(src, type) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalVideo = document.getElementById('modal-video');
    
    modal.style.display = 'block';
    if (type === 'image') {
        modalImg.src = src;
        modalImg.style.display = 'block';
        modalVideo.style.display = 'none';
    } else {
        modalVideo.src = src;
        modalVideo.style.display = 'block';
        modalImg.style.display = 'none';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.getElementById('modal-video').pause();
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !phone || !email || !message) {
        alert('Semua field harus diisi!');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid!');
        return;
    }

    const contactData = { name, phone, email, message };
    localStorage.setItem('contactMessage', JSON.stringify(contactData));

    alert('Pesan berhasil dikirim! Terima kasih atas kontaknya.');

    document.getElementById('contact-form').reset();
});