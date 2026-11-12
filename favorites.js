document.addEventListener("DOMContentLoaded", function() {
    const favBtns = document.querySelectorAll('.favorite-btn');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favBtns.forEach(btn => {
        const itemId = btn.getAttribute('data-id');

        if (favorites.some(item => item.id === itemId)) {
            btn.classList.add('active');
            btn.querySelector('img').style.filter = 'sepia(1) saturate(5) hue-rotate(15deg)';
        }

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const itemData = {
                id: this.getAttribute('data-id'),
                brand: this.getAttribute('data-brand'),
                name: this.getAttribute('data-name'),
                price: parseInt(this.getAttribute('data-price')),
                image: this.getAttribute('data-image'),
                qty: 1
            };

            const index = favorites.findIndex(item => item.id === itemData.id);

            if (index > -1) {
                favorites.splice(index, 1);
                this.classList.remove('active');
                this.querySelector('img').style.filter = 'none';
            } else {
                favorites.push(itemData);
                this.classList.add('active');
                this.querySelector('img').style.filter = 'sepia(1) saturate(5) hue-rotate(15deg)';
            }

            localStorage.setItem('favorites', JSON.stringify(favorites));
        });
    });

    const favoritesList = document.getElementById('favoritesList');
    
    if (favoritesList) {
        function renderFavorites() {
            favoritesList.innerHTML = '';
            
            if (favorites.length === 0) {
                favoritesList.innerHTML = '<p style="font-family: Inter; font-size: 20px;">В избранном пока пусто...</p>';
                return;
            }

            favorites.forEach(item => {
                const itemHTML = `
                    <div class="fav-item" data-id="${item.id}">
                        <div class="fav-image-box">
                            <button class="fav-heart" onclick="removeFromFav('${item.id}')">
                                <img src="img/for_catalog/fav_filled.svg" alt="В избранное" class="fav-svg-img">
                            </button>
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="fav-info">
                            <div class="fav-name">${item.name}</div>
                            <div class="fav-price">${item.price.toLocaleString('ru-RU')} ₽</div>
                            
                            <div class="fav-counter">
                                <button onclick="changeQty('${item.id}', -1)">-</button>
                                <span id="qty-${item.id}">${item.qty}</span>
                                <button onclick="changeQty('${item.id}', 1)">+</button>
                            </div>
                            
                            <div class="fav-total" id="total-${item.id}">${(item.price * item.qty).toLocaleString('ru-RU')} ₽</div>
                            
                            <button class="fav-add-cart">В КОРЗИНУ</button>
                        </div>
                    </div>
                `;
                favoritesList.insertAdjacentHTML('beforeend', itemHTML);
            });
        }

        window.removeFromFav = function(id) {
            favorites = favorites.filter(item => item.id !== id);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            renderFavorites();
        };

        window.changeQty = function(id, delta) {
            const item = favorites.find(i => i.id === id);
            if (item) {
                item.qty += delta;
                if (item.qty < 1) item.qty = 1;
                
                localStorage.setItem('favorites', JSON.stringify(favorites));
                
                document.getElementById(`qty-${id}`).innerText = item.qty;
                document.getElementById(`total-${id}`).innerText = (item.price * item.qty).toLocaleString('ru-RU') + ' ₽';
            }
        };

        renderFavorites();
    }
});