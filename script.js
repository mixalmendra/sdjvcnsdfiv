document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. FAQ ACCORDION
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const answer = item.querySelector('.faq-answer');
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            
            // Close other open FAQ items (optional, but clean)
            faqItems.forEach(otherItem => {
                const otherTrigger = otherItem.querySelector('.faq-trigger');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                if (otherItem !== item && otherTrigger.getAttribute('aria-expanded') === 'true') {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    otherAnswer.style.maxHeight = '0px';
                    setTimeout(() => {
                        otherAnswer.setAttribute('hidden', '');
                    }, 300);
                }
            });
            // Toggle current item
            if (isExpanded) {
                trigger.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0px';
                // Delay hiding element until animation finishes
                setTimeout(() => {
                    answer.setAttribute('hidden', '');
                }, 300);
            } else {
                answer.removeAttribute('hidden');
                trigger.setAttribute('aria-expanded', 'true');
                // Calculate height dynamically
                const height = answer.scrollHeight;
                answer.style.maxHeight = `${height}px`;
            }
        });
    });
    // ==========================================
    // 2. POLAROID SIMULATOR
    // ==========================================
    const captionInput = document.getElementById('caption-input');
    const polaroidCaption = document.getElementById('polaroid-caption-text');
    const brightnessSlider = document.getElementById('brightness-slider');
    const contrastSlider = document.getElementById('contrast-slider');
    const valBrightness = document.getElementById('val-brightness');
    const valContrast = document.getElementById('val-contrast');
    const filterButtons = document.querySelectorAll('.btn-filter');
    const filterOverlay = document.getElementById('polaroid-filter-overlay');
    const photoUploadInput = document.getElementById('photo-upload-input');
    const imagePlaceholder = document.getElementById('polaroid-image-placeholder');
    const imageArea = document.getElementById('polaroid-image-area');
    let currentPhotoElement = null;
    // A. Dynamic Text Caption
    captionInput.addEventListener('input', (e) => {
        const text = e.target.value;
        polaroidCaption.textContent = text || '¡Tu recuerdo va acá!';
    });
    // B. Upload Photo Simulation
    imagePlaceholder.addEventListener('click', () => {
        photoUploadInput.click();
    });
    photoUploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                // Remove placeholder content but keep overlay
                imagePlaceholder.style.display = 'none';
                
                // Create image if it doesn't exist
                if (!currentPhotoElement) {
                    currentPhotoElement = document.createElement('img');
                    currentPhotoElement.id = 'uploaded-polaroid-photo';
                    currentPhotoElement.alt = 'Uploaded preview';
                    imageArea.appendChild(currentPhotoElement);
                }
                
                currentPhotoElement.src = event.target.result;
                applyImageStyles();
            };
            reader.readAsDataURL(file);
        }
    });
    // C. Adjustments (Brightness & Contrast)
    function applyImageStyles() {
        if (!currentPhotoElement) return;
        const brightness = brightnessSlider.value;
        const contrast = contrastSlider.value;
        currentPhotoElement.style.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
    }
    brightnessSlider.addEventListener('input', (e) => {
        valBrightness.textContent = `${e.target.value}%`;
        applyImageStyles();
    });
    contrastSlider.addEventListener('input', (e) => {
        valContrast.textContent = `${e.target.value}%`;
        applyImageStyles();
    });
    // D. Filters
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterType = btn.dataset.filter;
            
            // Clear filter classes
            filterOverlay.className = 'polaroid-filter-overlay';
            
            if (filterType !== 'none') {
                filterOverlay.classList.add(`filter-${filterType}`);
            }
        });
    });
    // ==========================================
    // 3. COLOR SELECTOR
    // ==========================================
    const colorCards = document.querySelectorAll('.color-card');
    colorCards.forEach(card => {
        card.addEventListener('click', () => {
            colorCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            // In a real application, we would change the main product image shown in the Hero/Gallery
            const selectedColor = card.dataset.color;
            console.log(`Selected printer color: ${selectedColor}`);
        });
    });
    // ==========================================
    // 4. COMPONENTS INTERACTIVE EXPLODED VIEW
    // ==========================================
    const indicators = document.querySelectorAll('.part-indicator');
    const partTitle = document.getElementById('part-title');
    const partDesc = document.getElementById('part-desc');
    const selectHint = document.querySelector('.select-hint');
    // Content definitions
    const partsData = {
        '1': {
            title: 'Tapa Superior Abatible',
            desc: 'Protege la pantalla LCD y los botones de control cuando el dispositivo está en tránsito. Se despliega fácilmente para comenzar a operar.'
        },
        '2': {
            title: 'Pantalla LCD y Controles',
            desc: 'Pantalla a color integrada que te permite navegar por el menú, elegir la foto de tu galería USB/Tarjeta, recortarla y previsualizarla antes de imprimir.'
        },
        '3': {
            title: 'Cabezal Térmico de Alta Precisión',
            desc: 'Aplica calor de manera controlada y precisa a la cinta de tinta para transferir los colores al papel especial de sublimación, con una resolución de 300 x 300 ppp.'
        },
        '4': {
            title: 'Cartucho de Cinta de Sublimación',
            desc: 'Contiene las capas de color Amarillo (Yellow), Magenta (Magenta), Cian (Cyan) y una capa protectora final de laminado que cuida la foto del agua, polvo y huellas.'
        },
        '5': {
            title: 'Rodillos de Tracción de Papel',
            desc: 'Mecanismo ultra silencioso que introduce y extrae la hoja de papel cuatro veces de forma consecutiva (una para cada color, y una final para el laminado).'
        }
    };
    indicators.forEach(ind => {
        ind.addEventListener('click', () => {
            // Toggle active state
            indicators.forEach(i => i.classList.remove('active'));
            ind.classList.add('active');
            // Show description
            const partNum = ind.textContent.trim();
            const data = partsData[partNum];
            
            if (data) {
                selectHint.style.display = 'none';
                partTitle.textContent = data.title;
                partDesc.textContent = data.desc;
                
                // Add a small fade-in transition
                partTitle.style.animation = 'none';
                partDesc.style.animation = 'none';
                // Trigger reflow
                void partTitle.offsetWidth;
                
                partTitle.style.animation = 'fadeIn 0.4s ease forwards';
                partDesc.style.animation = 'fadeIn 0.4s ease forwards';
            }
        });
    });
    // Add keyframe animation styling dynamically for the info box text
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(styleSheet);
});
