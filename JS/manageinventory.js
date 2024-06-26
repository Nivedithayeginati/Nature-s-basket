document.addEventListener('DOMContentLoaded', () => {
    const inventoryData = {
        fruits: [
            { name: 'Apple', price: 4.99, unit: 'lb', image: 'Images/apple.jpg' },
            { name: 'Pomegranate', price: 10.99, unit: 'lb', image: 'Images/pomegranate.jpg' },
            { name: 'Banana', price: 1.99, unit: 'lb', image: 'Images/banana.jpg' },
            { name: 'Blueberry', price: 9.99, unit: 'lb', image: 'Images/blueberry.jpg' },
            { name: 'Strawberry', price: 7.99, unit: 'lb', image: 'Images/strawberry.jpg' },
            { name: 'Kiwi', price: 11.99, unit: 'lb', image: 'Images/kiwi.jpg' },
            { name: 'Watermelon', price: 5.99, unit: 'lb', image: 'Images/watermelon.jpg' },
            { name: 'Orange', price: 4.99, unit: 'lb', image: 'Images/orange.jpg' },
            { name: 'Grapes', price: 6.99, unit: 'lb', image: 'Images/grapes.jpg' }
        ],
        vegetables: [
            { name: 'Peas', price: 1.00, unit: 'lb', image: 'Images/peas.jpg' },
            { name: 'Potato', price: 3.00, unit: 'lb', image: 'Images/potato.jpg' },
            { name: 'Cabbage', price: 6.00, unit: 'lb', image: 'Images/cabbage.jpg' },
            { name: 'Onion', price: 4.00, unit: 'lb', image: 'Images/onion.jpg' },
            { name: 'Capsicum', price: 2.00, unit: 'lb', image: 'Images/capsicum.jpg' },
            { name: 'Cauliflower', price: 5.00, unit: 'lb', image: 'Images/cauliflower.jpg' },
            { name: 'Beetroot', price: 4.00, unit: 'lb', image: 'Images/beetroot.jpg' },
            { name: 'Spinach', price: 9.00, unit: 'lb', image: 'Images/spinach.jpg' },
            { name: 'Tomato', price: 9.00, unit: 'lb', image: 'Images/tomato.jpg' }
        ],
        bakedGoods: [
            { name: 'Sourdough Bread', price: 5.00, unit: 'loaf', image: 'Images/sourdough.jpg' },
            { name: 'Chocolate Chip Cookies', price: 3.00, unit: 'dozen', image: 'Images/cookies.jpg' },
            { name: 'Blueberry Muffins', price: 4.00, unit: 'pack', image: 'Images/muffins.jpg' },
            { name: 'Croissants', price: 7.00, unit: 'dozen', image: 'Images/croissants.jpg' },
            { name: 'Banana Bread', price: 6.00, unit: 'loaf', image: 'Images/bananabread.jpg' },
            { name: 'Apple Pie', price: 8.00, unit: 'pie', image: 'Images/applepie.jpg' },
            { name: 'Brownies', price: 5.00, unit: 'dozen', image: 'Images/brownies.jpg' },
            { name: 'Cinnamon Rolls', price: 9.00, unit: 'dozen', image: 'Images/cinnamonrolls.jpg' },
            { name: 'Bagels', price: 4.00, unit: 'dozen', image: 'Images/bagels.jpg' }
        ],
        milkAndMeat: [
            { name: 'Whole Milk', price: 3.00, unit: 'gallon', image: 'Images/milk.jpg' },
            { name: 'Cheddar Cheese', price: 5.00, unit: 'lb', image: 'Images/cheese.jpg' },
            { name: 'Yogurt', price: 2.00, unit: 'pack', image: 'Images/yogurt.jpg' },
            { name: 'Butter', price: 4.00, unit: 'lb', image: 'Images/butter.jpg' },
            { name: 'Eggs', price: 3.00, unit: 'dozen', image: 'Images/eggs.jpg' },
            { name: 'Chicken Breast', price: 6.00, unit: 'lb', image: 'Images/chicken.jpg' },
            { name: 'Ground Beef', price: 7.00, unit: 'lb', image: 'Images/beef.jpg' },
            { name: 'Pork Chops', price: 8.00, unit: 'lb', image: 'Images/pork.jpg' },
            { name: 'Salmon Fillet', price: 12.00, unit: 'lb', image: 'Images/salmon.jpg' }
        ]
    };

    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    function showCategory(category) {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        inventoryData[category].forEach(item => {
            const div = document.createElement('div');
            div.className = 'product-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}"> <!-- Added product image -->
                <div class="product-details">
                    <span class="product-name">${item.name}</span> <!-- Product name in bold -->
                    <span class="product-price">$${item.price.toFixed(2)} / ${item.unit}</span> <!-- Product price with unit -->
                    <button class="product-quantity">
                        <select id="quantity-${item.name}">
                            ${[...Array(10).keys()].map(i => `<option value="${i + 1}">${i + 1}</option>`).join('')}
                        </select>
                    </button>
                    <button onclick="addToCart('${item.name}', ${item.price}, document.getElementById('quantity-${item.name}').value)">Add to Cart</button>
                </div>
            `;
            productList.appendChild(div);
        });

        document.querySelectorAll('.categories button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelector(`button[onclick="showCategory('${category}')"]`).classList.add('active');
    }

    function getCartItemQuantity(name) {
        const item = cart.find(item => item.name === name);
        return item ? item.quantity : 0;
    }

    window.addToCart = (name, price, quantity) => {
        quantity = parseInt(quantity); 
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, quantity });
        }
        totalPrice += price * quantity;
        updateCart();
    };

    function updateCart() {
        const cartList = document.getElementById('cartList');
        cartList.innerHTML = '';

        cart.forEach(item => {
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</span>
                <div class="cart-item-actions">
                    <button onclick="removeFromCart('${item.name}')">Remove</button>
                    <button onclick="increaseQuantity('${item.name}')">+</button>
                    <button onclick="decreaseQuantity('${item.name}')">-</button>
                </div>
            `;
            cartList.appendChild(li);
        });

        document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }

    window.removeFromCart = (name) => {
        const itemIndex = cart.findIndex(item => item.name === name);
        if (itemIndex !== -1) {
            totalPrice -= cart[itemIndex].price * cart[itemIndex].quantity;
            cart.splice(itemIndex, 1);
            updateCart();
        }
    };

    window.increaseQuantity = (name) => {
        const item = cart.find(item => item.name === name);
        if (item) {
            item.quantity++;
            totalPrice += item.price;
            updateCart();
        }
    };

    window.decreaseQuantity = (name) => {
        const item = cart.find(item => item.name === name);
        if (item && item.quantity > 1) {
            item.quantity--;
            totalPrice -= item.price;
            updateCart();
        }
    };

    showCategory('fruits');

    document.getElementById('checkoutButton').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Add an item to the cart before checkout');
        } else {
            window.location.href = 'customerdetails.html';
        }
    });

    updateCart();
});

