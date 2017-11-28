$(document).ready(() => {

    const user = SDK.User.current();


    $(".information").html(`
    <dl>
        <dt>Id</dt>
        <dd>${user.user_id}</dd>
        <dt>Brugernavn</dt>
        <dd>${user.username}</dd>
        <dt>Type</dt>
        <dd>${user.type}</dd>
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


