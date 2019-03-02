$(document).ready(function () {
    console.log("script linked");
    var m, n;
    $('#allotform').submit(function (e) {
        e.preventDefault();
        console.log("clicked");
        var formdata = $("#allotform").serializeArray();
        console.log(formdata);
        formdata[1].value = formdata[1].value.split(" ");
        formdata[2].value = formdata[2].value.split(" ");
        formdata[3].value = formdata[3].value.split(" ");
        formdata[4].value = formdata[4].value.split(" ");
        $.post('http://127.0.0.1:8000/allot', formdata, function (data, status) {
            graph = data.pop()
            cumulative_freq = data[(data.length) - 1];
            data.pop();
            console.log(cumulative_freq);
            console.log(data);
            m = formdata[0].value;
            n = formdata[1].value.length + 1;
            console.log(m);
            console.log(n);
            var myTable = "<table>";
            for (var i = 0; i < m; i++) {
                myTable += "<tr>";
                console.log("Hello");
                for (var j = 0; j < n; j++) {
                    myTable += "<td style='width: 100px; color: black;'>" + data[i][j].toFixed(2) + "</td>";
                }
                myTable += "</tr>";
            }
            myTable += "</table>";
            console.log(myTable);
            localStorage.setItem("table", myTable);
            // window.onload = function() {
            //     localStorage.setItem("table",myTable);
            // }
            location.href = "file:///home/abinash/Documents/Project/WorkExo/templates/report.html";
            //bar graph for report
            graph = int(graph)
            function drawBarChart() {
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
                            labels: ["1", "2", "3", "4", "5"],
                            datasets: [
                                {
                                    label: "Before OAA",
                                    data: [graph[0].without, graph[1].without, graph[2].without, graph[3].without, cumulative_freq[cumulative_freq.length-1]],
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
                                    data: [graph[0].with, graph[1].with, graph[2].with, graph[3].with, data[int(formdata[0].value-1)][formdata[1].value.length]],
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
            // document.getElementById('myTable').innerHTML = myTable;

        })
    })
    $('#predform').submit(function (e) {
        e.preventDefault();
        console.log("clicked");
        var formdata = $('#predform').serializeArray();
        console.log(formdata);
        $.post('http://127.0.0.1:8000/predict', formdata, function (data, status) {
            console.log(data);
            $("#resultmodal").show();
            $("#resultpara").html(data.result);
        })
    })
    $('#regdform').submit(function (e) {
        e.preventDefault();
        console.log("clicked");
        var formdata = $('#regdform').serializeArray();
        console.log(formdata);
        $.post('http://127.0.0.1:8000/regd', formdata, function (data, status) {
            console.log(data);
        })
    })
    $('#dashform').submit(function (e) {
        e.preventDefault();
        console.log("clicked");
        $.post('http://127.0.0.1:8000/dash', function (data, status) {
            console.log(data);
        })
    })
})

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