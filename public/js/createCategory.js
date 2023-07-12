const addCat = async(event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const response = await fetch('/api/menu/newcategory', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        alert('Category Created');
        document.location.replace('/categories/create');
    } else {
        alert(response.statusText);
    };
};

document.querySelector('#addCat').addEventListener('submit', addCat);