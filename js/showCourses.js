$(document).ready(() => {

    const currentUser = SDK.User.current();
    const userId = currentUser.userId;

    $(".courseInfo").html(`

    <table class = "table">
        <tr>
            <tr>   
                <th>ID</th>
                <th>Fag</th>
                <th>Vælg</th>
            </tr>
            
            </tr>
                <td>${SDK.Storage.load("courseId")}</td>
                <td>${SDK.Storage.load("courseTitle")}</td>
                <td><Button>vælg</Button></td>
            </tr>
        </Tread>
     </table>
  `);


    $("#logout-button").click(() => {
        SDK.User.logout(userId, (err,data) => {
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
