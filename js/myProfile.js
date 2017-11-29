$(document).ready(() => {

    const currentUser = SDK.User.current();
    const userId = currentUser.userId;

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


    $("#my-profile-button").click(() => {
        window.location.href = "myProfile.html";
    });

    $("#quiz-button").click(() => {
        window.location.href = "quiz.html";
    });

    $("#course-button").click(() => {
        SDK.Course((err, data) =>{
            window.location.href = "showCourses.html";
        });
    });

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