function showCategory(category) {
    const inventoryData = {
        fruits: [
            { name: 'Apple', price: 4.99, unit: 'lb', image: 'Images/apple.jpg' },
            { name: 'Pomegranate', price: 10.99, unit: 'lb', image: 'Images/pomegranate.jpg' },
            { name: 'Banana', price: 1.99, unit: 'lb', image: 'Images/banana.jpg' },
            { name: 'Blueberry', price: 9.99, unit: 'lb', image: 'Images/blueberry.jpg' },
            { name: 'Strawberry', price: 7.99, unit: 'lb', image: 'Images/strawberry.jpg' },
            { name: 'Kiwi', price: 11.99, unit: 'lb', image: 'Images/kiwi.jpg' },
            { name: 'Watermelon', price: 5.99, unit: 'lb', image: 'Images/watermelon.jpg' },
            { name: 'Orange', price: 4.99, unit: 'lb', image: 'Images/orange.jpg' },
            { name: 'Grapes', price: 6.99, unit: 'lb', image: 'Images/grapes.jpg' }
        ],
        vegetables: [
            { name: 'Peas', price: 1.00, unit: 'lb', image: 'Images/peas.jpg' },
            { name: 'Potato', price: 3.00, unit: 'lb', image: 'Images/potato.jpg' },
            { name: 'Cabbage', price: 6.00, unit: 'lb', image: 'Images/cabbage.jpg' },
            { name: 'Onion', price: 4.00, unit: 'lb', image: 'Images/onion.jpg' },
            { name: 'Capsicum', price: 2.00, unit: 'lb', image: 'Images/capsicum.jpg' },
            { name: 'Cauliflower', price: 5.00, unit: 'lb', image: 'Images/cauliflower.jpg' },
            { name: 'Beetroot', price: 4.00, unit: 'lb', image: 'Images/beetroot.jpg' },
            { name: 'Spinach', price: 9.00, unit: 'lb', image: 'Images/spinach.jpg' },
            { name: 'Tomato', price: 9.00, unit: 'lb', image: 'Images/tomato.jpg' }
        ],
        bakedGoods: [
            { name: 'Sourdough Bread', price: 5.00, unit: 'loaf', image: 'Images/sourdough.jpg' },
            { name: 'Chocolate Chip Cookies', price: 3.00, unit: 'dozen', image: 'Images/cookies.jpg' },
            { name: 'Blueberry Muffins', price: 4.00, unit: 'pack', image: 'Images/muffins.jpg' },
            { name: 'Croissants', price: 7.00, unit: 'dozen', image: 'Images/croissants.jpg' },
            { name: 'Banana Bread', price: 6.00, unit: 'loaf', image: 'Images/bananabread.jpg' },
            { name: 'Apple Pie', price: 8.00, unit: 'pie', image: 'Images/applepie.jpg' },
            { name: 'Brownies', price: 5.00, unit: 'dozen', image: 'Images/brownies.jpg' },
            { name: 'Cinnamon Rolls', price: 9.00, unit: 'dozen', image: 'Images/cinnamonrolls.jpg' },
            { name: 'Bagels', price: 4.00, unit: 'dozen', image: 'Images/bagels.jpg' }
        ],
        milkAndMeat: [
            { name: 'Whole Milk', price: 3.00, unit: 'gallon', image: 'Images/milk.jpg' },
            { name: 'Cheddar Cheese', price: 5.00, unit: 'lb', image: 'Images/cheese.jpg' },
            { name: 'Yogurt', price: 2.00, unit: 'pack', image: 'Images/yogurt.jpg' },
            { name: 'Butter', price: 4.00, unit: 'lb', image: 'Images/butter.jpg' },
            { name: 'Eggs', price: 3.00, unit: 'dozen', image: 'Images/eggs.jpg' },
            { name: 'Chicken Breast', price: 6.00, unit: 'lb', image: 'Images/chicken.jpg' },
            { name: 'Ground Beef', price: 7.00, unit: 'lb', image: 'Images/beef.jpg' },
            { name: 'Pork Chops', price: 8.00, unit: 'lb', image: 'Images/pork.jpg' },
            { name: 'Salmon Fillet', price: 12.00, unit: 'lb', image: 'Images/salmon.jpg' }
        ]
    };

    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    inventoryData[category].forEach(item => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}"> <!-- Added product image -->
                <div class="product-details">
                    <span class="product-name">${item.name}</span> <!-- Product name in bold -->
                    <span class="product-price">$${item.price.toFixed(2)} / ${item.unit}</span> <!-- Product price with unit -->
                    <button class="product-quantity">
                        <select id="quantity-${item.name}">
                            ${[...Array(10).keys()].map(i => `<option value="${i + 1}">${i + 1}</option>`).join('')}
                        </select>
                    </button>
                    <button onclick="addToCart('${item.name}', ${item.price}, document.getElementById('quantity-${item.name}').value)">Add to Cart</button>
                </div>
        `;
        productList.appendChild(div);
    });

    document.querySelectorAll('.categories button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`button[onclick="showCategory('${category}')"]`).classList.add('active');
}
