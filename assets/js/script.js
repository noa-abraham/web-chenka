// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const portfolioGallery = document.getElementById('portfolio-gallery');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Función para renderizar las obras en la galería
    const renderPortfolioItems = (itemsToRender) => {
        portfolioGallery.innerHTML = ''; // Limpia el contenido actual de la galería
        itemsToRender.forEach((item, index) => {
            // Crea un elemento de enlace (<a>) para cada obra.
            // LightGallery requiere que el elemento clickable sea un enlace.
            const portfolioItemAnchor = document.createElement('a'); 
            
            // Asigna las clases CSS para el estilo y la animación.
            portfolioItemAnchor.className = 'portfolio-item animate-fade-in'; 
            
            // Define el destino del enlace para Lightgallery (la imagen completa) y otros atributos de datos.
            portfolioItemAnchor.href = item.image; 
            portfolioItemAnchor.setAttribute('data-src', item.image); 
            
            // *** INICIO DE CAMBIO ***
            // Construye la descripción para LightGallery: Título, Serie (si existe), Descripción General (cat)
            let lightGalleryCaption = `<h4>${item.title}</h4>`;
            if (item.series) {
                lightGalleryCaption += `<p class="series-name">${item.series}</p>`; // Usa la clase para estilizar la serie
            }
            if (item.cat) {
                lightGalleryCaption += `<p class="item-cat-description">${item.cat}</p>`; // Nueva clase para la descripción general
            }
            portfolioItemAnchor.setAttribute('data-sub-html', lightGalleryCaption); 
            // *** FIN DE CAMBIO ***

            portfolioItemAnchor.setAttribute('data-category', item.category || ''); // Atributo para el filtrado.

            // Aplica un retraso a la animación de aparición de cada elemento.
            portfolioItemAnchor.style.animationDelay = `${index * 0.05}s`;

            // Establece el contenido HTML interno del elemento de la obra: la imagen y su título/categoría.
            portfolioItemAnchor.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="img-fluid">
                <div class="portfolio-item-caption">
                    <h3>${item.title}</h3>
                    ${item.series ? `<p class="series-name">${item.series}</p>` : ''} 
                    ${item.cat ? `<p class="item-cat-description">${item.cat}</p>` : ''}
                </div>
            `;
            // Añade el elemento de la obra al contenedor principal de la galería.
            portfolioGallery.appendChild(portfolioItemAnchor);
        });

        // Inicializa Lightgallery después de que todas las obras han sido cargadas en el DOM.
        initLightgallery();
    };

    // Función para inicializar o re-inicializar Lightgallery.
    const initLightgallery = () => {
        // Destruye cualquier instancia existente de Lightgallery para evitar conflictos o duplicaciones.
        if (window.lgData) { 
            window.lgData.destroy();
        }
        // Inicializa Lightgallery en el contenedor de la galería, especificando qué elementos debe manejar.
        window.lgData = lightGallery(portfolioGallery, {
            selector: '.portfolio-item', 
            download: false, 
            share: false, 
            plugins: [lgThumbnail, lgZoom, lgFullscreen, lgAutoplay, lgShare], 
        });
    };

    const initialCategory = 'pintura';
    const initialItems = portfolioItems.filter(item => item.category === initialCategory);
    renderPortfolioItems(initialItems);


    // Configura los Event Listeners para los botones de filtro.
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const filterCategory = event.target.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            let filteredItems = [];
            if (filterCategory === 'all') {
                filteredItems = portfolioItems; 
            } else {
                filteredItems = portfolioItems.filter(item => item.category === filterCategory);
            }
            renderPortfolioItems(filteredItems);
        });
    });

    // Aplica el efecto de aparición a los elementos que tienen la clase 'animate-fade-in' al cargar la página.
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    animatedElements.forEach(el => {
        el.style.opacity = 1; 
    });


});
