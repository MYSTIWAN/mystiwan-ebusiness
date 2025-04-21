
const mtnData = {
  "1GB": 6, "2GB": 12, "3GB": 18, "4GB": 24, "5GB": 28,
  "6GB": 35, "7GB": 38, "8GB": 42, "9GB": 46, "10GB": 50,
  "15GB": 74, "20GB": 92, "25GB": 115, "30GB": 135,
  "40GB": 185, "50GB": 215, "60GB": 242, "70GB": 280,
  "80GB": 310, "92GB": 355, "100GB": 390
};

const airteltigoData = {
  "1GB": 5, "2GB": 10, "3GB": 15, "4GB": 20, "5GB": 25,
  "6GB": 29, "7GB": 33, "8GB": 37, "10GB": 45,
  "15GB": 65, "20GB": 84, "25GB": 105, "30GB": 120,
  "40GB": 133, "50GB": 150, "60GB": 152, "90GB": 190, "100GB": 210
};

const telecelData = {
  "5GB": 27, "10GB": 48, "15GB": 67, "20GB": 85,
  "25GB": 109, "30GB": 125, "35GB": 140, "40GB": 160,
  "45GB": 180, "50GB": 200
};

let cart = [];
let selectedItem = null;

function populateList(data, listId, provider) {
  const list = document.getElementById(listId);
  for (const [size, price] of Object.entries(data)) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${provider} ${size}</span>
      <span>GHC${price}</span>
      <button onclick="selectItem('${provider}', '${size}', ${price})">Buy</button>`;
    list.appendChild(li);
  }
}

populateList(mtnData, 'mtn-list', 'MTN');
populateList(airteltigoData, 'airteltigo-list', 'AirtelTigo');
populateList(telecelData, 'telecel-list', 'Telecel');

function selectItem(provider, size, price) {
  const username = document.getElementById('username').value.trim();
  if (!username) {
    alert("Please enter your username before selecting a package.");
    return;
  }
  selectedItem = { provider, size, price, username };
  document.getElementById('popup-message').textContent = 
    `Add ${provider} ${size} (GHC${price}) to cart for user "${username}"?`;
  document.getElementById('popup').style.display = 'block';
}

document.getElementById('confirm-btn').onclick = () => {
  cart.push(selectedItem);
  updateCart();
  closePopup();
};

document.getElementById('cancel-btn').onclick = closePopup;

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  const totalEl = document.getElementById('total-price');
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.provider} ${item.size} - GHC${item.price} for ${item.username}`;
    cartList.appendChild(li);
    total += item.price;
  });

  totalEl.textContent = total;
}

document.getElementById('confirm-order-btn')?.addEventListener('click', () => {
  const phone = document.getElementById('phone').value.trim();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  const cartWithPhone = cart.map(item => ({ ...item, phone }));
  localStorage.setItem('orderData', JSON.stringify(cartWithPhone));
  window.location.href = 'confirm.html';
});
