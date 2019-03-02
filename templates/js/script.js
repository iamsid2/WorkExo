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
            for (var i = 0; i < (formdata[0].value); i++) {
                c_oaa.push(data[i][(formdata[0].value) - 1])
            }
            console.log(cumulative_freq);
            console.log(data);
            m = formdata[0].value;
            n = formdata[1].value.length + 1;
            console.log(m);
            console.log(n);
            var myTable = "<style>";
            for (var i = 0; i < m; i++) {
                myTable += "<tr>";
                console.log("Hello");
                for (var j = 0; j < n; j++) {
                    myTable += "<td style='width: 100px; color: black;'>" + data[i][j].toFixed(2) + "</td>" ;   
                }
                myTable += "</tr>";

            }
            myTable += "</table>";
            localStorage.setItem("table", myTable);
            localStorage.setItem("c_w", cumulative_freq);
            localStorage.setItem("c_oaa", c_oaa);
            //Local Path
            var loc = window.location.pathname;
            var dir = loc.substring(0, loc.lastIndexOf('/'));
            location.href = dir + "/report.html";


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
            $("#resultpara").html("<b>The perforamance rating of the worker is:- " + data.result + "<b>");
        })
    })
    $('#regdform').submit(function (e) {
        e.preventDefault();
        console.log("clicked");
        var formdata = $('#regdform').serializeArray();
        console.log(formdata);
        $.post('http://127.0.0.1:8000/regd', formdata, function (data, status) {
            if (data == "1")
                window.alert('successfully registered');
            else
                window.alert('please try again');
        })
    })
    $('#reportspage').ready(function () {
        $.get('http://127.0.0.1:8000/dash', function (data, status) {
            console.log(data.length);
            name = '<ol class="tm-list-group tm-list-group-alternate-color tm-list-group-pad-big">'
            for (var i = 0; i < data.length; i++) {
                name += '<li class="tm-list-group-item">' + data[i].name + '</li>';
            }
            name += '</ol>'
            console.log(name);
            localStorage.setItem("name", name);
        })
    })
    $('#productspage').ready(function () {
        $.get('http://127.0.0.1:8000/prod', function (data, status) {
            console.log(data.length);
            details = '<table class="table table-hover table-striped tm-table-striped-even mt-3"id="details bootstrap_git_demo">'+'<thead>' +
                '<tr class="tm-bg-gray">' +
                '<th scope="col">&nbsp;</th>' +
                '<th scope="col">Worker Name</th>' +
                '<th scope="col" class="text-center">Phone Number</th>' +

                '<th scope="col">Skills</th>' +
                '<th scope="col">&nbsp;</th>' +
                '</tr>' +
                '</thead>' + '<tbody>'
            for (var i = 0; i < data.length; i++) {
                details += '<tr><th scope="row">' +
                    '<input type="checkbox" aria-label="Checkbox">' +
                    '</th>' + '<td class="tm-product-name">'+(i+1)+'.'+data[i].name + '</td>' +
                    '<td class="text-center">' + data[i].phone + '</td>' +
                    '<td>' + data[i].skills + '</td><td><i class="fas fa-trash-alt tm-trash-icon"></i></td></tr>'
            }
            details += '</tbody>'+'</table>'
            localStorage.setItem("details", details);
        })
    })
})