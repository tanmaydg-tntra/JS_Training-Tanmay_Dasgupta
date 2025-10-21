let products = [] 
const cartArray = [];

const product_list = document.getElementById("product_list");
const cart_list = document.getElementById("cart_list");
const calculatedResult = document.getElementById("calculatedResult");

const fetchProducts = async ()=>{
  try{
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json();

    products = data;
    
    for (let i = 0; i < products.length; i++) {
      products[i].quantity = 0;
    }

    renderProducts();
  }
  catch(e){
    console.log(e);
  }
}

const renderProducts = ()=>{
  product_list.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const listElement = document.createElement("li");

    listElement.innerHTML = `
      <img src="${products[i].image}" alt="${products[i].title}" class="product-image">
      <p><strong>Name:</strong> ${products[i].title}</p>
      <p><strong>Price:</strong> $${products[i].price.toFixed(2)}</p>
      <button>Add to cart</button>
    `;

    const btn = listElement.querySelector("button");
    btn.addEventListener("click", () => {
      moveToCart(products[i].id);

      btn.classList.add("button-clicked");
      setTimeout(() => {
        btn.classList.remove("button-clicked");
      }, 500);
    });

    product_list.appendChild(listElement);
  }
}

const moveToCart = (num) => {
  let currentProduct;

  for (let j = 0; j < products.length; j++) {
    if (products[j].id == num) {
      currentProduct = products[j];
      break;
    }
  }

  let flag = false;

  for (let i = 0; i < cartArray.length; i++) {
    if (currentProduct.id == cartArray[i].id) {
      cartArray[i].quantity++;
      flag = true;
      break;
    }
  }
  if (flag === false) {
    currentProduct.quantity = 1;
    cartArray.push(currentProduct);
  }
  renderCart();
};

const renderCart = () => {
  cart_list.innerHTML = ""; 

  for (let i = 0; i < cartArray.length; i++) {
    const cartElement = document.createElement("li");

    cartElement.innerHTML = `
      <img src="${cartArray[i].image}" alt="${cartArray[i].title}" class="product-image">
      <p><strong>Name:</strong> ${cartArray[i].title}</p>
      <p><strong>Price:</strong> $${cartArray[i].price.toFixed(2)}</p>
      <p><strong>Quantity:</strong> ${cartArray[i].quantity}</p>
    `;

    cart_list.appendChild(cartElement);
  }
  const result = calculateDiscount();
  printResult(result);
};

const calculateDiscount = () => {
  let total = 0;
  let discount1 = 0;
  let discount2 = 0;
  let grandtotal = 0;
  let totalQuantity = 0;

  for (let i = 0; i < cartArray.length; i++) {
    totalQuantity = totalQuantity + cartArray[i].quantity;
    total = total + (cartArray[i].quantity * cartArray[i].price);
  }

  if (totalQuantity > 10) {
    discount1 = 0.1 * total;
  }

  let totalAfterDiscount1 = total - discount1;

  if (total > 500) {
    discount2 = 0.05 * totalAfterDiscount1;
  }

  grandtotal = total - discount1 - discount2;

  return { total, discount1, discount2, grandtotal };
};

const printResult = ({ total, discount1, discount2, grandtotal }) => {
  const resultElement = document.createElement("li");

  calculatedResult.innerHTML = "";

  resultElement.innerHTML = `
    <p><strong>Total Amount:</strong> $${total.toFixed(2)}</p>
    <p><strong>10% Quantity Discount</strong> $${discount1.toFixed(2)}</p>
    <p><strong>5% Bulk Discount </strong> $${discount2.toFixed(2)}</p>
    <p><strong>Grand Total:</strong> $${grandtotal.toFixed(2)}</p>
  `;

  calculatedResult.appendChild(resultElement);
};

fetchProducts();
