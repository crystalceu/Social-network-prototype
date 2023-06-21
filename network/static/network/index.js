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
    if (document.querySelector("div.create-post") != null) {
        create_post(document.querySelector("div.create-post"));
    }

    if (document.querySelector("button#follow-user")) {
        document.querySelector("button#follow-user").addEventListener('click', (event) => {
            let cc = Number(document.querySelector("a#followers-counter").innerHTML);
            console.log(Number(cc));
            if (document.querySelector("a#follower-status").innerHTML === "Follow") {
                follow_user(document.querySelector("p#username").outerText);
            }
            else if(document.querySelector("a#follower-status").innerHTML === "Unfollow") {
                unfollow_user(document.querySelector("p#username").outerText);
            }
        });
    }

    if (document.querySelector("input#settings-username")) {
        document.querySelector("input#settings-image").addEventListener('change', (event) => {
            console.log('change button was clicked');
            image = document.querySelector("input#settings-image").files[0];
            change_userpic(image);
        });
        document.addEventListener("keyup", function(event) {
            if (event.code === 'Enter') {
                if (document.querySelector("input#settings-username").disabled == false) {
                    document.querySelector("input#settings-username").disabled = true;
                    console.log(document.querySelector("input#settings-username").value);
                    change_username(document.querySelector("input#settings-username").value);
                }
                else if (document.querySelector("input#settings-email").disabled == false) {
                    document.querySelector("input#settings-email").disabled = true;
                    console.log(document.querySelector("input#settings-email").value);
                    change_email(document.querySelector("input#settings-email").value);
                }
            }
        });
        document.querySelector("div#settings").addEventListener('click', (event) => {
            if (event.target == document.querySelector("input#settings-username") && document.querySelector("input#settings-username").disabled) {
                document.querySelector("input#settings-username").disabled = false;
                document.querySelector("input#settings-username").focus();    
            }
            else if (event.target == document.querySelector("input#settings-email") && document.querySelector("input#settings-email").disabled) {
                document.querySelector("input#settings-email").disabled = false;
                document.querySelector("input#settings-email").focus();
            }
            else if (event.target != document.querySelector("input#settings-username") && event.target != document.querySelector("input#settings-email")) {
                if (document.querySelector("input#settings-username").disabled == false) {
                    document.querySelector("input#settings-username").disabled = true;
                    console.log(document.querySelector("input#settings-username").value);
                    change_username(document.querySelector("input#settings-username").value);
                }
                else if (document.querySelector("input#settings-email").disabled == false) {
                    document.querySelector("input#settings-email").disabled = true;
                    console.log(document.querySelector("input#settings-email").value);
                    change_email(document.querySelector("input#settings-email").value);
                }
            }
        });
        document.querySelector("button.change-password-btn").addEventListener('click', (event) => {
            document.querySelector("tr#cur-pas").hidden = false;
        })
        document.querySelector("button.apply-cur-pass").addEventListener('click', (event) => {
            change_password_cur_pass(document.querySelector("input#input-cur-pass").value);
            //document.querySelector("tr#cur-pas").hidden = true;
            //document.querySelector("tr#new-pas").hidden = false;
        });
        document.querySelector("button.confirm-conf-pass").addEventListener('click', (event) => {
            change_password_new_pass(document.querySelector("input#input-new-pass").value, document.querySelector("input#input-conf-pass").value);
            //document.querySelector("tr#new-pas").hidden = true;
            //document.querySelector("tr#conf-pas").hidden = false;
        });
    }
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

function show_options(post_data) {
    if (document.querySelector(`#post-${post_data}`).querySelector(`#options-menu`).style.display === 'none') {
        document.querySelector(`#post-${post_data}`).querySelector(`#options-menu`).style.display = 'flex';
        document.querySelector(`#post-${post_data}`).querySelector(`#options-menu`).style.flexDirection = 'column';
        //document.querySelector(`#options-menu-${post_data}`).style.height = '0';
    }
    else {
        document.querySelector(`#post-${post_data}`).querySelector(`#options-menu`).style.display = 'none';
    }
}

