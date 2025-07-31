// // Importing the cart variable from cart.js

// import { cart, addToCart } from "../data/cart.js";
// import { products } from "../data/products.js";
// import { formatCurrency } from "./utils/money.js";


// // IF we create an cart variable here then we can have naming problem cuz the add to cart is using the cart varaible array to store the cart information.
// // So to resolve the issue we use modeule here 



// // const products = [{
// //   image: "images/products/athletic-cotton-socks-6-pairs.jpg",
// //   name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
// //   rating: {
// //     stars: 4.5,
// //     counts: 87
// //   },
// //   priceCents: 1090,
// // }, {
// //   image: "images/products/intermediate-composite-basketball.jpg",
// //   name: " Intermediate Size Basketball",
// //   rating: {
// //     stars: 4,
// //     counts: 127
// //   },
// //   priceCents: 2095,
// // }, {
// //   image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
// //   name: "Adults Plain Cotton T-Shirt - 2 Pack",
// //   rating: {
// //     stars: 4.5,
// //     counts: 56
// //   },
// //   priceCents: 799,
// // }];

// // Creating an varibale to save all the data about product and then display on it
// let productHTML = '';
// products.forEach((product) => {
//   productHTML += `
//     <div class="product-container">
//       <div class="product-image-container">
//         <img
//           class="product-image"
//           src="${product.image}"
//         />
//       </div>

//       <div class="product-name limit-text-to-2-lines">
//         ${product.name}
//       </div>

//       <div class="product-rating-container">
//         <img
//           class="product-rating-stars"
//           src="images/ratings/rating-${product.rating.stars * 10}.png"
//         />
//         <div class="product-rating-count link-primary">${product.rating.count}</div>
//       </div>

//       <div class="product-price">$${formatCurrency(product.priceCents)}</div>

//       <div class="product-quantity-container">
//         <select>
//           <option selected value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//           <option value="6">6</option>
//           <option value="7">7</option>
//           <option value="8">8</option>
//           <option value="9">9</option>
//           <option value="10">10</option>
//         </select>
//       </div>

//       <div class="product-spacer"></div>

//       <div class="added-to-cart">
//         <img src="images/icons/checkmark.png" />
//         Added
//       </div>

//       <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${product.id}">Add to Cart</button>
//     </div>
//   `;

//   // console.log(productHTML);  
// })

// // Selecting the HTML main element where the products code is written select the root element to display oroduct through Js
// // After selecting the root element we are updating the code with productHTML where we store & Generated through Js
// document.querySelector('.js-product-grid').innerHTML = productHTML;


// // Adding Interactive to the Add to cart button so first we select the element using class name and add interactivity using DOM
// document.querySelectorAll('.js-add-to-cart').forEach((button) => {
//   button.addEventListener('click', () => {
//     let productId = button.dataset.productId;

//     // Looping through cart to check the product is already exist if exist then just increment the quantity += 1
//     addToCart(productId);
//     updateCartQuantity();

//   });
// });

// function updateCartQuantity() {
//   let cartQuantity = 0;
//   cart.forEach((item) => {
//     cartQuantity += item.quantity;
//   })
//   // Calculated the quantity using for each , incremented and stored in the cardQuantity after that we updated through Js using DOM`
//   document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
// }





// New Code 
import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
         <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});


document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });