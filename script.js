// ===== NAVBAR HIDE ON SCROLL =====
let lastScrollY = window.scrollY;
const header = document.querySelector('header');
let isNavbarHidden = false;

// ===== TOGGLE HAMBURGER MENU =====
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '5%';
                navLinks.style.background = 'rgba(10, 10, 10, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderRadius = '10px';
                navLinks.style.border = '1px solid rgba(255,255,255,0.1)';
                navLinks.style.zIndex = '99';
                navLinks.style.gap = '1.5rem';
            }
        });
    }

    // ===== 3D INSTAGRAM CARD INTERACTIVITY =====
    const card = document.getElementById('instagramCard');
    const glare = document.getElementById('cardGlare');
    const image = document.getElementById('cardImage');
    const likeBtn = document.getElementById('likeBtn');
    const saveBtn = document.getElementById('saveBtn');
    const heartPop = document.getElementById('heartPop');
    const likeCount = document.getElementById('likeCount');

    if (card) {
        let isHovered = false;
        let rotation = { x: 0, y: 0 };
        let targetRotation = { x: 0, y: 0 };
        let liked = false;
        let saved = false;
        let likes = 12400;
        let animationFrame = null;

        const updateCard = () => {
            rotation.x += (targetRotation.x - rotation.x) * 0.08;
            rotation.y += (targetRotation.y - rotation.y) * 0.08;

            card.style.transform = `
                rotateX(${rotation.x}deg) 
                rotateY(${rotation.y}deg) 
                scale(${isHovered ? 1.03 : 1})
            `;

            animationFrame = requestAnimationFrame(updateCard);
        };

        updateCard();

        card.addEventListener('mousemove', (e) => {
            if (!isHovered) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 15;
            const rotateX = -((y - centerY) / centerY) * 15;

            targetRotation.x = rotateX;
            targetRotation.y = rotateY;

            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;
            glare.style.background = `
                radial-gradient(
                    circle at ${glareX}% ${glareY}%, 
                    rgba(255, 255, 255, 0.25) 0%, 
                    rgba(255, 255, 255, 0) 60%
                )
            `;
        });

        card.addEventListener('mouseenter', () => {
            isHovered = true;
        });

        card.addEventListener('mouseleave', () => {
            isHovered = false;
            targetRotation.x = 0;
            targetRotation.y = 0;
            glare.style.background = 'transparent';
        });

        function handleLike() {
            liked = !liked;
            if (liked) {
                likes += 1;
                heartPop.classList.remove('show');
                void heartPop.offsetWidth;
                heartPop.classList.add('show');
                setTimeout(() => heartPop.classList.remove('show'), 500);
            } else {
                likes -= 1;
            }
            updateLikeUI();
        }

        function updateLikeUI() {
            const heartIcon = likeBtn.querySelector('.icon-heart');
            if (liked) {
                heartIcon.classList.add('liked');
            } else {
                heartIcon.classList.remove('liked');
            }
            const count = likes >= 1000 ? (likes / 1000).toFixed(1) + 'K' : likes;
            likeCount.textContent = `${count} menyukai ini`;
        }

        if (image) {
            image.addEventListener('dblclick', (e) => {
                e.stopPropagation();
                handleLike();
            });
        }

        if (likeBtn) {
            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                handleLike();
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                saved = !saved;
                const bookmarkIcon = saveBtn.querySelector('.icon-bookmark');
                if (saved) {
                    bookmarkIcon.classList.add('saved');
                } else {
                    bookmarkIcon.classList.remove('saved');
                }
            });
        }
    }

    // ===== CLIENTS - SEAMLESS RUNNING TEXT =====
    const tracks = document.querySelectorAll('.clients-track-inner');
    
    tracks.forEach(track => {
        const parent = track.parentElement;
        if (parent) {
            parent.addEventListener('mouseenter', () => {
                track.style.animationPlayState = 'paused';
            });
            
            parent.addEventListener('mouseleave', () => {
                track.style.animationPlayState = 'running';
            });
        }
        
        const totalWidth = track.scrollWidth;
        const containerWidth = track.parentElement?.offsetWidth || window.innerWidth;
        
        if (totalWidth > containerWidth) {
            const baseSpeed = 25;
            const ratio = totalWidth / containerWidth;
            const duration = Math.max(15, Math.min(40, baseSpeed * (ratio / 2)));
            
            if (parent?.classList.contains('clients-track-left')) {
                track.style.animationDuration = duration + 's';
            } else if (parent?.classList.contains('clients-track-right')) {
                track.style.animationDuration = duration + 's';
            }
        }
    });

    // ===== HERO TEXT ANIMATION =====
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(20px)';

        setTimeout(() => {
            heroText.style.transition = 'all 0.8s ease-out';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 200);
    }

    // ===== RESPONSIVE CLIENTS - RE-RUN ON RESIZE =====
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const tracks = document.querySelectorAll('.clients-track-inner');
            tracks.forEach(track => {
                const totalWidth = track.scrollWidth;
                const containerWidth = track.parentElement?.offsetWidth || window.innerWidth;
                
                if (totalWidth > containerWidth) {
                    const baseSpeed = 25;
                    const ratio = totalWidth / containerWidth;
                    const duration = Math.max(15, Math.min(40, baseSpeed * (ratio / 2)));
                    
                    const parent = track.parentElement;
                    if (parent?.classList.contains('clients-track-left')) {
                        track.style.animationDuration = duration + 's';
                    } else if (parent?.classList.contains('clients-track-right')) {
                        track.style.animationDuration = duration + 's';
                    }
                }
            });
        }, 500);
    });
});

// ===== NAVBAR HIDE ON SCROLL - EVENT LISTENER =====
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY) {
        // Scroll ke bawah → Sembunyikan navbar
        if (!isNavbarHidden && currentScrollY > 80) {
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            isNavbarHidden = true;
        }
    } else {
        // Scroll ke atas → Munculkan navbar
        if (isNavbarHidden) {
            header.style.transform = 'translateY(0)';
            header.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            isNavbarHidden = false;
        }
    }
    
    // Reset navbar saat di posisi paling atas
    if (currentScrollY === 0) {
        header.style.transform = 'translateY(0)';
        isNavbarHidden = false;
    }
    
    lastScrollY = currentScrollY;
});