document.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) { // Asegúrate de que el botón exista en la página actual
        // Función para mostrar/ocultar el botón
        const toggleScrollTopBtn = () => {
            // Muestra el botón si el scroll vertical es mayor a 300px
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        };

        // Añade el evento de scroll a la ventana
        window.addEventListener('scroll', toggleScrollTopBtn);

        // Añade el evento de click al botón para volver arriba
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita el comportamiento por defecto del enlace (saltar bruscamente)
            window.scrollTo({
                top: 0, // Vuelve al inicio de la página
                behavior: 'smooth' // Hace el scroll de forma suave
            });
        });

        // Ejecuta la función una vez al cargar para verificar la posición inicial del scroll
        toggleScrollTopBtn();
    }
});