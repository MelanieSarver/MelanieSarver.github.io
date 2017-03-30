/**
 * @author Created by mel on 3/30/17.
 */

(function () {
    "use strict";
    var posts = $.get("data/blog.json");
    var postArray = [];

//Takes json data and populates html
    function populate(object, index) {
        return '<a class="hidden-link" id="' + index + '">'
            + '</a><h3>' + object.title
            + '</h3><button class="btn btn-xs glyphicon glyphicon-trash"></button>'
            + '<p>' + object.content
            + '</p><p>' + object.categories.join(', ')
            + '</p><p>' + object.date
            + '</p>';
    }

//Takes json data, pushes it to postArray, and writes populated html to #posts
    posts.done(function (data) {
        var newPost = "";
        data.forEach(function (object, index) {
            postArray.push(object);
            newPost += populate(object, index);
        });
        $('#posts').html(newPost);
    });

//Checks ajax for functionality
    posts.fail(function () {
        console.log("something went wrong");
    });
    posts.always(function () {
        console.log("hopefully something worked");
    });

//Create sidebar links
    posts.done(function (data) {
        var sideBar = "";
        data.forEach(function (object, index) {
            sideBar += '<a href="#' + index + '">' + object.title
                + '</h5><h6>' + object.date
                + '</h6></a>';
        });
        $('#side-bar').html(sideBar);
    });

//Generate form when user is logged in
    var userInfo = {
        uname: "Schnauzer",
        pass: "blog"
    };

    $('#submit-login').click(function (event) {
        event.preventDefault();
        var loginInfo = {
            uname: $('#uname').val(),
            pass: $('#pass').val()
        };

        if (userInfo.uname === loginInfo.uname && userInfo.pass === loginInfo.pass) {
            $('#blog-form').html('<form id="blog-form"><p class="form-group"><label for="title">'
                + 'Title' + '</label><input id="title" class="form-control" name="title" type="text"></p><textarea id="content" class="form-control" placeholder="Tell the world!"></textarea><p class="form-group"><label for="categories">'
                + 'Keywords' + '</label><input id="categories" class="form-control" name="categories" type="text"></p><p class="form-group"><a id="new-post" class="btn btn-primary">'
                + 'Submit' + '</a></p>');
        }
        $(this).parent().parent().toggle();

//Get info from new blog post and redraw #posts
        $('#new-post').click(function (event) {
            event.preventDefault();
            var addPost = {
                title: $('#title').val(),
                content: $('#content').val(),
                categories: $('#categories').val().split(", "),
                date: new Date()
            };
            console.log(addPost);
            postArray.push(addPost);
            var newPost = [];
            postArray.forEach(function (object, index) {
                console.log(object);
                newPost += populate(object, index);
            });
            $('#posts').html(newPost);
            clear();
        });
    });

//Clear #blog-form after submitting
    var clear = function() {
        $('#title').val("");
        $('#content').val("");
        $('#categories').val("");
    };
})();
