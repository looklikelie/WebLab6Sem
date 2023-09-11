window.onload = function () {
    var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart;
    document.getElementById("page-load").innerHTML = ('Page loaded in '+ loadTime.toString().bold() + 'ms');
}