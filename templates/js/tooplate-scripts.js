const width_threshold = 480;

function drawLineChart() {
  if ($("#lineChart").length) {
    ctxLine = document.getElementById("lineChart").getContext("2d");
    optionsLine = {
      scales: {
        xAxes: [{
          scaleLabel:
         { display: true,
          labelString: "No. of contracts"
         }
        }],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "No. of days"
            }
          }
        ]
      }
    };
    console.log("Hello"+cw);
    // Set aspect ratio based on window width
    optionsLine.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    configLine = {
      type: "line",
      data: {
        labels: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"

        ],
        datasets: [

          {
            label: "Contracts Deadline",
            data: JSON.parse("["+cw+"]"),
            fill: false,
            borderColor: "rgba(255,99,132,1)",
            lineTension: 0.1
          },
          {
            label: "Predicted time of completion",
            data: JSON.parse("["+coa+"]"),
            fill: false,
            borderColor: "rgba(153, 102, 255, 1)",
            lineTension: 0.1
          }
        ]
      },
      options: optionsLine
    };

    lineChart = new Chart(ctxLine, configLine);
  }
}

function drawBarChart() {
  var data = JSON.parse("["+bar+"]")
  var data_w = [];
  var data_wt = [];
  for(var i=0;i<(data.length-1);i+=2){
    data_w.push(data[i]);
    data_wt.push(data[i+1]);
  }
  console.log("Siddhant"+data_wt)

  if ($("#barChart").length) {
    ctxBar = document.getElementById("barChart").getContext("2d");

    optionsBar = {
      responsive: true,
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Project Timeline"
            }
          }],
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "No. of Days"
            }
          }
        ]
      }
    };

    optionsBar.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    configBar = {
      type: "bar",
      data: {
        labels: ["1", "2", "3", "4"],
        datasets: [
          {
            label: "Before OAA",
            data: data_wt,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 99, 132, 0.2)"

            ],
            borderColor: [
              "rgba(255, 99, 132, 2)",
              "rgba(255, 99, 132, 2)",
              "rgba(255, 99, 132, 2)",
              "rgba(255, 99, 132, 2)",
              "rgba(255, 99, 132, 2)",
              "rgba(255, 99, 132, 2)"

            ],
            borderWidth: 1
          },
          {
            label: "After OAA",
            data: data_w,
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(54, 162, 235, 0.2)"

            ],
            borderColor: [
              "rgba(54, 162, 235, 2)",
              "rgba(54, 162, 235, 2)",
              "rgba(54, 162, 235, 2)",
              "rgba(54, 162, 235, 2)",
              "rgba(54, 162, 235, 2)",
              "rgba(54, 162, 235, 2)",

            ],
            borderWidth: 1
          }
        ]
      },
      options: optionsBar
    };

    barChart = new Chart(ctxBar, configBar);
  }
}

function drawPieChart() {
  if ($("#pieChart").length) {
    ctxPie = document.getElementById("pieChart").getContext("2d");
    optionsPie = {
      responsive: true,
      maintainAspectRatio: false
    };

    configPie = {
      type: "pie",
      data: {
        datasets: [
          {
            data: [3600,6400],
            backgroundColor: [
              window.chartColors.purple,
              window.chartColors.green
            ],
            label: "Workers"
          }
        ],
        labels: ["Used: 3,600 ", "Available: 6,400 "]
      },
      options: optionsPie
    };

    pieChart = new Chart(ctxPie, configPie);
  }
}

function updateChartOptions() {
  if ($(window).width() < width_threshold) {
    if (optionsLine) {
      optionsLine.maintainAspectRatio = false;
    }
    if (optionsBar) {
      optionsBar.maintainAspectRatio = false;
    }
  } else {
    if (optionsLine) {
      optionsLine.maintainAspectRatio = true;
    }
    if (optionsBar) {
      optionsBar.maintainAspectRatio = true;
    }
  }
}

function updateLineChart() {
  if (lineChart) {
    lineChart.options = optionsLine;
    lineChart.update();
  }
}

function updateBarChart() {
  if (barChart) {
    barChart.options = optionsBar;
    barChart.update();
  }
}

function reloadPage() {
  setTimeout(function() {
    window.location.reload();
  }); // Reload the page so that charts will display correctly
}

function drawCalendar() {
  if ($("#calendar").length) {
    $("#calendar").fullCalendar({
      height: 400,
      events: [
        {
          title: "Meeting",
          start: "2019-03-03",
          end: "2018-09-2"
        },
        {
          title: "Marketing trip",
          start: "2019-03-5",
          
        },
        {
          title: "Follow up",
          start: "2019-03-12"
        },
        {
          title: "Team",
          start: "2019-03-25"
        },
        {
          title: "Company Trip",
          start: "2018-10-25",
		  end: "2018-10-27"
        },
        {
          title: "Review",
          start: "2019-04-1"
        },
        {
          title: "Plan",
          start: "2018-11-18"
        }
      ],
      eventColor: "rgba(54, 162, 235, 0.4)"
    });
  }
}
