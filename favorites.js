export function saveFavorite(imageUrl) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(imageUrl);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
  }
  
  export function loadFavorites() {
    displayFavorites();
  }
  
  function displayFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.innerHTML = '';
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach(imageUrl => {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.classList.add('favorite-image');
      favoritesContainer.appendChild(img);
    });
  }
  