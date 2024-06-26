document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('paymentForm');
    const backToConfirmButton = document.getElementById('backToConfirmButton');

    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        localStorage.removeItem('customerData');
        localStorage.removeItem('cartItems');
        
        window.location.href = 'orderplaced.html'; 
    });

    backToConfirmButton.addEventListener('click', () => {
        window.location.href = 'confirmdetails.html';
    });
});
