$(document).ready(function () {
    console.log("script linked");
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
            console.log(data);
        })
    })
    $('#predform').submit(function (e) {
        var formdata = $('#predform').serializeObject();
        // console.log(formdata);
        // $.post('http://127.0.0.1:8000/predict', formdata, function(data, status) {
        //     // console.log(data)
        // })
    })
})