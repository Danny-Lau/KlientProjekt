$(document).ready(() => {

    const userId = SDK.Storage.load("userId");
   // const userId = currentUser.userId;

    SDK.User.loadUser((err, data) => {

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
                <td>${SDK.Storage.load("type")}</td>
            </tr>
        </Tread>
     </table>
  `);
    });

    $("#logout-button").click(() => {

        const userId = SDK.Storage.load("userId");
        SDK.User.logout(userId, (err) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("Der opstod en fejl");
            }
            else {
                window.location.href = "index.html";
                SDK.Storage.remove("token");
                SDK.Storage.remove("userId");
                SDK.Storage.remove("username");
                SDK.Storage.remove("type");
            }
        });

    });
});
