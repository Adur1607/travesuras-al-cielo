document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // Helpers de feedback (P3: consistente)
    // =========================================
    function setFeedback(el, message, type) {
        if (!el) return;
        el.textContent = "";
        el.className = "feedback-msg";
        if (!message) return;
        el.classList.add(`feedback-${type}`);
        el.innerHTML = message;
    }

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
    // 2. MENÚ MÓVIL (H6 / P1)
    // =========================================
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        menuToggle.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    const navLinksList = document.querySelectorAll("#nav-links a");
    navLinksList.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menú");
        });
    });

    // =========================================
    // 3. PREFILL DESDE PAQUETES (P4 / H1)
    // =========================================
    const formService = document.getElementById("form-service");
    const formFeedback = document.getElementById("form-feedback");

    document.querySelectorAll(".js-select-service").forEach(btn => {
        btn.addEventListener("click", () => {
            const service = btn.getAttribute("data-service");
            if (formService && service) {
                formService.value = service;
                setFeedback(
                    formFeedback,
                    `Has preseleccionado <strong>${service}</strong>. Completa distrito, dirección y horario para programar el recojo.`,
                    "info"
                );
            }
        });
    });

    // =========================================
    // 4. COBERTURA (H7 / P4 / P7)
    // =========================================
    const checkBtn = document.getElementById("check-btn");
    const districtSelect = document.getElementById("district-select");
    const coberturaResult = document.getElementById("cobertura-result");
    const formDistrict = document.getElementById("form-district");

    checkBtn.addEventListener("click", () => {
        const selectedValue = districtSelect.value;
        const districtName = districtSelect.options[districtSelect.selectedIndex].text;

        if (!selectedValue) {
            setFeedback(coberturaResult, "Selecciona un distrito para verificar la cobertura.", "error");
            return;
        }

        if (selectedValue === "cobertura-completa") {
            setFeedback(
                coberturaResult,
                `✓ Tenemos cobertura completa e inmediata en <strong>${districtName}</strong>. Traslado incluido en los paquetes. Puedes <a href="#contacto">programar el recojo</a> ahora.`,
                "success"
            );
            if (formDistrict) {
                const match = Array.from(formDistrict.options).find(opt => opt.value === districtName);
                if (match) formDistrict.value = districtName;
            }
        } else {
            setFeedback(
                coberturaResult,
                `➔ En <strong>${districtName}</strong> atendemos de forma programada o especial. <a href="#contacto">Contáctanos</a> para confirmar tiempo de llegada y viabilidad.`,
                "warn"
            );
            if (formDistrict) formDistrict.value = "Otro";
        }
    });

    // =========================================
    // 5. RASTREADOR + NOTIFICACIONES (H4 / P4 / P7)
    // =========================================
    const trackerBtn = document.getElementById("tracker-btn");
    const trackerClear = document.getElementById("tracker-clear");
    const trackerInput = document.getElementById("tracker-input");
    const trackerDisplay = document.getElementById("tracker-display");
    const trackerFeedback = document.getElementById("tracker-feedback");
    const trackerPet = document.getElementById("tracker-pet");
    const trackerCode = document.getElementById("tracker-code");
    const trackerSteps = document.getElementById("tracker-steps");
    const trackerStatusText = document.getElementById("tracker-status-text");

    const STEPS = [
        { key: "recojo", label: "Recojo", icon: "1" },
        { key: "custodia", label: "Custodia", icon: "2" },
        { key: "cremacion", label: "Cremación", icon: "3" },
        { key: "urna", label: "Urna lista", icon: "4" },
        { key: "retorno", label: "Retorno", icon: "5" }
    ];

    function renderTracker(petName, code, activeIndex, statusHtml) {
        trackerPet.textContent = petName;
        trackerCode.textContent = code;
        trackerSteps.innerHTML = STEPS.map((step, i) => {
            let state = "";
            let circle = step.icon;
            if (i < activeIndex) {
                state = "completed";
                circle = "✓";
            } else if (i === activeIndex) {
                state = "active";
            }
            return `<div class="t-step ${state}"><div class="circle">${circle}</div><span>${step.label}</span></div>`;
        }).join("");
        trackerStatusText.innerHTML = statusHtml;
        trackerDisplay.hidden = false;
    }

    function clearTracker() {
        trackerInput.value = "";
        trackerDisplay.hidden = true;
        setFeedback(trackerFeedback, "", "");
        trackerInput.focus();
    }

    trackerBtn.addEventListener("click", () => {
        const code = trackerInput.value.trim().toUpperCase();

        if (!code) {
            setFeedback(trackerFeedback, "Ingresa tu código de seguimiento (ej. TRAV-2026).", "error");
            trackerDisplay.hidden = true;
            return;
        }

        if (!/^TRAV-[\w-]+$/i.test(code) && code !== "TRAV-2026") {
            setFeedback(
                trackerFeedback,
                "El formato esperado es <strong>TRAV-XXXX</strong>. Si no tienes código, tu asesor te lo envía al confirmar el recojo.",
                "warn"
            );
        } else {
            setFeedback(trackerFeedback, "Estado actualizado. También recibirás este avance por WhatsApp.", "success");
        }

        if (code === "TRAV-2026") {
            renderTracker(
                "Peluchín",
                code,
                2,
                "<strong>Estado actual:</strong> Tu mascota está en cremación individual bajo protocolo respetuoso. Estimamos concluir esta fase a las 12:30 PM. Te avisaremos por WhatsApp al pasar a “Urna lista”."
            );
        } else {
            renderTracker(
                "Fiel Amigo",
                code,
                1,
                "<strong>Estado actual:</strong> Hemos recibido a tu mascota en salas de resguardo. La preparación respetuosa ha iniciado. Te notificaremos al comenzar la cremación."
            );
        }
    });

    trackerClear.addEventListener("click", clearTracker);

    trackerInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            trackerBtn.click();
        }
    });

    // =========================================
    // 6. FORMULARIO DE RECOJO (H3 / H8 / P2 / P5)
    // =========================================
    const pickupForm = document.getElementById("pickup-form");

    pickupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("form-name").value.trim();
        const phone = document.getElementById("form-phone").value.trim();
        const district = document.getElementById("form-district").value;
        const address = document.getElementById("form-address").value.trim();
        const slot = document.getElementById("form-slot").value;
        const service = document.getElementById("form-service").value;
        const channel = (document.querySelector('input[name="contact-channel"]:checked') || {}).value || "WhatsApp";
        const notify = document.getElementById("form-notify").checked;

        if (!name || !phone || !district || !address || !slot || !service) {
            setFeedback(formFeedback, "Completa los campos obligatorios para programar el recojo o la consulta.", "error");
            return;
        }

        const demoCode = "TRAV-" + String(Math.floor(1000 + Math.random() * 9000));
        const notifyText = notify
            ? ` Te enviaremos notificaciones de estado por WhatsApp (código de ejemplo: <strong>${demoCode}</strong>).`
            : " No enviaremos notificaciones automáticas; podrás consultar el estado en Seguimiento cuando recibas tu código.";

        setFeedback(
            formFeedback,
            `✓ Gracias, <strong>${name}</strong>. Recibimos tu solicitud de <strong>${service}</strong> en <strong>${district}</strong> (${slot}). Un asesor te contactará por <strong>${channel}</strong> al <strong>${phone}</strong> en menos de 5 minutos.${notifyText}`,
            "success"
        );

        pickupForm.reset();
        document.querySelector('input[name="contact-channel"][value="WhatsApp"]').checked = true;
        document.getElementById("form-notify").checked = true;

        formFeedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
});
