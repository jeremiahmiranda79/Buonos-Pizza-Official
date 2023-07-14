const itemPrice = document.querySelector('#price');

function updatePrice() {
    let price = 19.49;
    const checkboxes = document.getElementsByClassName("addon-button");

    for(let i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) price += Number(checkboxes[i].value);
    }

    document.getElementById("price").innerText = parseFloat(price.toFixed(2));
}