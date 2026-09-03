/* =========================
   PRODUCT DATA
========================= */

const products = {

    signature: [
        { id: "burgertinho", name: "Burgertinho", subtitle: "by Santinho", price: 16.67, img: "logos/burgertinho.png" },
        { id: "maikiburger", name: "Maikiburger", subtitle: "by Miguel", price: 16.67, img: "logos/maikiburger.png" },
        { id: "drakuburger", name: "Drakuburger", subtitle: "by Matos", price: 16.67, img: "logos/drakuburger.png" },
        { id: "burgerchop", name: "Burgerchop", subtitle: "by Chop Machete", price: 16.67, img: "logos/burgerchop.png" },
        { id: "themagaburger", name: "The Magaburger", subtitle: "by Magallanes", price: 67, img: "logos/themagaburger.png", special: true, label: "HOUSE SPECIAL" }
    ],

    classic: [
        { id: "classicburger", name: "Classic Burger", subtitle: "The original", price: 9.99, img: "logos/classicburger.png" },
        { id: "doubletrouble", name: "Double Trouble", subtitle: "Two patties, zero regrets", price: 12.99, img: "logos/doubletrouble.png" },
        { id: "tripleburger", name: "Triple Burger", subtitle: "For the brave", price: 15.99, img: "logos/tripleburger.png" },
        { id: "simpleburger", name: "Simple Burger", subtitle: "No frills", price: 7.99, img: "logos/simpleburger.png" }
    ],

    sides: [
        { id: "clipfries", name: "Clip Fries", subtitle: "Crispy clips", price: 4.99, img: "logos/clipfries.png" },
        { id: "aurarings", name: "Aura Rings", subtitle: "Onion rings, but aura", price: 5.49, img: "logos/aurarings.png" },
        { id: "rizznuggets", name: "Rizz Nuggets", subtitle: "Chicken nuggets w/ rizz", price: 6.99, img: "logos/rizznuggets.png" },
        { id: "huzzkybites", name: "Huzzky Bites", subtitle: "Bite sized huzzky", price: 5.99, img: "logos/huzzkybites.png" },
        { id: "vestuarioroto", name: "Vestuario Roto", subtitle: "Torn but tasty", price: 4.49, img: "logos/vestuarioroto.png" }
    ],

    drinks: [
        { id: "classicdrink", name: "Classic Drink", subtitle: "The usual", price: 2.99, img: "logos/classicdrink.png" },
        { id: "reelsdrink", name: "Reels Drink", subtitle: "Scroll-approved", price: 3.49, img: "logos/reelsdrink.png" },
        { id: "brawlstarsdrink", name: "Brawl Stars Drink", subtitle: "Gem grab flavor", price: 3.49, img: "logos/brawlstarsdrink.png" },
        { id: "ponchedrink", name: "Ponche Drink", subtitle: "House ponche", price: 3.99, img: "logos/ponchedrink.png" }
    ],

    combos: [
        { id: "gangacombo", name: "Ganga Combo", subtitle: "Burger + Side + Drink", price: 19.99, img: "logos/gangacombo.png" },
        { id: "fiveadmins", name: "The 5 Admins", subtitle: "Feeds the whole server", price: 24.99, img: "logos/fiveadmins.png", special: true, label: "CREW PICK" },
        { id: "magallanescombo", name: "Magallanes Combo", subtitle: "Genshin approved", price: 18.99, img: "logos/magallanescombo.png" },
        { id: "ponchecombo", name: "Ponche Combo", subtitle: "Extra ponche energy", price: 17.99, img: "logos/ponchecombo.png" }
    ],

};


/* =========================
   ALL PRODUCTS
========================= */

const allProducts = {};

Object.keys(products).forEach(category => {
    products[category].forEach(product => {
        allProducts[product.id] = product;
    });
});


/* =========================
   BUILD YOUR OWN
========================= */

const byoBase = {
    name: "Base Burger",
    price: 8.00
};

const byoOptions = [
    { id: "extrapatty", name: "Extra Patty", price: 3.00 },
    { id: "cheddar", name: "Cheddar", price: 1.00 },
    { id: "bacon", name: "Bacon", price: 2.00 },
    { id: "auraclips", name: "Aura Clips", price: 1.50 },
    { id: "onions", name: "Grilled Onions", price: 0.75 },
    { id: "sauce", name: "Special Sauce", price: 0.50 },
    { id: "jalapenos", name: "Jalapeños", price: 0.75 }
];


