function daysUntil(date) {
  const now = new Date();
  const futureDate = new Date(date);
  const diff = futureDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function putDaysToElement() {
  let daysQuantity = daysUntil("2025-06-08");
  if (daysQuantity === 0) {
    document.getElementById("header__counter-text").innerText = "To już dzisiaj!";
    return;
  }
  const prefix = daysQuantity >= 0 ? 'Pozostało' : 'Minęło';
  if (daysQuantity < 0) daysQuantity = daysQuantity * -1;
  document.getElementById("header__counter-text").innerText = `${prefix} ${daysQuantity} dni!`;
}

putDaysToElement();
