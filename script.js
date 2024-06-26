/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x');
    menuIcon.classList.toggle('active');
}

/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.array.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    /*==================== sticky navbar ====================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    menuIcon.classList.remove('active');
};


/*==================== scroll reveal ====================*/
 ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .conctact form', { origin: 'bottom' });

ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*==================== typed js ====================*/
const typed = new Typed('.multiple-text', {
    strings: ['Développeur Web', 'Développeur Android'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

var form = document.getElementById("my-form");

async function handleSubmit(event) {
    event.preventDefault();
    var data = new FormData(event.target);

    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            await Swal.fire({
                icon: 'success',
                title: 'Message envoyé avec succès !',
                text: 'Merci pour votre soumission.',
                confirmButtonColor: '#0ef',
            });
            form.reset();
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Une erreur s\'est produite lors de l\'envoi du formulaire. Veuillez réessayer.',
                confirmButtonColor: '#0ef',
            });
        }
    } catch (error) {
        await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Une erreur s\'est produite lors de l\'envoi du formulaire. Veuillez réessayer.',
            confirmButtonColor: '#0ef',
        });
    }
}
form.addEventListener("submit", handleSubmit);