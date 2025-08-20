// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];
const savedShoppingCart = JSON.parse(sessionStorage.getItem("Cart")) || [];
const shoppingCart = [...savedShoppingCart];

const productList = document.getElementById("product-list");
const productCart = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn");

// DOM elements
productList.addEventListener("click", (event) => {
  const element = event.target;
  if (element.tagName === "BUTTON") {
    const listItem = element.closest("li");
    const index = listItem.dataset.id;
   addToCart(index);
  }
});
// Render product list
function createButton() {
  const addToCardBtn = document.createElement("button");
  addToCardBtn.textContent = "Add to Cart";
  addToCardBtn.classList.add("add-to-cart-btn");
  return addToCardBtn;
}
function createListItems(renderWhat = products, addButton = true) {
  if (renderWhat) {
    const temp = renderWhat.map((item) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-id", item.id);
      listItem.textContent = `${item.name} - $${item.price}`;
      listItem.classList.add(`${addButton ? "listItems" : "shoppingItems"}`);
      if (addButton) listItem.appendChild(createButton());
      return listItem;
    });
    return temp;
  }
}
function renderCart() {
  productCart.innerHTML = "";
  const itemMarkup = createListItems(shoppingCart, false);
  itemMarkup.forEach((item) => {
    productCart.appendChild(item);
  });
}
function renderProducts() {
  const itemMarkup = createListItems();
  itemMarkup.forEach((item) => {
    productList.appendChild(item);
  });
}

// Add item to cart
function addToCart(productId) {
	 shoppingCart.push(products[productId - 1]);
    sessionStorage.setItem("Cart", JSON.stringify(shoppingCart));
    renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
	
}

// Clear cart
function clearCart() {
shoppingCart.splice(0, shoppingCart.length);
  sessionStorage.clear();
  renderCart();
}
clearBtn.addEventListener("click", () => {
  clearCart();
});

// Initial render
renderProducts();
renderCart();
