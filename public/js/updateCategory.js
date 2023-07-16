// Update the category through the API
const updateCategory = async(event) => {
    event.preventDefault();
    const catId = document.querySelector('input[name="cat-id"]').value;
    const name = document.querySelector('#name').value.trim();

    const response = await fetch(`../../api/menu/updateCategory/${catId}`, {
        method: 'PUT',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/categories/create');
    } else {
        alert(response.statusText);
    };
};

// Functionality for Delete button as well
const deleteCategory = async(event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/menu/deleteCategory/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            alert('Are you sure you want to delete this category and all things related to it? This action cannot be undone.');
            document.location.replace('/categories/create');
        } else {
            alert(response.statusText);
        };
    };
};

document.querySelector('#updateCategory').addEventListener('submit', updateCategory);
document.querySelector('#deleteButton').addEventListener('click', deleteCategory);