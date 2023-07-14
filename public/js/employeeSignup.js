// Creates a new Employee profile
const employeesignup = async(event) => {
    event.preventDefault();
    const first_name = document.querySelector('#firstName').value.trim();
    const last_name = document.querySelector('#lastName').value.trim();
    const admin = document.querySelector('#admin').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    // console.log(firstName, lastName, admin, email, password);
    const response = await fetch('/api/employee', {
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, admin, email, password }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        alert('Employee Signed Up');
        document.location.replace('/');
    } else {
        alert(response.statusText);
    };
};

document.querySelector('#employeesignup').addEventListener('submit', employeesignup);