const employeelogin = async(event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    if (email && password) {
      const response = await fetch('../api/employee/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert('Employee Logged In');
        document.location.replace('/');
      } else {
        console.log(response);
        alert(response.statusText);
      };
    };
  };
  
  document.querySelector('#employeelogin').addEventListener('submit', employeelogin);