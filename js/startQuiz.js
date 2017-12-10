$(document).ready(() => {

    //Henter alle Spørgsmålene ned
    SDK.Question.loadQuestion((err, question) => {
        let $questionList = $("#questionList");
        let questions = JSON.parse(question);
        let numberOfQuestion = 0;

        //For hvert Spørgsmål skal, skal der være options lige efter

        questions.forEach((question) => {
            numberOfQuestion++;

            $questionList.append(`
                <div class="panel-body">
                    <div class="col-lg-8">
                      <dl>
                        <dd><h4>${question.question}</h4></dd>
                       <div id="options${question.questionId}"></div>
                      </dl>
                    </div>
                </div>
           `);

            //Gemmer nuværende spørgsmålsId for at hente options til spørgsmålet
            SDK.Storage.persist("currentQuestionId", question.questionId);


            //Henter Options ned
            SDK.Option.loadOption((err, option) => {

                const $optionList = $('#options' + question.questionId);
                let options = JSON.parse(option);

                options.forEach((option) => {
                   $optionList.append(`
                   <input type="radio" class="option-to-question" name="${question.questionId}" value="${option.isCorrect}"> ${option.option}<br>
                `);

                });
            });
        });

        //Når brugeren er færdig, så tælles antallet af spørgsmål
        $("#finish-quiz-button").click(() => {
            let numberOfCorrects = 0;

            //Tjekke om spørgsmålene er rigtige
            $(".option-to-question").each(function () {
                if ($(this).is(":checked") && $(this).val() == 1) {
                    numberOfCorrects++;


                }
            });
            // Viser brugeren samlet resultat
            alert("Du fik " + numberOfCorrects + " rigtige ud af " +  numberOfQuestion);
            SDK.Storage.remove("currentCourse");
            SDK.Storage.remove("currentQuizId");
            SDK.Storage.remove("currentQuestionId");

            window.location.href = "myProfile.html";
        });
    });

    // Metode til at logge ud
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


