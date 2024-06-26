document.addEventListener('DOMContentLoaded', () => {
    const initialReviews = [
        { name: "John Doe", review: "I absolutely love shopping at Nature's Basket! The quality of the organic produce is unmatched, and I always feel confident that I'm feeding my family the best. The variety is fantastic, and I appreciate the focus on sustainability!", rating: 5 },
        { name: "Jane Smith", review: "Nature's Basket has quickly become my go-to for all my organic needs. The selection of fresh fruits and vegetables is incredible, and the prices are very reasonable for the quality you get.", rating: 4 },
        { name: "Emily Johnson", review: "I'm so glad I discovered Nature's Basket! The fresh, organic products have really made a difference in my cooking. The attention to detail and customer service are top-notch. I'll definitely be a regular customer!", rating: 5 }
    ];

    let reviews = JSON.parse(localStorage.getItem('reviews')) || initialReviews;
    let userAddedReviews = JSON.parse(localStorage.getItem('userAddedReviews')) || [];

    function displayReviews() {
        const reviewsList = document.getElementById('reviewsList');
        reviewsList.innerHTML = '';
        reviews.forEach((entry, index) => {
            const stars = '&#9733;'.repeat(entry.rating) + '&#9734;'.repeat(5 - entry.rating);
            reviewsList.innerHTML += `
                <div class="review-card">
                    <p><strong>${entry.name}:</strong></p>
                    <p>"${entry.review}"</p>
                    <p class="stars"><strong> Rating: ${entry.rating}/5</strong></p>
                    <div class="review-actions">
                        ${userAddedReviews.includes(index) ? `<button onclick="editReview(${index})" class="edit">Edit</button>` : ''}
                        ${userAddedReviews.includes(index) ? `<button onclick="deleteReview(${index})">Delete</button>` : ''}
                    </div>
                </div>
            `;
        });
    }

    function addReview() {
        const name = document.getElementById('reviewerName').value;
        const review = document.getElementById('reviewText').value;
        const rating = document.getElementById('rating').value;
        if (name && review && rating) {
            reviews.push({ name, review, rating: parseInt(rating) });
            userAddedReviews.push(reviews.length - 1);
            localStorage.setItem('reviews', JSON.stringify(reviews));
            localStorage.setItem('userAddedReviews', JSON.stringify(userAddedReviews));
            displayReviews();
            document.getElementById('reviewForm').reset();
            const stars = document.querySelectorAll('.star');
            stars.forEach(star => star.classList.remove('selected'));
            document.getElementById('rating').value = '';
        }
    }

    function deleteReview(index) {
        reviews.splice(index, 1);
        userAddedReviews = userAddedReviews.filter(reviewIndex => reviewIndex !== index);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        localStorage.setItem('userAddedReviews', JSON.stringify(userAddedReviews));
        displayReviews();
    }

    function editReview(index) {
        const newReview = prompt('Edit your review:', reviews[index].review);
        if (newReview !== null) {
            reviews[index].review = newReview;
            const newRating = prompt('Edit your rating (1-5):', reviews[index].rating);
            if (newRating !== null && newRating >= 1 && newRating <= 5) {
                reviews[index].rating = parseInt(newRating);
            }
            localStorage.setItem('reviews', JSON.stringify(reviews));
            displayReviews();
        }
    }

    document.getElementById('reviewForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        addReview();
    });

    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-value');
            document.getElementById('rating').value = rating;
            stars.forEach(s => {
                s.classList.remove('selected');
                if (s.getAttribute('data-value') <= rating) {
                    s.classList.add('selected');
                }
            });
        });
    });

    displayReviews();
    window.deleteReview = deleteReview;
    window.editReview = editReview;
});