function show_edit_post(post_data) {
    if (document.querySelector(`#post-${post_data}`).querySelector('#post-content').style.display === 'none') {
        document.querySelector(`#post-${post_data}`).querySelector('#post-content').style.display = 'block';
        document.querySelector(`#post-${post_data}`).querySelector('#post-content-edit').style.display = 'none';
    }
    else {
        document.querySelector(`#post-${post_data}`).querySelector(`#options-menu`).style.display = 'none';
        document.querySelector(`#post-${post_data}`).querySelector('#post-content').style.display = 'none';
        document.querySelector(`#post-${post_data}`).querySelector('#post-content-edit').style.display = 'block';
    }
}

function edit_post(post_data) {
    document.querySelector(`#post-${post_data}`).querySelector('#post-content').querySelector('a').innerHTML = document.querySelector(`#post-${post_data}`).querySelector('#post-content-edit').querySelector('input').value;
    document.querySelector(`#post-${post_data}`).querySelector('#post-content').style.display = 'block';
    document.querySelector(`#post-${post_data}`).querySelector('#post-content-edit').style.display = 'none';
    let csrftoken = getCookie('csrftoken');
    fetch(`/edit/post/${post_data}`, {
        method: "PUT",
        body: JSON.stringify({
            post_new_version: document.querySelector(`#post-${post_data}`).querySelector('#post-content-edit').querySelector('input').value
        }),
        headers: {"X-CSRFToken": csrftoken}
    })
    .then(async(response) => {
        if (response.status === 201) {
            document.querySelector(`#post-${post_data}`).querySelector(`#options-menu`).style.display = 'none';
            console.log(`post id: ${post_data} was editted`);
        }
        //location.reload();
    })
    .catch(error => {
        alert(error);
        location.reload();
    })
}

function delete_post(post_data) {
    let csrftoken = getCookie('csrftoken');
    fetch(`/delete_post/${post_data}`, {
        method: "PUT",
        body: JSON.stringify({
            post_id: post_data
        }),
        headers: {"X-CSRFToken": csrftoken}
    })
    .then(async(response) => {
        if (response.status === 201) {
            console.log(`post id: ${post_data} was deleted`);
        }
        location.reload(true);
    })
    .catch(error => {
        alert(error);
        location.reload();
    })
    return true;
}

function create_post(post_data) {
    let element = post_data.querySelector('#create-post-btn');
    element.addEventListener('click', (event) => {
        let csrftoken = getCookie('csrftoken');
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
        let csrftoken = getCookie('csrftoken');
        fetch(`/like_post/${post_data}`, {
            method: "PUT",
            body: JSON.stringify({
                post_id: post_data
            }),
            headers: {"X-CSRFToken": csrftoken}
        })
        .then(async(response) => {
            if (response.status === 201) {
                console.log(`post id: ${post_data} like button was clicked`);
            }
            if (document.querySelector(`#post-${post_data}`).querySelector(`#like-button`).querySelector('img').getAttribute('src') === '/static/network/like-clicked-light.png') {
                document.querySelector(`#post-${post_data}`).querySelector(`#like-button`).querySelector('img').src = '/static/network/like-empty-light.png';
                let counter = Number(document.querySelector(`#post-${post_data}`).querySelector(`a#like-counter`).innerHTML) - 1;
                document.querySelector(`#post-${post_data}`).querySelector(`a#like-counter`).innerHTML = counter;
            }
            else if (document.querySelector(`#post-${post_data}`).querySelector(`#like-button`).querySelector('img').getAttribute('src') === '/static/network/like-empty-light.png') {
                document.querySelector(`#post-${post_data}`).querySelector(`#like-button`).querySelector('img').src = '/static/network/like-clicked-light.png';
                let counter = Number(document.querySelector(`#post-${post_data}`).querySelector(`a#like-counter`).innerHTML) + 1;
                document.querySelector(`#post-${post_data}`).querySelector(`a#like-counter`).innerHTML = counter;
            }
        })
        .catch(error => {
            alert(error);
        })
    //})
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
            document.querySelector("a#follower-status").innerHTML = "Unfollow";
            let counter = Number(document.querySelector("a#followers-counter").innerHTML) + 1;
            document.querySelector("a#followers-counter").innerHTML = counter;
            console.log(`you have followed ${username} successfully`);
        }
    })
    .catch(error => {
        alert(error);
        location.reload();
    })
}

