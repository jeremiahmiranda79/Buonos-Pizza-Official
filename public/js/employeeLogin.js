const employeeloginFormHandler = async(event) => {
  event.preventDefault();

  //Collect values from the login form
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    //Send a POST request to the API endpoints
    const response = await fetch('../api/employee/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Employee Logged In');
      // If successful, redirect the browser to the home page
      document.location.replace('/menu');
    } else {
      console.log(response);
      alert(response.statusText);
    };
  };
};

document.querySelector('#employeelogin').addEventListener('submit', employeeloginFormHandler);
// const employeeloginFormHandler = async(event) => {

// // Logs user in as a Employee
// const employeelogin = async(event) => {
//     event.preventDefault();
//     //Collect values from the login form
//     const email = document.querySelector('#email').value.trim();
//     const password = document.querySelector('#password').value.trim();

//     if (email && password) {
//       //Send a POST request to the API endpoints
//       const response = await fetch('../api/employee/login', {
//         method: 'POST',
//         body: JSON.stringify({ email, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.ok) {
//         alert('Employee Logged In');
//         // If successful, redirect the browser to the home page
//         document.location.replace('/menu');
//       } else {
//         console.log(response);
//         alert(response.statusText);
//       };
//     };
//   };
  
//   document.querySelector('#employeelogin').addEventListener('submit', employeeloginFormHandler);