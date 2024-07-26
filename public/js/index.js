const cartItemsContainer = document.getElementById("cart-items");
const shoppingCartModal = document.getElementById("shopping-cart-modal");
const closeModalButton = document.getElementById("close-modal-btn");
const checkoutButton = document.getElementById("checkout-btn");
const addressWarning = document.getElementById("address-warn");
const addressInput = document.getElementById("address");
const cartButton = document.getElementById("cart-btn");
const cartTotal = document.getElementById("total");
const menu = document.getElementById("menu");
const showOrders = document.getElementById("show-orders");

let cart = [];

function showToast(color, message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: `#${color}`,
    },
  }).showToast();
}

function calculateTotal(cart) {
  return cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2)
    .replace(".", ",");
}

function updateShowOrdersButton() {
  const hasItemsInCart = cart.length > 0;

  showOrders.classList.toggle("hidden", !hasItemsInCart);
  showOrders.classList.toggle("flex", hasItemsInCart);
}

function sendWhatsAppMessage(message) {
  const encodedMessage = encodeURIComponent(message);
  const phone = "65996071844";

  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
}

function createMessage(items, address, total) {
  return `${items}\n\n*Endereço:* ${address}\n*Total: R$ ${total}*\n`;
}

function formatCarItems(cart) {
  return cart
    .map((item) => {
      return `\n*${item.name}*\nQuantidade: ${
        item.quantity
      }\nPreço: R$ ${item.price.toFixed(2).replace(".", ",")}\n`;
    })
    .join("");
}

function handleCheckoutClick() {
  if (!checkIfSnackBarIsOpen()) {
    showToast("ef4444", "Desculpe, a lanchonete está fechada no momento.");
    return;
  }

  if (cart.length == 0) return;
  if (addressInput.value === "") {
    addressWarning.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  }
  const total = calculateTotal(cart);
  const cartItems = formatCarItems(cart);
  const message = createMessage(cartItems, addressInput.value, total);

  sendWhatsAppMessage(message);
  resetForm();
  updateCartDisplay();
}

function handleAddressInput(e) {
  let inputValue = e.target.value;

  if (inputValue !== "") {
    addressInput.classList.remove("border-red-500");
    addressWarning.classList.add("hidden");
  }
}

function resetForm() {
  addressInput.value = "";
  cart = [];
}

function initializeToggleShoppingCart() {
  cartButton.addEventListener("click", () => {
    updateCartDisplay();

    shoppingCartModal.classList.remove("hidden");
    shoppingCartModal.classList.add("flex");
  });

  closeModalButton.addEventListener("click", () => {
    shoppingCartModal.classList.remove("flex");
    shoppingCartModal.classList.add("hidden");
  });

  shoppingCartModal.addEventListener("click", (e) => {
    if (e.target === shoppingCartModal) {
      shoppingCartModal.classList.add("hidden");
    }
  });
}

function updateCartItemCount() {
  menu.addEventListener("click", (e) => {
    const parentButton = e.target.closest(".add-to-cart-btn");

    if (parentButton) {
      const dataName = parentButton.getAttribute("data-name");
      const dataPrice = parseFloat(parentButton.getAttribute("data-price"));

      addToCart(dataName, dataPrice);
    }
  });
}

function updateCartItemCount() {
  menu.addEventListener("click", (e) => {
    const parentButton = e.target.closest(".add-to-cart-btn");
    if (parentButton) {
      const dataName = parentButton.getAttribute("data-name");
      const dataPrice = parseFloat(parentButton.getAttribute("data-price"));

      addToCart(dataName, dataPrice);
    }
  });
}

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);
  const addCart = document.querySelector("add-to-cart-btn");

  if (existingItem) {
    showOrders.classList.remove("hidden");
    showOrders.classList.add("flex");

    existingItem.quantity++;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }

  showToast("10B981", `Adicionado ao carrinho`);
  updateCartDisplay();
}

function updateCartDisplay() {
  cartItemsContainer.innerHTML = "";
  cartItemsContainer.classList.add(
    "flex",
    "justify-between",
    "mb-4",
    "flex-col"
  );

  const total = calculateTotal(cart);
  const showTotal = document.getElementById("show-total");
  cartTotal.textContent = total;
  showTotal.textContent = `R$ ${total}`;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between">
      <div>
      <p class="font-bold">${item.name}</p>
      <p class="font-medium mt-2">(Quantidade: ${item.quantity})</p>
      <p class="font-medium mt-2">R$ ${item.price
        .toFixed(2)
        .replace(".", ",")}</p>
      </div>
      <button class="text-red-500 p-4 text-lg rounded-lg font-semibold remove-from-cart-btn" data-name="${
        item.name
      }">
          <i class="fa-solid fa-trash-can text-2xl"></i>
    </button>

    </div>
    `;
    cartItemsContainer.appendChild(cartItemElement);
  });

  updateShowOrdersButton();
}

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);
  if (index != -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity--;

      updateCartDisplay();
      return;
    }
    cart.splice(index, 1); // Remove o item do carrinho
    updateCartDisplay();
  }
}

function checkIfSnackBarIsOpen() {
  const date = new Date();
  const hours = date.getHours();

  return hours >= 18 && hours < 23;
}
const spanHoursOpen = document.getElementById("date-span");
const isOpen = checkIfSnackBarIsOpen();

if (isOpen) {
  spanHoursOpen.classList.remove("bg-red-500");
  spanHoursOpen.classList.add("bg-green-600");
} else {
  spanHoursOpen.classList.add("bg-red-500");
  spanHoursOpen.classList.remove("bg-green-600");
}

cartItemsContainer.addEventListener("click", (e) => {
  const removeBtn = e.target.closest(".remove-from-cart-btn");
  if (removeBtn) {
    const name = removeBtn.getAttribute("data-name");
    removeItemCart(name);
  }
});
addressInput.addEventListener("input", handleAddressInput);
checkoutButton.addEventListener("click", handleCheckoutClick);

initializeToggleShoppingCart();
updateCartItemCount();
removeItemCart();
