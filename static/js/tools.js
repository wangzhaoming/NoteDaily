/**
 * Created by Taberna on 2015/7/18.
 */

function getHtml(url, param, elementId, callback) {
    $.ajax({
        type: "POST",
        async: "true",
        url: url,
        data: param,
        success: function (data) {
            $("#" + elementId).html(data);
            if (callback instanceof Function) {
                callback();
            }
        },
        dataType: "html"
    });
}

function fetchData(url, param, callback) {
    $.ajax({
        type: "POST",
        async: "true",
        url: url,
        data: param,
        success: function (data) {
            if (callback instanceof Function) {
                callback(data);
            }
        }
    });
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    crossDomain: false, // obviates need for sameOrigin test
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type)) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
