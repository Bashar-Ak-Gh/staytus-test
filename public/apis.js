const classificationFilter = "reptile"; // reptile, mammal
const baseUrl = "https://swapi.dev/api";

export async function getPlanets() {
  let species = [];
  let nextPage = `${baseUrl}/species`;
  // I used a loop here because I noticed that some times the results are paginated, therefore I need to to make sure I am getting all pages
  while (true) {
    const response = await axios.get(`${nextPage}`);
    species = [...species, ...response.data.results];
    if (!response.data?.next) break;
    nextPage = response.data.next;
  }
  return (
    // Fetch all reptile species
    Promise.all(
      species
        // Filter by classification
        .filter(
          (speciesObj) =>
            speciesObj.classification.toLowerCase() ===
            classificationFilter.toLowerCase()
        )
        // Get species films urls and remove duplicates
        .reduce((filmsUrls, speciesObj) => {
          const addedFilmsUrls = [];
          speciesObj.films.forEach((filmUrl) => {
            if (!filmsUrls.includes(filmUrl)) addedFilmsUrls.push(filmUrl);
          });
          return [...filmsUrls, ...addedFilmsUrls];
        }, [])
    )
      // Fetch spices films
      .then((filmsUrls) =>
        Promise.all(
          filmsUrls.map((filmUrl) =>
            axios.get(filmUrl).then((filmResponse) => filmResponse.data)
          )
        )
      )
      // Group by planet
      .then((films) =>
        films.reduce((planetsDataAcc, film) => {
          const planetsData = { ...planetsDataAcc };
          film.planets.forEach((planetUrl) => {
            if (
              (planetsData[planetUrl] ?? []).findIndex(
                (planetFilm) => film.url === planetFilm.url
              ) < 0
            ) {
              if (planetsData[planetUrl]) {
                planetsData[planetUrl].push(film);
              } else {
                planetsData[planetUrl] = [film];
              }
            }
          });
          return planetsData;
        }, {})
      )
      // Fetch planets
      .then((planetsData) =>
        Promise.all(
          Object.keys(planetsData).map((planetsUrl) =>
            axios
              .get(planetsUrl)
              .then((planetResponse) => planetResponse.data)
              .then((planet) => ({ ...planet, films: planetsData[planetsUrl] }))
          )
        )
      )
      // Exclude planets with empty films
      .then((planets) => planets.filter((planet) => planet.films.length))
  );
}
