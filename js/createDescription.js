$(document).ready(() => {

    $("#continue-button").click(() => {

        var createdBy = SDK.Storage.load("username");
        var questionCount = $("#inputQuestionCount").val();
        var title = $("#inputNewQuizTitle").val();
        var description = $("#inputDescription").val();
        var courseId = SDK.Storage.load("newCourseId");


        if (!title || !description || !questionCount) {
            alert("Udfyld venligt alle felterne");
        }
        else if (isNaN(questionCount)){
            alert("Antal spørgsmål skal være et tal");
        }
        else if (questionCount < 1) {
            alert("Der kan ikke være 0 spørgsmål")

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
                    SDK.Storage.persist("inputQuestionCount", questionCount);
                    SDK.Storage.persist("newQuizTitle", title);
                    window.location.href = "createQ&O.html";


                }
            });
        }
    });
});
