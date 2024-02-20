class Cookies{
    static setCookie(name, value) {
        // Caduca en un año
        const expires = new Date("Thu, 16 Nov 2025 12:00:00 UTC");
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    // permite incrementar el contador de visitas
    static getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            // Eliminamos espacios en blanco
            const cookie = cookies[i].trim();
            // Si la cookie comienza con el nombre buscado
            if (cookie.indexOf(name) === 0) {
                // Devolvemos el valor de la cookie
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }
}

export default Cookies;