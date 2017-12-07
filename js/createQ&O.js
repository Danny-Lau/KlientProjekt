$(document).ready(() => {


    $("#next-question-btn").click(function () {

        let question = $("#inputQuestion").val();
        let questionCount = 1;

        let option1 = $("#correctAnswer").val();
        let option2 = $("#wrongAnswer1").val();
        let option3 = $("#wrongAnswer2").val();
        let option4 = $("#wrongAnswer3").val();

        const questionToQuizId = SDK.Storage.load("newQuizId");

            event.preventDefault();
            SDK.Question.createQuestion(question, questionToQuizId,(err, newQuestionId) => {
                if (!option1 || !option2 || !option3 || !option4) {
                    alert("udfyld venligt alle felterne");

                } else if (err && err.xhr.status === 401) {
                    $(".form-group").addClass("Der opstod en fejl");

                } else if (err) {
                    console.log("Der skete en fejl")

                } else {

                    let optionToQuestionId = SDK.Storage.load("newQuestionId");
                    let isCorrect = 1;

                    SDK.Option.createOption(option1, optionToQuestionId, isCorrect, (err, data) => {

                        if (err && err.xhr.status === 401) {
                            $(".form-group").addClass("Der Opstod en fejl");

                        } else if (err) {
                            console.log("Der skete en fejl")

                        } else {

                            SDK.Option.createOption(option2, optionToQuestionId, isCorrect = 0, (err, data) => {
                                if (err && err.xhr.status === 401) {
                                    $(".form-group").addClass("Der Opstod en fejl");

                                } else if (err) {
                                    console.log("Der skete en fejl")

                                } else {

                                    SDK.Option.createOption(option3, optionToQuestionId, isCorrect = 0, (err, data) => {

                                        if (err && err.xhr.status === 401) {
                                            $(".form-group").addClass("Der Opstod en fejl");

                                        } else if (err) {
                                            console.log("Der skete en fejl")

                                        } else {

                                            SDK.Option.createOption(option4, optionToQuestionId, isCorrect = 0, (err, data) => {
                                                if (err && err.xhr.status === 401) {
                                                    $(".form-group").addClass("Der Opstod en fejl");

                                                } else if (err) {
                                                    console.log("Der skete en fejl")

                                                } else {
                                                    $("#inputQuestion").val("");
                                                    $("#correctAnswer").val("");
                                                    $("#wrongAnswer1").val("");
                                                    $("#wrongAnswer2").val("");
                                                    $("#wrongAnswer3").val("");
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