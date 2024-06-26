document.addEventListener('DOMContentLoaded', () => {
    const customerDetails = JSON.parse(localStorage.getItem('customerData'));
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const customerDiv = document.getElementById('customerDetails');
    const cartDiv = document.getElementById('cartDetails');

    if (customerDetails) {
        customerDiv.innerHTML += `
            <p><strong>Name:</strong> ${customerDetails.name}</p>
            <p><strong>Address:</strong> ${customerDetails.address}</p>
            <p><strong>City:</strong> ${customerDetails.city}</p>
            <p><strong>State:</strong> ${customerDetails.state}</p>
            <p><strong>ZIP Code:</strong> ${customerDetails.zip}</p>
            <p><strong>Phone Number:</strong> ${customerDetails.phone}</p>
        `;
    }

    function updateCart() {
        cartDiv.innerHTML = '<h2>Cart Details</h2>';
        let table = `
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        cartItems.forEach((item, index) => {
            table += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                        <button class="small-button" onclick="removeFromCart(${index})">Remove</button>
                        <button class="small-button" onclick="increaseQuantity(${index})">+</button>
                        <button class="small-button" onclick="decreaseQuantity(${index})">-</button>
                    </td>
                </tr>
            `;
        });

        table += `
                </tbody>
            </table>
            <strong>Total: $${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</strong>
        `;

        cartDiv.innerHTML += table;
    }

    window.removeFromCart = (index) => {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCart();
    };

    window.increaseQuantity = (index) => {
        cartItems[index].quantity += 1;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCart();
    };

    window.decreaseQuantity = (index) => {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity -= 1;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCart();
        }
    };

    updateCart();

    document.getElementById('editButton').addEventListener('click', () => {
        window.location.href = 'customerdetails.html';
    });

    document.getElementById('proceedButton').addEventListener('click', () => {
        window.location.href = 'payment.html';
    });

    document.getElementById('goBackButton').addEventListener('click', () => {
        window.location.href = 'manageinventory.html';
    });
});
