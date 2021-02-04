//jshint esversion:6

$(document).ready(() => {

    $("#signup").hide();
    $("#reset").hide();

    $(".tog").on("click", () => {
        $("#signin").slideToggle();
        $("#signup").slideToggle();
    })

    $(".togg").on("click", () => {
        $("#signin").slideToggle();
        $("#reset").slideToggle();
    })





})