/* =========================
   STATE
========================= */

const quantities = {};

Object.keys(allProducts).forEach(id => {
    quantities[id] = 0;
});

let customItems = [];
let customCounter = 0;
let byoSelected = new Set();


/* =========================
   DOM
========================= */

const orderItems = document.getElementById("order-items");
const totalPrice = document.getElementById("total-price");

const clearOrderButton = document.getElementById("clear-order");

const paymentOptions = document.querySelectorAll(".payment-option");
const cardInput = document.getElementById("card-input");
const fakeCard = document.getElementById("fake-card");

const placeOrderButton = document.getElementById("place-order");
const successMessage = document.getElementById("success-message");

const byoOptionsContainer = document.getElementById("byo-options");
const byoTotalPrice = document.getElementById("byo-total-price");
const byoAddButton = document.getElementById("byo-add");


/* =========================
   HELPERS
========================= */

function formatPrice(value) {
    return `$${value.toFixed(2)}`;
}


function cardClassForCategory(category) {

    if (category === "signature") {
        return "order-card signature-card";
    }

    if (category === "classic") {
        return "order-card classic-card";
    }

    if (category === "sides" || category === "drinks") {
        return "order-card compact-card";
    }

    if (category === "combos") {
        return "order-card combo-card";
    }

    if (category === "secret") {
        return "order-card secret-card";
    }

    return "order-card";
}


/* =========================
   RENDER PRODUCTS
========================= */

function renderGrid(containerId, category) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    products[category].forEach(product => {

        const card = document.createElement("article");

        card.className = cardClassForCategory(category);

        if (product.special) {

            card.classList.add(
                category === "signature"
                    ? "magaburger-order"
                    : "combo-special"
            );

        }

        let labelHTML = "";

        if (product.label) {

            labelHTML = `
                <span class="special-label">
                    ${product.label}
                </span>
            `;

        }

        if (category === "secret") {

            labelHTML = `
                <span class="classified-label">
                    ${product.locked ? "CLASSIFIED" : "UNLOCKED"}
                </span>
            `;

        }

        const priceDisplay =
            product.price === null
                ? "???"
                : formatPrice(product.price);

        let actionHTML;

        if (category === "secret" && product.locked) {

            actionHTML = `
                <button class="locked-button" disabled>
                    [ LOCKED ]
                </button>
            `;

        } else {

            actionHTML = `
                <div class="quantity">

                    <button
                        class="minus"
                        data-id="${product.id}">
                        −
                    </button>

                    <span
                        class="qty-value"
                        data-id="${product.id}">
                        ${quantities[product.id]}
                    </span>

                    <button
                        class="plus"
                        data-id="${product.id}">
                        +
                    </button>

                </div>
            `;

        }

        card.innerHTML = `

            ${labelHTML}

            <img
                src="${product.img}"
                alt="${product.name}"
            >

            <div class="order-card-info">

                <h2>
                    ${product.name}
                </h2>

                <p>
                    ${product.subtitle}
                </p>

                <p class="card-price">
                    ${priceDisplay}
                </p>

            </div>

            ${actionHTML}

        `;

        container.appendChild(card);

    });

    attachQuantityListeners(container);
}


/* =========================
   RENDER ALL
========================= */

function renderAllGrids() {

    renderGrid("signature-grid", "signature");
    renderGrid("classic-grid", "classic");
    renderGrid("sides-grid", "sides");
    renderGrid("drinks-grid", "drinks");
    renderGrid("combos-grid", "combos");

}


/* =========================
   QUANTITY
========================= */

function attachQuantityListeners(container) {

    container.querySelectorAll(".plus").forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.id;

            quantities[id]++;

            syncQuantityDisplays(id);

            renderCart();

        });

    });


    container.querySelectorAll(".minus").forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.id;

            if (quantities[id] > 0) {

                quantities[id]--;

                syncQuantityDisplays(id);

                renderCart();

            }

        });

    });

}


function syncQuantityDisplays(id) {

    document
        .querySelectorAll(`.qty-value[data-id="${id}"]`)
        .forEach(span => {

            span.textContent = quantities[id];

        });


    document
        .querySelectorAll(`.cart-qty-value[data-id="${id}"]`)
        .forEach(span => {

            span.textContent = quantities[id];

        });

}


