const products = [
  { id: 1, name: "T-Shirt", price: 499 },
  { id: 2, name: "Jeans", price: 999 },
  { id: 3, name: "Shoes", price: 1499 },
];

const cart = {};

function renderProducts() {
  const productList = document.getElementById("product-list");
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCartCount();
}

function updateCartCount() {
  const count = Object.values(cart).reduce((acc, val) => acc + val, 0);
  document.getElementById("cart-count").textContent = count;
}

function openCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;

  Object.keys(cart).forEach(id => {
    const product = products.find(p => p.id == id);
    const quantity = cart[id];
    const itemTotal = product.price * quantity;
    total += itemTotal;
    const li = document.createElement("li");
    li.textContent = `${product.name} x${quantity} - ₹${itemTotal}`;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total;
  document.getElementById("cart-modal").classList.remove("hidden");
}

function closeCart() {
  document.getElementById("cart-modal").classList.add("hidden");
}

document.getElementById("cart-button").addEventListener("click", openCart);

renderProducts();
