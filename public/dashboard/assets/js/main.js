/*
================================================
|                                              |
|               THEME ACTIONS                  |
|                                              |
================================================
*/

if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "light")
}

// var scr = document.getElementsByTagName("script")
// for (i = 0; i < scr.length; i--) {
//     // if(){
//     if (scr[i].getAttribute("id") === "swt") {
//         console.log(scr[i].src)
//         var stan
//         // setTimeout(() => {
//         //    stan = 
//         scr[i].re(scr[i])

//            console.log(stan);
           
//         // }, 3000);
//         // console.log($('html').find(scr[i]))
//     }
// }

//@Change theme
$(".theme").click(() => {
    const styles = $('link');
    var theme = localStorage.getItem("theme")
    var set
    $("body").css("opacity", 0);

    for (let i = 0; i < styles.length; i++) {
        var styHref = $(styles[i])
        var rep;
        mode = styles[i].title
        if (theme == "dark") {
            rep = styHref.attr("href").replace("dark", "light")
        } else if (theme == "light") { //
            rep = styHref.attr("href").replace("light", "dark")
        }
        styHref.attr("href", rep)
    }

    if (theme == "dark") {
        set = "light"
    } else if (theme == "light") {
        set = "dark"
    }
    console.log(set)
    setTimeout(() => {
        $("body").css("opacity", 1);
    }, 2000)
    setIcon(set)
    localStorage.setItem("theme", set)
});


function chgLocal() {
    const styles = $('link');
    var theme = localStorage.getItem("theme")
    $("body").css("opacity", 0);

    for (let i = 0; i < styles.length; i++) {
        var styHref = $(styles[i])
        var rep;
        mode = styles[i].title
        if (theme == "dark") {
            rep = styHref.attr("href").replace("light", "dark")
        } else if (theme == "light") { //
            rep = styHref.attr("href").replace("dark", "light")
        }
        styHref.attr("href", rep)
        setTimeout(() => {
            $("body").css("opacity", 1);
        }, 2000)
    }
    setIcon(theme)
};

function setIcon(theme) {
    (theme == "dark" ?
        $(".theme i").attr("class", "fa fa-moon") :
        $(".theme i").attr("class", "fa fa-sun"))
}





/*
================================================
|                                              |
|               DATE  ACTIONS                  |
|                                              |
================================================
*/


var monthNames = ["January", "February", "March", "April",
    "May", "June", "July", "August", "September", "October",
    "November", "December"
];

for (i = new Date().getFullYear(); i > 1900; i--) {
    $('#year').append($(' <option / > ').val(i).html(i));
}

for (i = 1; i <
    13; i++) {
    $('#month').append($('<option />').val( monthNames[i - 1]).html(
        // i + " " + monthNames[i - 1]));
        monthNames[i - 1]));
}
updateNumberOfDays();



$('#year, #month').on("change", function () {
    updateNumberOfDays();
});



function updateNumberOfDays() {
    $('#exampleFormControlSelect1').html('');
    month = $('#month').val();
    year = $('#year').val();
    days = daysInMonth(month, year);

    for (i = 1; i <
        days + 1; i++) {
        $('#exampleFormControlSelect1').append($(' <option / > ')
            .val(i)
            .html(i));
    }

    $('#message').html(monthNames[
            month - 1] +
        " in the year " + year + "has < b > " +
        days + " < /b> days");
}

function daysInMonth(month, year) {
    return new Date(year, month, 0)
        .getDate();
}