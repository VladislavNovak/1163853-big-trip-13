import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const renderChart = (ctx, preparedData) => {
  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: preparedData.collector.map(({emoji, type}) => `${type} ${emoji}`),
      datasets: [{
        data: preparedData.collector.map(({accumulate}) => accumulate),
        backgroundColor: preparedData.collector.map(({color}) => color),
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50
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
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: true,
      }
    }
  });
};
