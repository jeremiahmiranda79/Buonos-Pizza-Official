// Logs out a Customer
const customerlogout = async() => {
    const response = await fetch('api/customer/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
    });
    if (response.ok) {
        alert('User Logged Out');
        document.location.replace('/');
    } else {
        alert(response.statusText);
    };
};

// Logs out an Employee
const employeelogout = async() => {
    const response = await fetch('api/employee/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
    });
    if (response.ok) {
        alert('User Logged Out');
        document.location.replace('/');
    } else {
        alert(response.statusText);
    };
};

document.querySelector('#customerlogout').addEventListener('click', customerlogout);
document.querySelector('#employeelogout').addEventListener('click', employeelogout);