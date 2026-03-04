//toggle mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.mobile-nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('nav-open');

            //toggle icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // projects carousel (desktop)
    const projectsScroll = document.querySelector('.projects-scroll');
    const carouselBtnLeft = document.querySelector('.carousel-btn-left');
    const carouselBtnRight = document.querySelector('.carousel-btn-right');

    if (projectsScroll && carouselBtnLeft && carouselBtnRight) {
        const scrollAmount = 432; // ~400px card + 2rem gap

        function updateCarouselButtons() {
            carouselBtnLeft.disabled = projectsScroll.scrollLeft <= 0;
            carouselBtnRight.disabled = projectsScroll.scrollLeft + projectsScroll.clientWidth >= projectsScroll.scrollWidth - 1;
        }

        carouselBtnLeft.addEventListener('click', function() {
            projectsScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        carouselBtnRight.addEventListener('click', function() {
            projectsScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        projectsScroll.addEventListener('scroll', updateCarouselButtons);
        updateCarouselButtons();
    }

    // Sticky sidebar collapse on mobile/tablet
    const sidebarContent = document.querySelector('.sidebar-content');
    if (sidebarContent) {
        let scrollListenerPaused = false;

        const handleScroll = () => {
            if (scrollListenerPaused) return;
            if (window.innerWidth <= 1024) {
                if (!sidebarContent.classList.contains('sidebar-expanded')) {
                    sidebarContent.classList.toggle('sidebar-scrolled', window.scrollY > 10);
                }
            } else {
                sidebarContent.classList.remove('sidebar-scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        // sidebar collapse toggle (tablet/mobile)
        document.addEventListener('click', function(e) {
            const btn = e.target.closest('.sidebar-btn');
            if (!btn) return;

            const isExpanding = !sidebarContent.classList.contains('sidebar-expanded');
            sidebarContent.classList.toggle('sidebar-expanded');

            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            }

            if (isExpanding) {
                // Expanding: remove scrolled state so quote and btn are visible
                sidebarContent.classList.remove('sidebar-scrolled');
            } else {
                // Collapsing: pause scroll listener so it doesn't fire mid-animation
                scrollListenerPaused = true;
                sidebarContent.classList.remove('sidebar-scrolled');
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Resume after collapse animation + scroll completes
                setTimeout(() => {
                    scrollListenerPaused = false;
                }, 500); // matches 0.3s transition + buffer
            }
        });
    }
});