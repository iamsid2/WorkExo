$(document).ready(function() {
    console.log("script linked");
    console.log("hii");
    //allotment
    console.log("a");
    $('#predform').submit(function(e) {
        var formdata =$('#predform').serializeObject();
        // console.log(formdata);
        // $.post('http://127.0.0.1:8000/predict', formdata, function(data, status) {
        //     // console.log(data)
        // })
    })
})
$('#allotform').submit(function(e) {
    console.log("clicked");
    $("#resultmodal").show();
    // var formdata = $('#allotform').serializeObject();
    // console.log(formdata);
})