// Default

$('.default').click(function () {
    Snackbar.show({ text: 'Example notification text.', duration: 100000 });
});



// Click Callback
$('.click-callback').click(function () {
    Snackbar.show({
        text: 'Custom callback when action button is clicked.',
        width: 'auto',
        onActionClick: function (element) {
            //Set opacity of element to 0 to close Snackbar 
            $(element).css('opacity', 0);
            Snackbar.show({
                text: 'Thanks for clicking the  <strong>Dismiss</strong>  button!',
                showActionButton: false
            });
        }
    });
});

// Duration
function snackResponse(response, textColor, bkgColor, position) {
    Snackbar.show({
        text: response,
        actionTextColor: textColor,
        backgroundColor: bkgColor,
        duration: 5000,
        showAction: false
        // pos: position
    });

}

// pos: top-screenLeft, top-RTCIceGatherer, bottom-screenLeft, bottom-right

// Custom Background