/* =========================
   BUILD YOUR OWN
========================= */

function renderByoOptions() {

    if (!byoOptionsContainer) return;

    byoOptionsContainer.innerHTML = "";

    byoOptions.forEach(option => {

        const button = document.createElement("button");

        button.type = "button";

        button.className = "byo-option";

        button.dataset.id = option.id;

        button.innerHTML = `
            <span>${option.name}</span>
            <span class="byo-option-price">
                +$${option.price.toFixed(2)}
            </span>
        `;

        button.addEventListener("click", () => {

            if (byoSelected.has(option.id)) {

                byoSelected.delete(option.id);

                button.classList.remove("selected");

            } else {

                byoSelected.add(option.id);

                button.classList.add("selected");

            }

            updateByoTotal();

        });

        byoOptionsContainer.appendChild(button);

    });

}


function calculateByoTotal() {

    let total = byoBase.price;

    byoSelected.forEach(id => {

        const option =
            byoOptions.find(item => item.id === id);

        if (option) {
            total += option.price;
        }

    });

    return total;
}


function updateByoTotal() {

    if (byoTotalPrice) {

        byoTotalPrice.textContent =
            formatPrice(calculateByoTotal());

    }

}


if (byoAddButton) {

    byoAddButton.addEventListener("click", () => {

        customCounter++;

        const selectedOptions =
            byoOptions.filter(option =>
                byoSelected.has(option.id)
            );

        customItems.push({

            uid: `custom-${customCounter}`,

            name: `CUSTOM BURGER #${customCounter}`,

            ingredients:
                selectedOptions.map(option => option.name),

            price: calculateByoTotal()

        });


        byoSelected = new Set();


        byoOptionsContainer
            .querySelectorAll(".byo-option")
            .forEach(button => {

                button.classList.remove("selected");

            });


        updateByoTotal();

        renderCart();

    });

}


/* =========================
   CART
========================= */

function removeCustomItem(uid) {

    customItems =
        customItems.filter(item => item.uid !== uid);

    renderCart();

}


function renderCart() {

    if (!orderItems) return;

    orderItems.innerHTML = "";

    let total = 0;
    let itemNumber = 0;
    let hasItems = false;


    Object.keys(allProducts).forEach(id => {

        const qty = quantities[id];

        if (qty <= 0) return;

        const product = allProducts[id];

        hasItems = true;

        itemNumber++;

        const lineTotal =
            product.price * qty;

        total += lineTotal;


        const item =
            document.createElement("div");

        item.className = "order-item";


        item.innerHTML = `

            <div class="order-item-info">

                <span class="order-item-number">
                    #${String(itemNumber).padStart(2, "0")}
                </span>

                <span class="order-item-name">
                    ${product.name}
                </span>

            </div>


            <div class="order-item-right">

                <div class="cart-qty">

                    <button
                        class="cart-minus"
                        data-id="${id}">
                        −
                    </button>

                    <span
                        class="cart-qty-value"
                        data-id="${id}">
                        ${qty}
                    </span>

                    <button
                        class="cart-plus"
                        data-id="${id}">
                        +
                    </button>

                </div>


                <span class="order-item-price">
                    ${formatPrice(lineTotal)}
                </span>


                <button
                    class="remove-item"
                    data-id="${id}">
                    REMOVE
                </button>

            </div>

        `;

        orderItems.appendChild(item);

    });


    customItems.forEach(customItem => {

        hasItems = true;

        itemNumber++;

        total += customItem.price;


        const item =
            document.createElement("div");

        item.className =
            "order-item custom-order-item";


        const ingredients =
            customItem.ingredients.length > 0
                ? customItem.ingredients.join(", ")
                : "No extras";


        item.innerHTML = `

            <div class="order-item-info">

                <span class="order-item-number">
                    #${String(itemNumber).padStart(2, "0")}
                </span>

                <div>

                    <span class="order-item-name">
                        ${customItem.name}
                    </span>

                    <p class="custom-ingredients">
                        ${ingredients}
                    </p>

                </div>

            </div>


            <div class="order-item-right">

                <span class="order-item-price">
                    ${formatPrice(customItem.price)}
                </span>

                <button
                    class="remove-item"
                    data-custom="${customItem.uid}">
                    REMOVE
                </button>

            </div>

        `;

        orderItems.appendChild(item);

    });


    if (!hasItems) {

        orderItems.innerHTML = `
            <p class="empty-order">
                Your order is empty.
            </p>
        `;

    }


    totalPrice.textContent =
        formatPrice(total);

    attachCartListeners();

}


