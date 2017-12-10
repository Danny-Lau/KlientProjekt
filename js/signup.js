$(document).ready(() => {


    $("#create-user-button").click(() => {


        //Sætter parameterne til det som står i felterne
        const username = $("#inputUsername").val();
        const password = $("#inputPassword").val();

        //Tjekker om der snår noget i alle felterne
        if(!username || !password) {
            alert("Udfyld venligst alle felterne")
            //Kører opret bruger metoden
        } else {

            event.preventDefault();
            SDK.User.signup(username, password, (err, data) => {

                if (err && err.xhr.status === 401) {
                    $(".form-group").addClass("Der er fejl");
                }
                else if (err) {
                    console.log("Der skete en fejl")
                } else {
                    window.location.href = "index.html"
                }
            });
        }

    });
});