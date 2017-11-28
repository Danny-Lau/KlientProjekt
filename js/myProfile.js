$(document).ready(() => {

    const user = SDK.User.current();



    $(".information").html(`
    <dl>
      / <dt>Id</dt>
        <dd>${SDK.Storage.load("userId")}</dd>
        
        <dt>Brugernavn</dt>
        <dd>${SDK.Storage.load("username")}</dd>
        
        <dt>Type</dt>
        <dd>${SDK.Storage.load("type")}</dd>
     </dl>
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