/* =========================
   CART LISTENERS
========================= */

function attachCartListeners() {

    orderItems
        .querySelectorAll(".cart-plus")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id = button.dataset.id;

                quantities[id]++;

                syncQuantityDisplays(id);

                renderCart();

            });

        });


    orderItems
        .querySelectorAll(".cart-minus")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id = button.dataset.id;

                if (quantities[id] > 0) {

                    quantities[id]--;

                    syncQuantityDisplays(id);

                    renderCart();

                }

            });

        });


    orderItems
        .querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener("click", () => {

                if (button.dataset.custom) {

                    removeCustomItem(
                        button.dataset.custom
                    );

                    return;

                }


                const id = button.dataset.id;

                quantities[id] = 0;

                syncQuantityDisplays(id);

                renderCart();

            });

        });

}


/* =========================
   CLEAR ORDER
========================= */

if (clearOrderButton) {

    clearOrderButton.addEventListener("click", () => {

        Object.keys(quantities).forEach(id => {

            quantities[id] = 0;

            syncQuantityDisplays(id);

        });

        customItems = [];

        renderCart();

    });

}


/* =========================
   PAYMENT
========================= */

function syncPaymentUI(payment) {

    if (!cardInput) return;

    if (payment === "card") {

        cardInput.classList.add("show");

    } else {

        cardInput.classList.remove("show");

        if (fakeCard) {
            fakeCard.value = "";
        }

    }

}


paymentOptions.forEach(option => {

    option.addEventListener("click", () => {

        paymentOptions.forEach(button => {
            button.classList.remove("active");
        });

        option.classList.add("active");

        syncPaymentUI(
            option.dataset.payment
        );

    });

});


/* =========================
   CARD
========================= */

if (fakeCard) {

    fakeCard.addEventListener("input", () => {

        fakeCard.value =
            fakeCard.value
                .replace(/\D/g, "")
                .slice(0, 12);

    });

}


/* =========================
   PLACE ORDER
========================= */

if (placeOrderButton) {

    placeOrderButton.addEventListener("click", () => {

        const totalItems =
            Object.values(quantities)
                .reduce((sum, qty) => sum + qty, 0)
            + customItems.length;


        if (totalItems === 0) {

            placeOrderButton.textContent =
                "ADD A BURGER FIRST";

            setTimeout(() => {

                placeOrderButton.textContent =
                    "PLACE ORDER";

            }, 1800);

            return;

        }


        const selectedPayment =
            document.querySelector(
                ".payment-option.active"
            );


        if (!selectedPayment) return;


        const paymentType =
            selectedPayment.dataset.payment;


        if (
            paymentType === "card" &&
            fakeCard &&
            fakeCard.value.length !== 12
        ) {

            fakeCard.classList.add("invalid");

            fakeCard.focus();

            setTimeout(() => {

                fakeCard.classList.remove("invalid");

            }, 1200);

            return;

        }


        if (successMessage) {

            successMessage.classList.add("show");

            setTimeout(() => {

                successMessage.classList.remove("show");

            }, 4000);

        }


        Object.keys(quantities).forEach(id => {

            quantities[id] = 0;

            syncQuantityDisplays(id);

        });


        customItems = [];

        if (fakeCard) {
            fakeCard.value = "";
        }

        renderCart();

    });

}


/* =========================
   CATEGORY SWITCHER
========================= */

function initCategorySwitcher() {

    const links =
        document.querySelectorAll(".category-link");

    const sections =
        document.querySelectorAll(".menu-section");


    if (!links.length || !sections.length) return;


    function showCategory(category) {

        sections.forEach(section => {

            const matches =
                section.dataset.category === category;

            section.classList.toggle(
                "active-section",
                matches
            );

        });


        links.forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.category === category
            );

        });


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    links.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const category =
                link.dataset.category;

            showCategory(category);

        });

    });


    showCategory("signature");

}


/* =========================
   INIT
========================= */

renderAllGrids();

renderByoOptions();

updateByoTotal();

renderCart();

syncPaymentUI("card");

initCategorySwitcher();
