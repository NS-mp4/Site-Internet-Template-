// --- GESTION DU PANIER ---
let cart = [];
const cartCountElement = document.getElementById('cart-count');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const sideCartElement = document.getElementById('side-cart');

function toggleCart() {
    sideCartElement.classList.toggle('active');
}

// Boutons Ajouter au panier
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        
        cart.push({ name, price });
        updateCart();
        
        // Notification visuelle
        button.innerText = "Ajouté ! ✓";
        button.style.background = "#28a745";
        setTimeout(() => {
            button.innerText = "Ajouter au panier";
            button.style.background = "#8b0000";
        }, 1000);
    });
});

function updateCart() {
    cartCountElement.innerText = cart.length;
    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItemsElement.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>${item.price.toFixed(2)}€</span>
                <button onclick="removeItem(${index})" style="color:red; background:none; border:none; cursor:pointer;">X</button>
            </div>
        `;
    });
    cartTotalElement.innerText = total.toFixed(2);
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Click & Collect
document.querySelector('.btn-checkout').addEventListener('click', () => {
    if(cart.length > 0) {
        alert("Succès ! Votre commande est prête à être récupérée en boutique sous 2h.");
        cart = [];
        updateCart();
        toggleCart();
    } else {
        alert("Votre panier est vide.");
    }
});

// --- SYSTÈME DE FILTRES ---
const filterButtons = document.querySelectorAll('.filter-btn');
const products = document.querySelectorAll('.product-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Style bouton actif
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        products.forEach(product => {
            if (filterValue === 'all' || product.getAttribute('data-category') === filterValue) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});