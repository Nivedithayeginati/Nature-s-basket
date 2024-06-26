document.addEventListener('DOMContentLoaded', () => {
    const inventory = [];

    function createItem() {
        const item = document.getElementById('item').value;
        const quantity = document.getElementById('quantity').value;
        const itemCategory = document.getElementById('itemCategory').value;
        inventory.push({ item, quantity, category: itemCategory });
        displayInventory();
    }

    function displayInventory() {
        const inventoryList = document.getElementById('inventoryList');
        const selectedCategory = document.getElementById('category').value;
        inventoryList.innerHTML = '';
        inventory.forEach((entry, index) => {
            if (selectedCategory === 'all' || selectedCategory === entry.category) {
                inventoryList.innerHTML += `<div data-category="${entry.category}">${entry.item} - ${entry.quantity} 
                <button onclick="updateItem(${index})">Update</button> 
                <button onclick="deleteItem(${index})">Delete</button></div>`;
            }
        });
    }

    function updateItem(index) {
        const newQuantity = prompt('Enter new quantity:', inventory[index].quantity);
        if (newQuantity !== null) {
            inventory[index].quantity = newQuantity;
            displayInventory();
        }
    }

    function deleteItem(index) {
        inventory.splice(index, 1);
        displayInventory();
    }

    document.getElementById('crudForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        createItem();
    });

    document.getElementById('category')?.addEventListener('change', () => {
        displayInventory();
    });

    window.updateItem = updateItem;
    window.deleteItem = deleteItem;

    if (document.getElementById('myChart')) {
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Apples', 'Bananas', 'Oranges', 'Grapes', 'Pineapples'],
                datasets: [{
                    label: 'Sales',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    const reviews = [
        { name: "John Doe", review: "Great store with fresh products!" },
        { name: "Jane Smith", review: "Excellent customer service." },
        { name: "Emily Johnson", review: "Fast delivery and good prices." }
    ];

    function displayReviews() {
        const reviewsList = document.getElementById('reviewsList');
        reviewsList.innerHTML = '';
        reviews.forEach((entry, index) => {
            reviewsList.innerHTML += `<div><p><strong>${entry.name}:</strong> ${entry.review} 
            <button onclick="deleteReview(${index})">Delete</button></p></div>`;
        });
    }

    function addReview() {
        const name = document.getElementById('reviewerName').value;
        const review = document.getElementById('reviewText').value;
        if (name && review) {
            reviews.push({ name, review });
            displayReviews();
        }
    }

    function deleteReview(index) {
        reviews.splice(index, 1);
        displayReviews();
    }

    document.getElementById('reviewForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        addReview();
    });

    displayReviews();
    window.deleteReview = deleteReview;
});
