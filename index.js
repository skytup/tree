
        // Loading screen
        window.addEventListener('load', () => {
            const loader = document.querySelector('.loading');
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });

        // Enhanced link interactions
        const links = document.querySelectorAll('.link');

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const icon = link.querySelector('i');
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            });

            link.addEventListener('mouseleave', () => {
                const icon = link.querySelector('i');
                icon.style.transform = 'scale(1) rotate(0)';
            });

            link.addEventListener('click', (e) => {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.border = '2px solid rgba(255, 255, 255, 0.5)';
                ripple.style.borderRadius = '50%';
                ripple.style.pointerEvents = 'none';
                ripple.style.transform = 'translate(-50%, -50%)';
                ripple.style.width = '0';
                ripple.style.height = '0';

                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                link.appendChild(ripple);

                ripple.animate([
                    { width: '0', height: '0', opacity: 1 },
                    { width: '500px', height: '500px', opacity: 0 }
                ], {
                    duration: 600,
                    easing: 'ease-out'
                }).onfinish = () => ripple.remove();
            });
        });

        // Add intersection observer for fade-in animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.link').forEach(link => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            observer.observe(link);
        });