function unfollow_user(username) {
    let csrftoken = getCookie('csrftoken');
    fetch(`/unfollow_user/${username}`, {
        method: "PUT",
        body: JSON.stringify({
            username: username
        }),
        headers: {"X-CSRFToken": csrftoken}
    })
    .then(async(response) => {
        if (response.status === 201) {
            document.querySelector("a#follower-status").innerHTML = "Follow";
            let counter = Number(document.querySelector("a#followers-counter").innerHTML) - 1;
            document.querySelector("a#followers-counter").innerHTML = counter;
            console.log(`you have unfollowed ${username} successfully`);
        }
    })
    .catch(error => {
        alert(error);
        location.reload();
    })
}

function change_username(username) {
    let csrftoken = getCookie('csrftoken');
    fetch(`/settings/username`, {    
        method: "PUT",
        body: JSON.stringify({
            username: username
        }),
        headers: {"X-CSRFToken": csrftoken}
    })
    .then(async(response) => {
        if (response.status === 201) {
            console.log(`new username: ${username} was editted`);
        }
        location.reload();
    })
    .catch(error => {
        alert(error);
        location.reload();
    })
}

function change_email(email) {
    let csrftoken = getCookie('csrftoken');
    fetch(`/settings/email`, {
        method: "PUT",
        body: JSON.stringify({
            email: email
        }),
        headers: {"X-CSRFToken": csrftoken}
    })
    .then(async(response) => {
        if (response.status === 201) {
            console.log(`new email: ${email} was editted`);
        }
        location.reload();
    })
    .catch(error => {
        alert(error);
        location.reload();
    })
}

function change_userpic(image) {
    let csrftoken = getCookie('csrftoken');
    let form = new FormData();
    form.append('file', image, 'user-file.jpg');
    form.append('X-CSRFToken', JSON.stringify(csrftoken));
    
    fetch(`/settings/image`, {
        method: "POST",
        body: form,
        headers: {"X-CSRFToken": csrftoken}
    })
    .then(async(response) => {
        if (response.status === 201) {
            console.log(`new image: ${image} was editted`);
        }
        location.reload(true);
    })
    .catch(error => {
        alert(error);
        location.reload();
    })
}

function change_password_cur_pass(password) {
    let csrftoken = getCookie('csrftoken');
    fetch(`/settings/password`, {
        method: "POST",
        body: JSON.stringify({ 
            password_type: 'cur_pass',
            password: password
        }),
        headers: {"X-CSRFToken": csrftoken}
    })
    .then(async(response) => {
        if (response.status === 201) {
            console.log(`current password ist correct`);
            document.querySelector("tr#cur-pas").hidden = true;
            document.querySelector("tr#new-pas").hidden = false;
            document.querySelector("tr#conf-pas").hidden = false;
        }
        else if (response.status === 403) {
            console.log(`current password isn't correct`);
            document.querySelector("input#input-cur-pass").value = '';
        }
    })
    .catch(error => {
        alert(error);
    })
}

function change_password_new_pass(new_password, conf_password) {
    let csrftoken = getCookie('csrftoken');
    fetch(`/settings/password`, {
        method: "POST",
        body: JSON.stringify({
            password_type: 'new_pass',
            new_password: new_password,
            conf_password: conf_password
        }),
        headers: {"X-CSRFToken": csrftoken}
    })
    .then(async(response) => {
        if (response.status === 201) {
            console.log(`new password was entered`);
            document.querySelector("tr#new-pas").hidden = true;
            document.querySelector("tr#conf-pas").hidden = true;
        }
        else if (response.status === 403) {
            console.log(`passwords don't match`);
            document.querySelector("input#input-new-pass").value = '';
            document.querySelector("input#input-conf-pass").value= '';
        }
    })
    .catch(error => {
        alert(error);
    })
}