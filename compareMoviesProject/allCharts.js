import Chart from "chart.js/auto";
import movies from "./movie-data.json";
let defaultMovies = movies;

//bar graph
const barCtx = document.getElementById("barGraphMovies");

const domesticGross = defaultMovies.map((movie) => movie.domestic);
const titleMovie = defaultMovies.map((movieTitle) => movieTitle.title);

new Chart(barCtx, {
  type: "bar",
  data: {
    labels: titleMovie,
    datasets: [
      {
        label: "Domestic Gross",
        data: domesticGross,
        backgroundColor: "rgb(57,106,143)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      x: {
        display: true, // Display the x-axis
        grid: {
          display: true, // Display the x-axis grid lines
        },
      },
      y: {
        beginAtZero: true,
        display: true, // Display the y-axis
        grid: {
          display: true, // Display the y-axis grid lines
        },
      },
    },
  },
});

//pie chart
const pieCtx = document.getElementById("pieChartMovies");

//adding up all sales for each catagory
const eachtotal = {};

defaultMovies.forEach((movie) => {
  const genre = movie.genre;
  const gross = movie.domestic;

  if (eachtotal[genre]) {
    eachtotal[genre] += gross;
  } else {
    eachtotal[genre] = gross;
  }
});

const totalGenres = Object.keys(eachtotal);
const totalGross = Object.values(eachtotal);

new Chart(pieCtx, {
  type: "doughnut",
  data: {
    labels: totalGenres,
    datasets: [
      {
        data: totalGross,
        backgroundColor: [
          "red",
          "blue",
          "green",
          "orange",
          "purple",
          "pink",
          "cyan",
          "magenta",
          "yellow",
          "lime",
          "gray",
          "brown",
        ],
      },
    ],
  },
});

//scatter plot chart

//get all plot data
const scatterData = defaultMovies.map((movie) => ({
  x: [movie.criticScore, movie.audienceScore],
  y: movie.domestic,
  title: movie.title,
}));

const scatterCtx = document.getElementById("scatterPlotMovies");

new Chart(scatterCtx, {
  type: 'scatter',
    data: {
        datasets: [
            {
                label: 'Domestic Gross',
                data: scatterData,
                pointBackgroundColor: 'rgba(75, 192, 192, 0.5)',
                pointBorderColor: 'rgba(75, 192, 192, 1)',
                pointRadius: 6,
                pointHoverRadius: 8,
                showLine: false,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Critic Score / Audience Score',
                },
            },
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Domestic Gross',
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    title: (context) => scatterData[context[0].dataIndex].title,
                    label: (context) => {
                        const data = scatterData[context.dataIndex];
                        return `Critic Score: ${data.x[0]}, Audience Score: ${data.x[1]}<br>Domestic Gross: $${data.y.toLocaleString()}`;
                    },
                },
            },
        },
    },
});
