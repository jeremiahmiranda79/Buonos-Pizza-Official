// Signs up a new Customer
const customersignup = async(event) => {
    event.preventDefault();
    const first_name = document.querySelector('#firstName').value.trim();
    const last_name = document.querySelector('#lastName').value.trim();
    const address1 = document.querySelector('#add1').value.trim();
    const address2 = document.querySelector('#add2').value.trim();
    const city = document.querySelector('#city').value.trim();
    const state = document.querySelector('#state').value.trim();
    const zipcode = document.querySelector('#zip').value.trim();
    const phoneNumber = document.querySelector('#phone').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    const response = await fetch('/api/customer', {
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, address1, address2, city, state, zipcode, phoneNumber, email, password }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        alert('Customer Signed Up');
        document.location.replace('/');
    } else {
        console.log(response);
        alert(response.statusText);
    };
};

document.querySelector('#customersignup').addEventListener('submit', customersignup);