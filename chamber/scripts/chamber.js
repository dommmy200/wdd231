async function readCardFile() {
  try {
    const response = await fetch("./data/dir-cards.json"); // Fetch the JSON file
    if (!response.ok) {
      throw new Error('Failed to fetch card data');
    }
    
    const data = await response.json();
    console.log(data); // Optional: log the data
    return data; // Return the data for further processing
  } catch (error) {
    console.error('Error fetching card data:', error);
    throw error; // Rethrow the error for handling by the caller
  }
}
readCardFile().then(foo => {
  for (let i = 0; i < foo.length; i++) {
    console.log(foo[i].alternate);
  }
});
