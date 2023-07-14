// Logs user in as a Customer
const customerlogin = async(event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    if (email && password) {
      const response = await fetch('../api/customer/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert('Customer Logged In');
        document.location.replace('/');
      } else {
        console.log(response);
        alert(response.statusText);
      };
    };
  };
  
  document.querySelector('#customerlogin').addEventListener('submit', customerlogin);