$(document).ready(() => {

    // Tildeler variablen værdien af det antal spørgsmål brugeren har sat
    const userQuestionCount = SDK.Storage.load("inputQuestionCount");
    //Alle Quiz skal mindst være på et spørgsmål
    let countingQuestion = 0;
    //Gemmer den med pesist for at bruge den til at validere senere
    SDK.Storage.persist("questionCount", countingQuestion);


    $("#next-question-btn").click(function () {

        //Tildeler inputsfelterne værdier
        const question = $("#inputQuestion").val();
        const option1 = $("#correctAnswer").val();
        const option2 = $("#wrongAnswer1").val();
        const option3 = $("#wrongAnswer2").val();
        const option4 = $("#wrongAnswer3").val();

        //Hver gang brugeren trykker på next-question-btn, så tæller den en op)
        currentCounting = SDK.Storage.load("questionCount");
        currentCounting++;
        SDK.Storage.persist("questionCount", currentCounting);


        //Den nyoprettet quiz´s id sættes til variablen
        const questionToQuizId = SDK.Storage.load("newQuizId");

        //Kører opret spørgsmål metoden
        event.preventDefault();
        SDK.Question.createQuestion(question, questionToQuizId, (err) => {

            //Tjekker om der er nogle tomme felter
            if (!option1 || !option2 || !option3 || !option4) {
                alert("udfyld venligt alle felterne");

            } else if (err && err.xhr.status === 401) {
                $(".form-group").addClass("Der opstod en fejl");

            } else if (err) {
                console.log("Der skete en fejl")

            } else {

                /*
                  Sætter det nyoprettet sprørgsmål Id til variablen
                  og det rigtige svært har et 1-tal
                 */

                let optionToQuestionId = SDK.Storage.load("newQuestionId");
                let isCorrect = 1;

                /*
                   Opretter option med første inputs bokse (Dette er det rigtige svar)
                   Bruger det nyoprettet spørgsmål id som parameter
                 */
                SDK.Option.createOption(option1, optionToQuestionId, isCorrect, (err) => {
                    if (err && err.xhr.status === 401) {
                        $(".form-group").addClass("Der Opstod en fejl");

                    } else if (err) {
                        console.log("Der skete en fejl")

                    } else {

                        //Oprette option med de resterende 3 inputsfelter (De forkerte svar)
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

                                                // Nulstiller felterne for at gøre klar til næste spørgsmål
                                            } else {
                                                $("#inputQuestion").val("");
                                                $("#correctAnswer").val("");
                                                $("#wrongAnswer1").val("");
                                                $("#wrongAnswer2").val("");
                                                $("#wrongAnswer3").val("");


                                                /*
                                                  Tjekker om brugeren overgår det antal spørgsmål der er sat.
                                                  Når brugeren når op det antal spørgsmål der er sat, så må
                                                  brugeren ikke oprette flere spørgsmål. Hele quizzen bliver
                                                  derefter oprettet og brugeren bliver sendt videre til sin
                                                  egen profil
                                                */

                                                if (currentCounting == userQuestionCount) {
                                                    alert("Du har oprettet " + userQuestionCount +
                                                        " spørgsmål som du angav i starten");

                                                    alert("Din quiz " + SDK.Storage.load("newQuizTitle") +
                                                        " med " + userQuestionCount + " Spørgsmål er nu oprettet");

                                                    event.preventDefault();
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

    $("#finish-btn").click(function () {

        const question = $("#inputQuestion").val();
        const option1 = $("#correctAnswer").val();
        const option2 = $("#wrongAnswer1").val();
        const option3 = $("#wrongAnswer2").val();
        const option4 = $("#wrongAnswer3").val();

        const questionToQuizId = SDK.Storage.load("newQuizId");

        event.preventDefault();
        SDK.Question.createQuestion(question, questionToQuizId, (err) => {

            if (!option1 || !option2 || !option3 || !option4) {
                alert("udfyld venligt alle felterne");

            } else if (err && err.xhr.status === 401) {
                $(".form-group").addClass("Der opstod en fejl");

            } else if (err) {
                console.log("Der skete en fejl")

            } else {

                let optionToQuestionId = SDK.Storage.load("newQuestionId");
                let isCorrect = 1;

                SDK.Option.createOption(option1, optionToQuestionId, isCorrect, (err) => {

                    if (err && err.xhr.status === 401) {
                        $(".form-group").addClass("Der Opstod en fejl");

                    } else if (err) {
                        console.log("Der skete en fejl")

                    } else {


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

                                                const missingQuestion = userQuestionCount - SDK.Storage.load("questionCount");

                                                //Tjekker om brugeren har oprettet det antal spørgsmål, som brugeren selv har angivet
                                                if (userQuestionCount > SDK.Storage.load("questionCount")) {

                                                    alert("Du mangler stadig at oprette " + missingQuestion + " spørgsmål");
                                                    $("#inputQuestion").val("");
                                                    $("#correctAnswer").val("");
                                                    $("#wrongAnswer1").val("");
                                                    $("#wrongAnswer2").val("");
                                                    $("#wrongAnswer3").val("");

                                                    currentCounting = SDK.Storage.load("questionCount");
                                                    currentCounting++;
                                                    SDK.Storage.persist("questionCount", currentCounting);





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
