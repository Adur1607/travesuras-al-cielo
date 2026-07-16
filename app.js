document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. EFECTO SCROLL EN CABECERA
    // =========================================
    const header = document.getElementById("main-header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // =========================================
    // 2. MENÚ MÓVIL (Hamburguesa)
    // =========================================
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        // Animación simple del menú hamburguesa
        menuToggle.classList.toggle("open");
    });

    // Cerrar el menú al dar clic en enlaces móviles
    const navLinksList = document.querySelectorAll("#nav-links a");
    navLinksList.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });


    // =========================================
    // 3. COMPROBACIÓN DE COBERTURA (Historia 7)
    // =========================================
    const checkBtn = document.getElementById("check-btn");
    const districtSelect = document.getElementById("district-select");
    const resultDiv = document.getElementById("cobertura-result");

    checkBtn.addEventListener("click", () => {
        const selectedValue = districtSelect.value;
        const districtName = districtSelect.options[districtSelect.selectedIndex].text;

        if (!selectedValue) {
            resultDiv.style.color = "#C62828";
            resultDiv.textContent = "Por favor, selecciona un distrito.";
            return;
        }

        if (selectedValue === "cobertura-completa") {
            resultDiv.style.color = "var(--success-green)";
            resultDiv.innerHTML = `✓ ¡Excelente! Tenemos cobertura completa e inmediata en <strong>${districtName}</strong>. Traslado gratuito incluido en el paquete individual.`;
        } else {
            resultDiv.style.color = "#856404";
            resultDiv.innerHTML = `➔ En <strong>${districtName}</strong> atendemos de forma programada o especial. Por favor, contáctanos directamente para coordinar el tiempo de llegada.`;
        }
    });


    // =========================================
    // 4. SISTEMA DE SEGUIMIENTO / RASTREADOR (Historia 4)
    // =========================================
    const trackerBtn = document.getElementById("tracker-btn");
    const trackerInput = document.getElementById("tracker-input");
    const trackerDisplay = document.getElementById("tracker-display");

    trackerBtn.addEventListener("click", () => {
        const code = trackerInput.value.trim().toUpperCase();

        if (code === "") {
            alert("Por favor ingresa un código.");
            return;
        }

        // Simulación interactiva basada en el código de ejemplo
        if (code === "TRAV-2026") {
            trackerDisplay.innerHTML = `
                <div class="tracker-header-info">
                    <span>Mascota: <strong>"Peluchín"</strong></span>
                    <span>Código: <strong>TRAV-2026</strong></span>
                </div>
                <div class="tracker-steps">
                    <div class="t-step completed">
                        <div class="circle">✓</div>
                        <span>Recojo</span>
                    </div>
                    <div class="t-step completed">
                        <div class="circle">✓</div>
                        <span>Custodia</span>
                    </div>
                    <div class="t-step active">
                        <div class="circle">🔥</div>
                        <span>Cremación</span>
                    </div>
                    <div class="t-step">
                        <div class="circle">⏳</div>
                        <span>Urna Lista</span>
                    </div>
                    <div class="t-step">
                        <div class="circle">🚗</div>
                        <span>Retorno</span>
                    </div>
                </div>
                <p class="tracker-status-text"><strong>Estado actual:</strong> Tu mascota se encuentra en el proceso de cremación individual bajo el protocolo respetuoso. Estimamos concluir esta fase a las 12:30 PM.</p>
            `;
        } else {
            // Generador aleatorio realista para cualquier otro código ingresado
            trackerDisplay.innerHTML = `
                <div class="tracker-header-info">
                    <span>Mascota: <strong>"Fiel Amigo"</strong></span>
                    <span>Código: <strong>${code}</strong></span>
                </div>
                <div class="tracker-steps">
                    <div class="t-step completed">
                        <div class="circle">✓</div>
                        <span>Recojo</span>
                    </div>
                    <div class="t-step active">
                        <div class="circle">🛡️</div>
                        <span>Custodia</span>
                    </div>
                    <div class="t-step">
                        <div class="circle">🔥</div>
                        <span>Cremación</span>
                    </div>
                    <div class="t-step">
                        <div class="circle">⏳</div>
                        <span>Urna Lista</span>
                    </div>
                    <div class="t-step">
                        <div class="circle">🚗</div>
                        <span>Retorno</span>
                    </div>
                </div>
                <p class="tracker-status-text"><strong>Estado actual:</strong> Hemos recibido a tu mascota en nuestras salas de resguardo climatizadas. El proceso de preparación ha iniciado de manera respetuosa.</p>
            `;
        }
    });


    // =========================================
    // 5. ENVÍO FORMULARIO DE RECOJO (Historia 3)
    // =========================================
    const pickupForm = document.getElementById("pickup-form");

    pickupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("form-name").value;
        const phone = document.getElementById("form-phone").value;
        const service = document.getElementById("form-service").value;
        const msg = document.getElementById("form-msg").value;

        // Feedback de éxito (Emulación de guardado y aviso inmediato)
        alert(`Gracias ${name}. Tu solicitud de recojo para el servicio "${service}" ha sido recibida con máxima prioridad. Un asesor conector de urgencias se comunicará al ${phone} en menos de 5 minutos.`);
        
        pickupForm.reset();
    });
});