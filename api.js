export async function fetchCatImage() {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();
    return data[0].url;
  }
  
  export async function fetchFoxImage() {
    const response = await fetch('https://randomfox.ca/floof/');
    const data = await response.json();
    return data.image;
  }
  
  export async function searchBreed(breed) {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`);
    const data = await response.json();
    if (data.length > 0) {
      return data[0].url;
    } else {
      throw new Error('Breed not found');
    }
  }
  