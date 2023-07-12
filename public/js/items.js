const itemPrice = document.querySelector('#price');
// const addonButtons = document.querySelectorAll('.addon-button')

// const totalPrice = parseFloat(itemPrice.textContent);

// console.log(typeof(totalPrice), totalPrice);
// console.log(addonButtons);

// addonButtons.forEach((item) => {
//     item.addEventListener('click', (event) => {
//         console.log(event.target)
//         itemPrice += event.target.dataset.data-price;
//         console.log(typeof(totalPrice), totalPrice);
//     })
// }) 

function updatePrice() {
    let price = 19.49;
    const checkboxes = document.getElementsByClassName("addon-button");

    for(let i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) price += Number(checkboxes[i].value);
    }

    document.getElementById("price").innerText = parseFloat(price.toFixed(2));
}

