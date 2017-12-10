$(document).ready(() => {

    // Tildeler variablen værdien af det antal spørgsmål brugeren har sat
    const userQuestionCount = SDK.Storage.load("inputQuestionCount");

    let currentQuestionCount = 0;


    $("#finish-btn").click(function () {

        //Tildeler inputsfelterne værdier
        const question = $("#inputQuestion").val();
        const option1 = $("#correctAnswer").val();
        const option2 = $("#wrongAnswer1").val();
        const option3 = $("#wrongAnswer2").val();
        const option4 = $("#wrongAnswer3").val();

        //Den nyoprettet quiz´s id sættes til variablen
        const questionToQuizId = SDK.Storage.load("newQuizId");

        event.preventDefault();
        SDK.Question.createQuestion(question, questionToQuizId, (err) => {

            //Tjekker om der er nogle felter som er tomme
            if (!option1 || !option2 || !option3 || !option4) {
                alert("udfyld venligt alle felterne");

            } else if (err && err.xhr.status === 401) {
                $(".form-group").addClass("Der opstod en fejl");

            } else if (err) {
                console.log("Der skete en fejl")

            } else {

                /*
                  Sætter det nyoprettet sprørgsmålsId til variablen
                  og det rigtige svarmulighed har værdien 1
                 */
                let optionToQuestionId = SDK.Storage.load("newQuestionId");
                let isCorrect = 1;


                // Oprette den første option som også er den rigtige svarmulighed.
                SDK.Option.createOption(option1, optionToQuestionId, isCorrect, (err) => {

                    if (err && err.xhr.status === 401) {
                        $(".form-group").addClass("Der Opstod en fejl");

                    } else if (err) {
                        console.log("Der skete en fejl")

                    } else {

                        // Oprette3 de tre resterende options
                        SDK.Option.createOption(option2, optionToQuestionId, isCorrect = 0, (err) => {
                            if (err && err.xhr.status === 401) {
                                $(".form-group").addClass("Der Opstod en fejl");

                            } else if (err) {
                                console.log("Der skete en fejl")

                            } else {

                                SDK.Option.createOption(option3, optionToQuestionId, isCorrect = 0, (err) => {
                                    if (err && err.xhr.status === 401) {
                                        $(".form-group").addClass("Der Opstod en fejl");

                                    } else if (err) {
                                        console.log("Der skete en fejl")

                                    } else {
                                        SDK.Option.createOption(option4, optionToQuestionId, isCorrect = 0, (err) => {
                                            if (err && err.xhr.status === 401) {
                                                $(".form-group").addClass("Der Opstod en fejl");

                                            } else if (err) {
                                                console.log("Der skete en fejl")

                                            } else {
                                                //Tæller antal spørgsmål en op når der er oprettet et spørgsmål
                                                currentQuestionCount++;


                                                const missingQuestion = userQuestionCount - currentQuestionCount;

                                                //Tjekker om brugeren har oprettet det antal spørgsmål, som brugeren selv har angivet
                                                if (userQuestionCount > currentQuestionCount) {

                                                    alert("Du mangler stadig at oprette " + missingQuestion + " spørgsmål");
                                                    $("#inputQuestion").val("");
                                                    $("#correctAnswer").val("");
                                                    $("#wrongAnswer1").val("");
                                                    $("#wrongAnswer2").val("");
                                                    $("#wrongAnswer3").val("");

                                                } else {
                                                    /*
                                                      Quizzen er blevet oprettet med options til de forskellige spørgsmål.
                                                      diverse opliysning som er blevet brugt til oprettelsen af quizzen
                                                      bliver fjernet fra browseren local storage
                                                     */

                                                    alert("Din quiz" + SDK.Storage.load("newQuizTitle") +
                                                        " med " + SDK.Storage.load("inputQuestionCount") + " Spørgsmål er nu oprettet");

                                                    window.location.href = "myProfile.html";
                                                    SDK.Storage.remove("newQuestionId");
                                                    SDK.Storage.remove("newQuizId");
                                                    SDK.Storage.remove("newCourseId");
                                                    SDK.Storage.remove("questionCount");
                                                    SDK.Storage.remove("inputQuestionCount");
                                                    SDK.Storage.remove("newQuizTitle");
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
});
