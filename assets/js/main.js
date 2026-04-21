document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Photo array - all your current images
    const photos = [
        '13EF3EE1-A38D-466E-BE17-308FC100D6A5.jpg',
        'DSC00692.JPG',
        'DSC00917.JPG',
        'DSC01020.JPG',
        'DSC01046.JPG',
        'DSC01117.JPG',
        'DSC01136.JPG',
        'DSC01174.JPG',
        'DSC01245.JPG',
        'DSC01265.JPG',
        'DSC01548.JPG',
        'DSC01575.JPG',
        'DSC02093.JPG',
        'DSC02136.JPG',
        'DSC02356.JPG',
        'DSC04111.jpg',
        'DSC04130.jpg',
        'DSC04153.JPG',
        'DSC04862.JPG',
        'DSC04875.jpg',
        'IMG_0200.jpg',
        'IMG_0960.jpg',
        'IMG_0965.jpg',
        'IMG_1842.jpg',
        'IMG_1849.jpg',
        'IMG_2595.jpg',
        'IMG_2711.jpg',
        'IMG_4072.jpg',
        'IMG_4239.jpg',
        'IMG_4256.jpg',
        'IMG_5026.jpg',
        'IMG_5333.jpg',
        'IMG_6452.jpeg',
        'IMG_6734.jpeg',
        'IMG_8492.jpeg',
        'IMG_8584.jpeg'
    ];

    // Layout patterns with weights (higher = more likely)
    const layoutPatterns = [
        { type: 'full-width', weight: 15 },
        { type: 'pair', weight: 20 },
        { type: 'triple', weight: 10 },
        { type: 'triple-asym', weight: 8 },
        { type: 'single', weight: 18 },
        { type: 'single-crop-left', weight: 8 },
        { type: 'single-crop-right', weight: 8 },
        { type: 'single-crop-heavy-left', weight: 4 },
        { type: 'single-crop-heavy-right', weight: 4 },
        { type: 'single-small', weight: 8 },
        { type: 'single-tall', weight: 5 },
        { type: 'single-offset', weight: 7 }
    ];

    // Generate random layout for photos page
    function generateRandomLayout() {
        const container = document.getElementById('photos-container');
        if (!container) return;

        // Shuffle photos array and show all of them
        const selectedPhotos = [...photos].sort(() => Math.random() - 0.5);
        let photoIndex = 0;
        let html = '';

        while (photoIndex < selectedPhotos.length) {
            const pattern = getRandomPattern();
            const layoutHTML = createLayoutBlock(pattern, selectedPhotos, photoIndex);
            
            if (layoutHTML.html) {
                html += layoutHTML.html;
                photoIndex += layoutHTML.photosUsed;
            } else {
                // Fallback if we can't fit the pattern
                photoIndex++;
            }
        }

        container.innerHTML = html;
        
        // Reinitialize modal functionality
        initializeModal();
    }

    // Get random pattern based on weights
    function getRandomPattern() {
        const totalWeight = layoutPatterns.reduce((sum, pattern) => sum + pattern.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const pattern of layoutPatterns) {
            random -= pattern.weight;
            if (random <= 0) {
                return pattern.type;
            }
        }
        
        return 'single'; // fallback
    }

    // Get random size and position classes
    function getRandomVariations() {
        const sizeClasses = ['', 'size-xs', 'size-sm', 'size-lg', 'size-xl'];
        const positionClasses = ['', 'pos-left', 'pos-right', 'pos-far-left', 'pos-far-right', 'pos-offset-up', 'pos-offset-down'];
        const stripHeightClasses = ['', 'strip-short', 'strip-medium', 'strip-tall', 'strip-extra-tall'];
        const pairHeightClasses = ['', 'pair-short', 'pair-tall'];
        const tripleHeightClasses = ['', 'triple-short', 'triple-tall'];
        
        return {
            size: sizeClasses[Math.floor(Math.random() * sizeClasses.length)],
            position: positionClasses[Math.floor(Math.random() * positionClasses.length)],
            stripHeight: stripHeightClasses[Math.floor(Math.random() * stripHeightClasses.length)],
            pairHeight: pairHeightClasses[Math.floor(Math.random() * pairHeightClasses.length)],
            tripleHeight: tripleHeightClasses[Math.floor(Math.random() * tripleHeightClasses.length)]
        };
    }

    // Create HTML for a layout block
    function createLayoutBlock(pattern, photos, startIndex) {
        const remainingPhotos = photos.length - startIndex;
        let html = '';
        let photosUsed = 0;
        const variations = getRandomVariations();

        switch (pattern) {
            case 'full-width':
                if (remainingPhotos >= 1) {
                    html = `
                        <div class="photo-strip-full ${variations.stripHeight}">
                            <div class="photo-item" data-src="assets/images/${photos[startIndex]}">
                                <img src="assets/images/${photos[startIndex]}" alt="">
                            </div>
                        </div>
                    `;
                    photosUsed = 1;
                }
                break;

            case 'pair':
                if (remainingPhotos >= 2) {
                    html = `
                        <div class="section">
                            <div class="photo-pair ${variations.pairHeight}">
                                <div class="photo-item" data-src="assets/images/${photos[startIndex]}">
                                    <img src="assets/images/${photos[startIndex]}" alt="">
                                </div>
                                <div class="photo-item" data-src="assets/images/${photos[startIndex + 1]}">
                                    <img src="assets/images/${photos[startIndex + 1]}" alt="">
                                </div>
                            </div>
                        </div>
                    `;
                    photosUsed = 2;
                }
                break;

            case 'triple':
                if (remainingPhotos >= 3) {
                    html = `
                        <div class="section">
                            <div class="photo-triple ${variations.tripleHeight}">
                                <div class="photo-item" data-src="assets/images/${photos[startIndex]}">
                                    <img src="assets/images/${photos[startIndex]}" alt="">
                                </div>
                                <div class="photo-item" data-src="assets/images/${photos[startIndex + 1]}">
                                    <img src="assets/images/${photos[startIndex + 1]}" alt="">
                                </div>
                                <div class="photo-item" data-src="assets/images/${photos[startIndex + 2]}">
                                    <img src="assets/images/${photos[startIndex + 2]}" alt="">
                                </div>
                            </div>
                        </div>
                    `;
                    photosUsed = 3;
                }
                break;

            case 'triple-asym':
                if (remainingPhotos >= 3) {
                    html = `
                        <div class="section">
                            <div class="photo-triple-asym ${variations.tripleHeight}">
                                <div class="photo-item" data-src="assets/images/${photos[startIndex]}">
                                    <img src="assets/images/${photos[startIndex]}" alt="">
                                </div>
                                <div class="photo-item" data-src="assets/images/${photos[startIndex + 1]}">
                                    <img src="assets/images/${photos[startIndex + 1]}" alt="">
                                </div>
                                <div class="photo-item" data-src="assets/images/${photos[startIndex + 2]}">
                                    <img src="assets/images/${photos[startIndex + 2]}" alt="">
                                </div>
                            </div>
                        </div>
                    `;
                    photosUsed = 3;
                }
                break;

            case 'single':
                if (remainingPhotos >= 1) {
                    html = `
                        <div class="section">
                            <div class="photo-single ${variations.size} ${variations.position}">
                                <div class="photo-item" data-src="assets/images/${photos[startIndex]}">
                                    <img src="assets/images/${photos[startIndex]}" alt="">
                                </div>
                            </div>
                        </div>
                    `;
                    photosUsed = 1;
                }
                break;

            case 'single-crop-left':
                if (remainingPhotos >= 1) {
                    html = `
                        <div class="photo-single crop-left">
                            <div class="photo-item" data-src="assets/images/${photos[startIndex]}">
                                <img src="assets/images/${photos[startIndex]}" alt="">
                            </div>
                        </div>
                    `;
                    photosUsed = 1;
                }
                break;

            case 'single-crop-right':
                if (remainingPhotos >= 1) {
                    html = `
                        <div class="photo-single crop-right">
                            <div class="photo-item" data-src="assets/images/${photos[startIndex]}">
                                <img src="assets/images/${photos[startIndex]}" alt="">
                            </div>
                        </div>
                    `;
                    photosUsed = 1;
                }
                break;

            case 'single-crop-heavy-left':
                if (remainingPhotos >= 1) {
                    html = `
                        <div class="photo-single crop-heavy-left">
                            <div class="photo-item" data-src="assets/images/${photos[startIndex]}">
                                <img src="assets/images/${photos[startIndex]}" alt="">
                            </div>
                        </div>
                    `;
                    photosUsed = 1;
                }
                break;

            case 'single-crop-heavy-right':
                if (remainingPhotos >= 1) {
                    html = `
                        <div class="photo-single crop-heavy-right">
                            <div class="photo-item" data-src="assets/images/${photos[startIndex]}">
                                <img src="assets/images/${photos[startIndex]}" alt="">
                            </div>
                        </div>
                    `;
                    photosUsed = 1;
                }
                break;

            case 'single-small':
                if (remainingPhotos >= 1) {
                    html = `
                        <div class="photo-small ${variations.size} ${variations.position}">
                            <div class="photo-item" data-src="assets/images/${photos[startIndex]}">
                                <img src="assets/images/${photos[startIndex]}" alt="">
                            </div>
                        </div>
                    `;
                    photosUsed = 1;
                }
                break;

            case 'single-tall':
                if (remainingPhotos >= 1) {
                    html = `
                        <div class="photo-tall ${variations.size} ${variations.position}">
                            <div class="photo-item" data-src="assets/images/${photos[startIndex]}">
                                <img src="assets/images/${photos[startIndex]}" alt="">
                            </div>
                        </div>
                    `;
                    photosUsed = 1;
                }
                break;

            case 'single-offset':
                if (remainingPhotos >= 1) {
                    html = `
                        <div class="section-offset">
                            <div class="photo-single ${variations.size} ${variations.position}">
                                <div class="photo-item" data-src="assets/images/${photos[startIndex]}">
                                    <img src="assets/images/${photos[startIndex]}" alt="">
                                </div>
                            </div>
                        </div>
                    `;
                    photosUsed = 1;
                }
                break;
        }

        return { html, photosUsed };
    }

    // Initialize modal functionality
    function initializeModal() {
        const modal = document.getElementById('photo-modal');
        const modalImage = document.getElementById('modal-image');
        const photoItems = document.querySelectorAll('.photo-item');

        if (modal && modalImage) {
            // Remove existing event listeners by cloning modal
            const newModal = modal.cloneNode(true);
            modal.parentNode.replaceChild(newModal, modal);
            
            // Re-get references
            const freshModal = document.getElementById('photo-modal');
            const freshModalImage = document.getElementById('modal-image');

            // Open modal when photo is clicked
            photoItems.forEach(item => {
                item.addEventListener('click', function() {
                    const fullSrc = this.dataset.src || this.querySelector('img').src;
                    const alt = this.querySelector('img').alt || '';

                    freshModalImage.src = fullSrc;
                    freshModalImage.alt = alt;
                    
                    freshModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });

            // Close modal functionality
            freshModal.addEventListener('click', function(e) {
                if (e.target === freshModal || e.target === freshModalImage) {
                    closeModal();
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && freshModal.classList.contains('active')) {
                    closeModal();
                }
            });

            function closeModal() {
                freshModal.classList.remove('active');
                document.body.style.overflow = '';
                
                setTimeout(() => {
                    if (!freshModal.classList.contains('active')) {
                        freshModalImage.src = '';
                    }
                }, 300);
            }
        }
    }

    // Homepage photo population
    function populateHomepage() {
        // Use specific photo for hero
        const heroContainer = document.getElementById('homepage-hero');
        if (heroContainer) {
            const heroImg = document.createElement('img');
            heroImg.src = 'assets/images/DSC01020.JPG';
            heroImg.alt = '';
            heroContainer.insertBefore(heroImg, heroContainer.firstChild);
        }
        
        // Add click functionality to hero
        const heroArea = document.querySelector('.homepage-hero');
        if (heroArea) {
            heroArea.addEventListener('click', function() {
                window.location.href = 'photos.html';
            });
        }
    }

    // Initialize appropriate functionality based on page
    if (document.getElementById('photos-container')) {
        // Photos page - generate random layout
        generateRandomLayout();
    } else if (document.getElementById('homepage-hero')) {
        // Homepage - populate with random photos but keep structure
        populateHomepage();
    }
});