// Update the Menu Item through the API
const updateMenuItem = async(event) => {
    event.preventDefault();
    const itemId = document.querySelector('input[name="item-id"]').value;
    const name = document.querySelector('#name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const price = document.querySelector('#price').value.trim();
    const quantity = document.querySelector('#quantity').value.trim();
    const categoryId = document.querySelector('#categoryId').value.trim();
    const modifierId = document.querySelector('#modifierId').value.trim();
    const sizeId = document.querySelector('#sizeId').value.trim();
    const employeeId = document.querySelector('#employeeId').value.trim();
    const response = await fetch(`../../api/menu/updateMenuItem/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify({ name, description, price, quantity, categoryId, modifierId, sizeId, employeeId }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/menuitems/create');
    } else {
        alert(response.statusText);
    };
};

// Functionality for Delete button as well
const deleteMenuItem = async(event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/menu/deleteMenuItem/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/menuitems/create');
        } else {
            alert(response.statusText);
        };
    };
};

document.querySelector('#updateMenuItem').addEventListener('submit', updateMenuItem);
document.querySelector('#deleteButton').addEventListener('click', deleteMenuItem)