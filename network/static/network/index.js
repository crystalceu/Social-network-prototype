function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
       var c = ca[i];
       while (c.charAt(0)==' ') c = c.substring(1);
       if(c.indexOf(name) == 0)
          return c.substring(name.length,c.length);
    }
    return "";
}

document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll("div.post").forEach((post_data) => {
        if (post_data.querySelector('.edit_post') != null) {
            edit_post(post_data);
            delete_post(post_data);
        }
        update_like_counter(post_data);
    });
    if (document.querySelector("div.create-post") != null) {
        create_post(document.querySelector("div.create-post"));
    }
    /*if (document.querySelector("button#load-next-page") != null) {
        load_posts('next');
    }
    if (document.querySelector("button#load-previous-page") != null) {
        load_posts('previous');
    }*/
    document.querySelectorAll("div#post-options").forEach((post_data) => {
        console.log('post-options-btn ist hier');
        post_data.querySelector("#post-options-btn").addEventListener('click', (event) => {
            if (post_data.querySelector("#post-options-menu").style.display === 'none') {
                post_data.querySelector("#post-options-menu").style.display = 'flex';
                post_data.querySelector("#post-options-menu").style.flexDirection = 'column';
                post_data.querySelector("#post-options-menu").style.height = '0';
            }
            else {
                post_data.querySelector("#post-options-menu").style.display = 'none';
                post_data.querySelector("#post-options-menu").style.height = '0';
            }
        })
    });
    document.querySelector("button#follow-user").addEventListener('click', (event) => {
        follow_user(document.querySelector("p#username").outerText);
    })
});
/*
function load_posts(destination) {
    let element = '';
    let pad = 1;
    if (destination === 'next') {
        element = document.querySelector("button#load-next-page");
        pad = Number(1);
    }
    else {
        element = document.querySelector("button#load-previous-page");
        pad = Number(-1);
    }

    element.addEventListener(('click'), (event) => {
        page_number = Number(document.querySelector("#page-number").value) + pad;

        fetch(`/${page_number}`)
        .then(async(response) => {
            if (response.status === 201) {
                console.log(`page number ${page_number + sum} was loaded`);
            }
        })
        .catch(error => {
            alert(error);
            location.reload();
        })
    })
}*/

function edit_post(post_data) {
    let element = post_data.querySelector('.edit_post');
    // console.log(post_data.querySelector('.username').innerHTML);
    // console.log(post_data.querySelector('#post-content').outerText);
    element.addEventListener('click', (event) => {
        if (post_data.querySelector('#post-content').style.display === 'none') {
            post_data.querySelector('#post-content').style.display = 'block';
            post_data.querySelector('#post-content-edit').style.display = 'none';
        }
        else {
            post_data.querySelector('#post-content').style.display = 'none';
            post_data.querySelector('#post-content-edit').style.display = 'block';
        }

        let element1 = post_data.querySelector('#save-editted');
        element1.addEventListener('click', (event) => {
            post_data.querySelector('#post-content').querySelector('a').outerText = post_data.querySelector('#post-content-edit').querySelector('input').value;
            post_data.querySelector('#post-content').style.display = 'block';
            post_data.querySelector('#post-content-edit').style.display = 'none';
            let csrftoken = getCookie('csrftoken');
            console.log(csrftoken);
            fetch(`/edit/post/${post_data.querySelector('#id').value}`, {
                method: "PUT",
                body: JSON.stringify({
                    post_new_version: post_data.querySelector('#post-content-edit').querySelector('input').value
                }),
                headers: {"X-CSRFToken": csrftoken}
            })
            .then(async(response) => {
                if (response.status === 201) {
                    console.log(`post id: ${post_data.querySelector('#id').value} was editted`);
                }
                location.reload();
            })
            .catch(error => {
                alert(error);
                location.reload();
            })
        })
    });
}

function delete_post(post_data) {
    let element = post_data.querySelector('.delete_post');
    element.addEventListener('click', (event) => {
        let csrftoken = getCookie('csrftoken');
        fetch(`/delete_post/${post_data.querySelector('#id').value}`, {
            method: "PUT",
            body: JSON.stringify({
                post_id: post_data.querySelector('#id').value
            }),
            headers: {"X-CSRFToken": csrftoken}
        })
        .then(async(response) => {
            if (response.status === 201) {
                console.log(`post id: ${post_data.querySelector('#id').value} was deleted`);
            }
            location.reload(true);
        })
        .catch(error => {
            alert(error);
            location.reload();
        })
    })
    return true;
}

function create_post(post_data) {
    let element = post_data.querySelector('#create-post-btn');
    element.addEventListener('click', (event) => {
        let csrftoken = getCookie('csrftoken');
        console.log(csrftoken);
        fetch(`/create_post/${post_data.querySelector('input#username').value}`, {
            method: "PUT",
            body: JSON.stringify({
                username: post_data.querySelector('input#username').value,
                content: post_data.querySelector('textarea').value
            }),
            headers: {"X-CSRFToken": csrftoken}
        })
        .then(async(response) => {
            if (response.status === 201) {
                post_data.querySelector('textarea').value = '';
                console.log(`post was created`);
            }
            location.reload(true);
        })
        .catch(error => {
            alert(error);
            location.reload();
        })
    })
    return true;
}

function update_like_counter(post_data) {
    return true;
}

function follow_user(username) {
    let csrftoken = getCookie('csrftoken');
    fetch(`/follow_user/${username}`, {
        method: "PUT",
        body: JSON.stringify({
            username: username
        }),
        headers: {"X-CSRFToken": csrftoken}
    })
    .then(async(response) => {
        if (response.status === 201) {
            console.log(`you have followed ${username} successfully`);
        }
    })
    .catch(error => {
        alert(error);
        location.reload();
    })
}