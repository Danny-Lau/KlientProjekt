$(document).ready(() => {

    const userType = SDK.Storage.load("type");

    $("#continue-button").click(() => {

        //Tjekker om brugeren er administrator
        if (userType == 1) {

            //Sætter parameterene til at oprette en quiz
            var createdBy = SDK.Storage.load("username");
            var questionCount = $("#inputQuestionCount").val();
            var title = $("#inputNewQuizTitle").val();
            var description = $("#inputDescription").val();
            var courseId = SDK.Storage.load("newCourseId");

            //Tjekke om alle felterne er udfylft
            if (!title || !description || !questionCount) {
                alert("Udfyld venligt alle felterne");
            }

            //Tjekker om admin har skrevet et tal ud for "antal spørgsmål"
            else if (isNaN(questionCount)) {
                alert("Antal spørgsmål skal være et tal");
            }
            //Der må ikke være 0 antal spørgsmål
            else if (questionCount == 0) {
                alert("Der kan ikke være 0 spørgsmål")

            }
            //Opretter en quiz ud fra parameterne
            else {
                event.preventDefault();
                SDK.Quiz.createQuiz(createdBy, questionCount, title, description, courseId, (err, newQuiz) => {
                    if (err && err.xhr.status === 401) {
                        $(".form-group").addClass("Der Opstod en fejl");

                    } else if (err) {
                        console.log("Der skete en fejl");

                    //Gemmer den nye quiz titel og antal spørgsmål
                    } else {
                        event.preventDefault();
                        SDK.Storage.persist("inputQuestionCount", questionCount);
                        SDK.Storage.persist("newQuizTitle", title);
                        window.location.href = "createQ&O.html";


                    }
                });
            }
            //Hvis brugeren ikke er admin, bliver han sendt tilbage til sin egen profil
        } else {
            alert("Du har desværre ikke rettigheder til denne handling. " +
                "\nDet er kun Administratorer der kan tilgå denne handling");

            window.location.href = "myProfile.html";
        }
    });
    //Metode til at logge ud
    $("#logout-button").click(() => {
        const userId = SDK.Storage.load("userId");
        SDK.User.logout(userId, (err, data) => {
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
