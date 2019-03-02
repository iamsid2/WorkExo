$(document).ready(function () {
    console.log("script linked");
    var m,n;
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
            cumulative_freq = data[(data.length)-1];
            data.pop();
            console.log(cumulative_freq);
            console.log(data);
            m = formdata[0].value;
            n = formdata[1].value.length + 1;
            console.log(m);
            console.log(n);
            var myTable = "<table>";
            for (var i = 0; i < m; i++) {
                myTable +="<tr>";
                console.log("Hello");
                for (var j = 0; j < n; j++) {
                        myTable += "<td style='width: 100px; color: black;'>" + data[i][j].toFixed(2) + "</td>";
                        }
                myTable +="</tr>";
            }
            myTable += "</table>";
            console.log(myTable);
            localStorage.setItem("table", myTable);
            // window.onload = function() {
            //     localStorage.setItem("table",myTable);
            // }
            location.href="file:///home/abinash/Documents/Project/WorkExo/templates/report.html";
            // document.getElementById('myTable').innerHTML = myTable;

        })
    })
    $('#predform').submit(function (e) {
        e.preventDefault();
        console.log("clicked");
        var formdata = $('#predform').serializeArray();
        console.log(formdata);
        $.post('http://127.0.0.1:8000/predict', formdata, function(data, status) {
            console.log(data);
            $("#resultmodal").show();
            $("#resultpara").html(data.result);
        })
    })
})
