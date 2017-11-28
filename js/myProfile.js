$(document).ready(() => {


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
        window.location.href = "course.html";
    });


});


