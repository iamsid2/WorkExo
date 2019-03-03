$(document).ready(function () {
    console.log("script linked");
    var m, n, buffer = 0.12;
    var flag = 0;
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
            bar_graph = data[(data.length) - 1];
            data.pop();
            console.log(bar_graph);
            cumulative_freq = data[(data.length) - 1];
            data.pop();
            c_oaa = []
            for(var i =0;i<(formdata[0].value);i++) {
              c_oaa.push(data[i][(formdata[0].value)-1])
            }
            console.log(cumulative_freq);
            console.log("Bye"+data);
            m = formdata[0].value;
            n = formdata[1].value.length + 1;
            console.log(m);
            console.log(n);
            var myTable = "<table><tr><td style='border: 1px solid black';>Contract_No</td><td style='border: 1px solid black';>A_Starts</td><td style='border: 1px solid black';>A_Ends/ B_Starts</td><td style='border: 1px solid black';>B_Ends/ C_Starts</td><td style='border: 1px solid black';>End_of_Contract</td></tr>";
            for (var i = 0; i < m; i++) {
                myTable += "<tr><td style='border: 1px solid black';>"+(i+1)+"</td>";
                console.log("Hello");
                for (var j = 0; j < n; j++) {
                  myTable += "<td style='border: 1px solid black';>" + data[i][j].toFixed(2) + "</td>";
              }
                myTable += "</tr>";
              }
            myTable += "</table>";

            var form = "<p><b>No_of_Contracts:- </b>"+formdata[0].value+"</p> <p><b>Departments:-</b>"+formdata[1].value+"</p> <p><b>No_of_Workers_per_dept.:- </b>"+formdata[2].value+"</p><p><b>Departmental_Share:-</b>"+formdata[3].value+"</p><p><b>Duration_of_each_Contract:-</b>"+formdata[4].value+"</p>";

            if(cumulative_freq[m-1] < data[m-1][n-1]) {
              flag=1;
            }
            localStorage.setItem("table", myTable);
            localStorage.setItem("form", form);
            localStorage.setItem("c_w", cumulative_freq);
            localStorage.setItem("c_oaa", c_oaa);
            localStorage.setItem("bar", bar_graph);
            localStorage.setItem("buff", buffer);
            localStorage.setItem("flag", flag);
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
            if (data == "1")
                window.alert('successfully registered');
            else
                window.alert('please try again');
        })
    })

    $('#deptform').submit(function (e) {
        e.preventDefault();
        console.log("clicked");
        var formdata = $('#deptform').serializeArray();
        console.log(formdata);
        $.post('http://127.0.0.1:8000/department', formdata, function (data, status) {
            if (data == "1")
                window.alert('successfully registered');
            else
                window.alert('please try again');
        })
    })

    $('#reportspage').ready(function (e) {
        $.get('http://127.0.0.1:8000/dash', function (data, status) {
            name = '<ol class="tm-list-group tm-list-group-alternate-color tm-list-group-pad-big">'
            for (var i = 0; i < data.length; i++) {
                name += '<li class="tm-list-group-item">' + data[i].name + '</li>';
            }
            name += '</ol>'
            localStorage.setItem("name", name);
        })
    })
    $('#productspage').ready(function (e) {
        $.get('http://127.0.0.1:8000/prod', function (data, status) {
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
