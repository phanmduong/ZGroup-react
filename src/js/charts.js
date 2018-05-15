/**
 * Created by Phan M Duong on 12/25/2016.
 */
export function barChartSingleLine(id, labels, data) {
  let chartColor = "#E873A6";
  let barChartContext = $(id).get(0).getContext("2d");
  let dataBarChart = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        fillColor: chartColor,
        strokeColor: chartColor,
        highlightFill: chartColor,
        highlightStroke: chartColor,
        data: data
      }
    ]
  };

  new Chart(barChartContext).Bar(dataBarChart);// eslint-disable-line
}

export function barChartDoubleLine(id, labels, data1, data2) {
  let firstBarChart = "#7CABFF";
  let secondBarChart = "#E873A6";

  let barChartContext = $(id).get(0).getContext("2d");
  let dataBarChart = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        fillColor: firstBarChart,
        strokeColor: firstBarChart,
        highlightFill: firstBarChart,
        highlightStroke: firstBarChart,
        data: data1
      },
      {
        label: "My Second dataset",
        fillColor: secondBarChart,
        strokeColor: secondBarChart,
        highlightFill: secondBarChart,
        highlightStroke: secondBarChart,
        data: data2
      }
    ]
  };

  new Chart(barChartContext).Bar(dataBarChart); // eslint-disable-line
}

export function lineChart(id, labels, data) {
  let chartColor = "#7CABFF";
  let moneyByDateLineChartContext = $(id).get(0).getContext("2d");
  let moneyByDateLineChartData = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        fillColor: chartColor,
        strokeColor: chartColor,
        pointColor: chartColor,
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: chartColor,
        data: data
      }
    ]
  };

  new Chart(moneyByDateLineChartContext).Line(moneyByDateLineChartData);// eslint-disable-line
}
export function pieChart(id) {
  let pieChartContext = $(id).get(0).getContext("2d");
  let dataChart = [
    {
      value: 300,
      color: "#F7464A",
      highlight: "#FF5A5E",
      label: "Red"
    },
    {
      value: 50,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: "Green"
    },
    {
      value: 100,
      color: "#FDB45C",
      highlight: "#FFC870",
      label: "Yellow"
    }
  ];

  new Chart(pieChartContext) // eslint-disable-line
    .Pie(dataChart, {
      animateRotate: false
    });
}
