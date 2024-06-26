document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('customerForm');

    const existingCustomerData = JSON.parse(localStorage.getItem('customerData'));
    if (existingCustomerData) {
        form.name.value = existingCustomerData.name;
        form.address.value = existingCustomerData.address;
        form.city.value = existingCustomerData.city;
        form.state.value = existingCustomerData.state;
        form.zip.value = existingCustomerData.zip;
        form.phone.value = existingCustomerData.phone;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const zip = form.zip.value;
        const phone = form.phone.value;

        if (!/^\d+$/.test(zip)) {
            alert('Please enter a valid ZIP Code with numeric characters only.');
            return;
        }

        if (!/^\d+$/.test(phone)) {
            alert('Please enter a valid Phone Number with numeric characters only.');
            return;
        }

        const customerData = {
            name: form.name.value,
            address: form.address.value,
            city: form.city.value,
            state: form.state.value,
            zip: zip,
            phone: phone
        };

        localStorage.setItem('customerData', JSON.stringify(customerData));
        window.location.href = 'confirmdetails.html';
    });
});
