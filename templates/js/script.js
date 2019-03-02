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
            console.log(graph);
            cumulative_freq = data[(data.length) - 1];
            data.pop();
            c_oaa = []
            for(var i =0;i<(formdata[0].value);i++) {
              c_oaa.push(data[i][(formdata[0].value)-1])
            }
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
            localStorage.setItem("table", myTable);
            localStorage.setItem("c_w", cumulative_freq);
            localStorage.setItem("c_oaa", c_oaa);
            //Local Path
            var loc = window.location.pathname;
            var dir = loc.substring(0,loc.lastIndexOf('/'));
            location.href= dir+"/report.html";


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
            $("#resultpara").html("<b>The perforamance rating of the worker is:- "+data.result+"<b>");
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
