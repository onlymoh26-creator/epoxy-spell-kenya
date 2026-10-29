const WHATSAPP_NUMBER = "254734055529";

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceSelect = document.getElementById("project-service");
    if (serviceSelect) {
      const wanted = link.dataset.service.toLowerCase();
      const option = [...serviceSelect.options].find((item) =>
        item.text.toLowerCase().includes(wanted) ||
        wanted.includes(item.text.toLowerCase())
      );
      if (option) serviceSelect.value = option.value;
    }
  });
});

const quoteForm = document.getElementById("quote-form");
if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!quoteForm.reportValidity()) return;

    const formData = new FormData(quoteForm);
    const name = String(formData.get("name") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const area = String(formData.get("area") || "").trim();
    const finish = String(formData.get("finish") || "").trim();
    const details = String(formData.get("details") || "").trim();

    const message = [
      "Hello Epoxy Spell Kenya, I would like a quotation.",
      "",
      `Name: ${name}`,
      `Project location: ${location}`,
      `Service required: ${service}`,
      `Approximate floor area: ${area || "Not specified"}`,
      `Preferred finish: ${finish || "Not sure yet"}`,
      `Additional details: ${details || "None provided"}`,
      "",
      "Please advise on the next steps. Thank you."
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const feedback = document.getElementById("form-feedback");
    if (feedback) feedback.textContent = "Opening WhatsApp with your enquiry. Review the message and press Send to submit it.";
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.dataset.image;
    if (!image || !lightbox || !lightboxImage) return;
    lightboxImage.src = image;
    lightbox.showModal();
  });
});

if (lightboxClose && lightbox) {
  lightboxClose.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
