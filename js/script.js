/**
 * Created by Amaster on 11/20/2015.
 */
$(document).ready(function () {

    //load header & footer
    $("#header").load("header.html");
    $("#footer").load("footer.html");

    //onMouseOver
    $(".img_store").mouseover(function () {
        $(this).fadeTo("fast", 0.5, function () {
            // Animation complete.
        });
    });
    //onMouseout
    $(".img_store").mouseout(function () {
        $(this).fadeTo("fast", 1, function () {
            // Animation complete.
        });
    });

    //footer
    $.ajax({
        url: "http://httpbin.org/get"
    }).done(function (data) {
        $("#ip").html("Your IP address: " + data.origin);
    });

    //get images from Flickr
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    $.getJSON(flickerAPI, {
        tags: "vietnam",
        tagmode: "any",
        format: "json"
    }).done(function (data) {
        $.each(data.items, function (i, item) {
            var div = $("<div></div>");
            div.addClass("item");
            div.css("background-image", "url(" + item.media.m + ")");
            var title = $("<p></p>").text(item.title);
            title.addClass("centered");
            title.hide();
            title.appendTo(div);
            div.on("mouseover", function () {
                title.fadeIn("fast", function () {
                })
            });
            div.on("mouseout", function () {
                title.hide();
            });
            var gallery = $("#gallery");
            gallery.append(div);

        });
    });

    //contact form
    $("#submit").on("click", function () {
        $("#result").empty();
        var name = $("#yourName");
        var email = $("#email");
        var country = $("#country");
        var student = $('input:radio[name=student]:checked');
        var message = $("#message");

        var valid = true;
        if (name.val() == "") {
            valid = false;
            name.css("border-color", "red");
        } else {
            name.css("border-color", "white");
        }
        if (!validateEmail(email.val())) {
            valid = false;
            email.css("border-color", "red");
        } else {
            email.css("border-color", "white");
        }

        if (country.val() == "") {
            valid = false;
            country.css("border-color", "red");
        } else {
            country.css("border-color", "white");
        }

        if (valid) {
            var serializedData = $("form").serialize();
            console.log(serializedData);
            $.ajax({
                type: "POST",
                url: "https://httpbin.org/post",
                data: serializedData
            }).done(function (serverPostResponse) {
                var name = serverPostResponse.form.name;
                $("#result").append("<p>Name: " + name + "</p>");
                var email = serverPostResponse.form.email;
                $("#result").append("<p>Email: " + email + "</p>");
                var country = serverPostResponse.form.country;
                $("#result").append("<p>Country: " + country + "</p>");
                var student = serverPostResponse.form.student;
                $("#result").append("<p>Student: " + student + "</p>");
                var message = serverPostResponse.form.message;
                $("#result").append("<p>Message: " + message + "</p>");
                $("form").trigger('reset');
            });

        }
    });

    //local storage
    var name = localStorage.getItem("name");
    if (name == null) {
        localStorage.setItem("name", "Andy Nguyen");
    }
    var course = localStorage.getItem("course");
    if (course == null) {
        localStorage.setItem("course", "Adv Website Design & Mgmt");
    }

    $("#info").hide();
    var isShowing = false;
    $("#showInfo").on('click', function () {
        $("#info").empty();
        var name = localStorage.getItem("name");
        var course = localStorage.getItem("course");
        $("#info").append("<h3>Name: " + name + "</h3>");
        $("#info").append("<h3>Course: " + course+ "</h3>");
        if (isShowing) {
            $("#info").hide(1000);
            isShowing=  false;
            $("#showInfo").text("Show your information");
        } else {
            $("#info").show(1000);
            isShowing=  true;
            $("#showInfo").text("Hide your information");
        }

    });
});

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}