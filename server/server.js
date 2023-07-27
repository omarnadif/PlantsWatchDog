import express from 'express';
import fetch from 'node-fetch'; 

const app = express(); 

app.get("/api", (req, res) => { 
  // récupération de données de recherche
  const searchTerm = req.query.search || ""; 
  //encoding variable pour bien l'envoyer à l'api
  const apiUrl = `https://trefle.io/api/v1/plants/search?token=B0XVucF6lIwHqo4_Sar0rAWFjoekaY4HGZEOfCYWgFE&q=${encodeURIComponent(searchTerm)}`; 
  fetch(apiUrl)
    .then(response => response.json()) 
    .then(data => {
      const plants = data.data.map((plant) => ({
        id: plant.id,
        common_name: plant.common_name,
        scientific_name: plant.scientific_name,
        family_common_name: plant.family_common_name,
        image_url: plant.image_url,
        synonyms: plant.synonyms
      }));
      // Envoi des données des plantes en JSON
      res.json(plants); 
    })
    .catch(error => {
      console.error("Error fetching data from Trefle API:", error); 
      res.status(500).json({ "error": "An error occurred while fetching data" }); 
    });
});
//PORT 5000
app.listen(5000, () => { console.log("Server running on port 5000...") }); 
