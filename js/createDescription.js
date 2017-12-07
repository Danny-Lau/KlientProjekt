$(document).ready(() => {

    $("#continue-button").click(() => {

        const createdBy = SDK.Storage.load("username");
        const questionCount = 1;
        const title = $("#inputNewQuizTitle").val();
        const description = $("#inputDescription").val();
        const courseId = SDK.Storage.load("newCourseId");


        if (!title || !description) {
            alert("Udfyld venligt alle felterne");
        }
        else {
            event.preventDefault();
            SDK.Quiz.createQuiz(createdBy, questionCount, title, description, courseId, (err, newQuiz) => {
                if (err && err.xhr.status === 401) {
                    $(".form-group").addClass("Der Opstod en fejl");

                } else if (err) {
                    console.log("Der skete en fejl");

                } else {
                    event.preventDefault();
                    window.location.href = "createQ&O.html";


                }
            });
        }
    });
});
