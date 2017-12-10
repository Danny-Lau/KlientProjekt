$(document).ready(() => {

    //Henter brugeroplysningerne ned. Oplysninger bliver sat ind i tabellen senere
    SDK.User.loadUser(() => {
        const type =SDK.Storage.load("type");

        if(type == 1) {

            $(".information").html(`

                <table class = "table">
                <tr>
                    <tr>   
                        <th>ID</th>
                        <th>Brugernavn</th>
                        <th>Type</th>
                    </tr>
            
                    </tr>
                        <td>${SDK.Storage.load("userId")}</td>
                        <td>${SDK.Storage.load("username")}</td>
                        <td>Administrator</td>
                </tr>
                </Tread>
                </table>
            `);

        } else {
            $(".information").html(`

                <table class = "table">
                <tr>
                    <tr>   
                        <th>ID</th>
                        <th>Brugernavn</th>
                        <th>Type</th>
                    </tr>
            
                    </tr>
                        <td>${SDK.Storage.load("userId")}</td>
                        <td>${SDK.Storage.load("username")}</td>
                        <td>Normal bruger</td>
                </tr>
                </Tread>
                </table>
            `);

        }
    });

    //klik på logout
    $("#logout-button").click(() => {

        const userId = SDK.Storage.load("userId");
        SDK.User.logout(userId, (err) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("Der opstod en fejl");
            }
            else {
                //brugeren bliver sendt til forsiden. og oplysningerne bliver slettet fra local storage
                window.location.href = "index.html";
                SDK.Storage.remove("token");
                SDK.Storage.remove("userId");
                SDK.Storage.remove("username");
                SDK.Storage.remove("type");
            }
        });

    });
});
