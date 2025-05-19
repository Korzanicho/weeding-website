// how many days are left until the 08.06.2025
function daysUntil(date) {
  const now = new Date();
  const futureDate = new Date(date);
  const diff = futureDate.getTime() - now.getTime();
  return String(Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function putDaysToElement() {
  document.getElementById("header__counter").innerText = daysUntil("2025-06-08");
}

putDaysToElement();
