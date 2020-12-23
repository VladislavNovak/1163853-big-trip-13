import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const renderChart = (ctx, preparedData) => {
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: preparedData.collector.map(({emoji, type}) => `${emoji} ${type}`),
      datasets: [{
        data: preparedData.collector.map(({accumulate}) => accumulate),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 14
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: preparedData.format
        }
      },
      title: {
        display: true,
        text: preparedData.header,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};
