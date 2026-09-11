document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) toggle.addEventListener("click", () => nav.classList.toggle("open"));

  const orderInputs = document.querySelectorAll("#orderForm input[type=number]");
  const totalEl = document.querySelector("#orderTotal");
  function updateTotal() {
    let total = 0;
    orderInputs.forEach(i => total += (Number(i.value) || 0) * Number(i.dataset.price || 0));
    if (totalEl) totalEl.textContent = "R" + total.toLocaleString("en-ZA");
  }
  orderInputs.forEach(i => i.addEventListener("input", updateTotal));
  updateTotal();

  const orderForm = document.querySelector("#orderForm");
  if (orderForm) orderForm.addEventListener("submit", e => {
    e.preventDefault();
    const selected = [...orderInputs]
      .filter(i => Number(i.value) > 0)
      .map(i => `${i.dataset.name} x${i.value}`)
      .join(", ");
    const msg = document.querySelector("#orderMessage");
    if (!selected) {
      msg.textContent = "Please select at least one item.";
      return;
    }
    msg.textContent = "Pickup order received! Please pay at the restaurant when you collect your order. (Demo website — connect this form to your backend/email service for live orders.)";
    msg.style.color = "#2b7a3d";
  });

  const reservationForm = document.querySelector("#reservationForm");
  if (reservationForm) reservationForm.addEventListener("submit", e => {
    e.preventDefault();
    const msg = document.querySelector("#reservationMessage");
    msg.textContent = "Reservation request received! (Demo website — connect this form to your backend/email service for live reservations.)";
    msg.style.color = "#2b7a3d";
  });

  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split("T")[0];
  dateInputs.forEach(input => input.min = today);
});