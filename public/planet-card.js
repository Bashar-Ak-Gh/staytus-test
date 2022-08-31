const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function generatePlanetsCards(planets) {
  return `${planets
    .map((planet) => {
      const planetDate = new Date(planet.created);
      const formattedPlanetDate = `${
        months[planetDate.getMonth()]
      } ${planetDate.getDate()}, ${planetDate.getFullYear()}`;
      return `
    <!-- mobile view -->
    <div
      class="lg:hidden rounded-2xl p-4 my-4 bg-dark-grey hover:bg-darker-grey hover:shadow transition-all duration-200"
    >
      <div class="mb-2 text-yellow">${formattedPlanetDate}</div>
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center justify-between">
          <div
            class="flex items-center justify-center rounded-full bg-grey mr-2 h-10 w-10"
          >
            ${planet.name[0].toUpperCase()}
          </div>
          <div>
            <div class="font-bold">
              ${planet.name[0].toUpperCase()}${planet.name.slice(0)}</div>
            <div class="text-light-grey">
              ${planet.climate[0].toUpperCase()}${planet.climate.slice(0)}
          </div>
          </div>
        </div>
        <div class="text-yellow">Icon</div>
      </div>
      <div class="text-lighter-grey">
        ${planet.films
          .map((film) => `${film.title[0].toUpperCase()}${film.title.slice(1)}`)
          .join(", ")}
      </div>
    </div>

    <!-- desktop view -->
    <div
      class="group hidden lg:block rounded-2xl p-4 my-4 bg-darker-grey hover:bg-dark-grey hover:shadow transition-all duration-200"
    >
      <div class="mb-2 text-yellow text-right">${formattedPlanetDate}</div>
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center justify-between">
          <div
            class="flex items-center justify-center rounded-2xl bg-dark-grey text-sm text-yellow mr-2 h-10 w-10"
          >
            Icon
          </div>
          <div>
            <div class="font-bold">
              ${planet.name[0].toUpperCase()}${planet.name.slice(0)}
            </div>
            <div class="text-grey">
              ${planet.films
                .map(
                  (film) =>
                    `${film.title[0].toUpperCase()}${film.title.slice(1)}`
                )
                .join(", ")}
            </div>
          </div>
        </div>
        <div class="text-grey">
          ${planet.climate[0].toUpperCase()}${planet.climate.slice(0)}
        </div>
      </div>
      <div class="text-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="inline"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
    </div>`;
    })
    .join("\n")}`;
}
