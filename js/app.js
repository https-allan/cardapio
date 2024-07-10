const cartItemsContainer = document.getElementById("cart-items");
const shoppingCartModal = document.getElementById("shopping-cart-modal");
const closeModalButton = document.getElementById("close-modal-btn");
const checkoutButton = document.getElementById("checkout-btn");
const addressWarning = document.getElementById("address-warn");
const addressInput = document.getElementById("address");
const cartCounter = document.getElementById("cart-count");
const cartButton = document.getElementById("cart-btn");
const cartTotal = document.getElementById("cart-total");
const menu = document.getElementById("menu");

let cart = [];

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

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }

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

  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2)
    .replace(".", ",");

  cartCounter.innerHTML = cart.length;
  cartTotal.textContent = `Total: R$ ${parseFloat(total).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  )}`;

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

function getDataEntry() {
  addressInput.addEventListener("input", (e) => {
    let inputValue = e.target.value;

    if (inputValue !== "") {
      addressInput.classList.remove("border-red-500");
      addressWarning.classList.add("hidden");
    }
  });

  checkoutButton.addEventListener("click", (e) => {
    const isOpen = checkIfSnackBarIsOpen();

    if (!isOpen) {
      Toastify({
        text: "Desculpe, a lanchonete está fechada no momento.",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#ef4444",
        },
      }).showToast();
      return;
    }

    if (cart.length == 0) return;
    if (addressInput.value === "") {
      addressWarning.classList.remove("hidden");
      addressInput.classList.add("border-red-500");
      return;
    }

    const total = cart
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2)
      .replace(".", ",");

    const cartItems = cart
      .map((item) => {
        return `\n*${item.name}*\nQuantidade: ${
          item.quantity
        }\nPreço: R$ ${item.price.toFixed(2).replace(".", ",")}\n`;
      })
      .join("");

    const message = `${cartItems}\n\n*Endereço:* ${addressInput.value}\n*Total: R$ ${total}*\n`;
    const encodedMessage = encodeURIComponent(message);
    const phone = "65996071844";

    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");

    addressInput.value = "";
    cart = [];
    updateCartDisplay();
  });
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

initializeToggleShoppingCart();
updateCartItemCount();
removeItemCart();
getDataEntry();
