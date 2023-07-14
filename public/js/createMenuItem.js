// POST method using information in an HTML <form> tag
const addMenuItem = async(event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const price = document.querySelector('#price').value.trim();
    const quantity = document.querySelector('#quantity').value.trim();
    const categoryId = document.querySelector('#categoryId').value.trim();
    const modifierId = document.querySelector('#modifierId').value.trim();
    const sizeId = document.querySelector('#sizeId').value.trim();
    const employeeId = document.querySelector('#employeeId').value.trim();
    const response = await fetch('/api/menu/newitem', {
        method: 'POST',
        body: JSON.stringify({ name, description, price, quantity, categoryId, modifierId, sizeId, employeeId }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        alert('Menu Item Created');
        document.location.replace('/menuitems/create');
    } else {
        alert(response.statusText);
    };
};

document.querySelector('#addMenuItem').addEventListener('submit', addMenuItem);