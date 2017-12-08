$(document).ready(() => {

    const currentUser = SDK.User.current();
    const userId = currentUser.userId;

    SDK.Question.loadQuestion((err, question) => {
        let $questionList = $("#questionList");
        let questions = JSON.parse(question);
        let numberOfQuestion = 0;

        questions.forEach((question) => {
            numberOfQuestion++;

            $questionList.append(`
                <div class="panel-body">
                    <div class="col-lg-8">
                      <dl>
                        <dd><h4>${question.question}</h4></dd>
                       <div id="optionList${question.questionId}"></div>
                      </dl>
                    </div>
                </div>
           `);

            SDK.Storage.persist("currentQuestionId", question.questionId);

            SDK.Option.loadOption((err, option) => {

                const $optionList = $('#optionList' + question.questionId);
                let options = JSON.parse(option);

                options.forEach((option) => {
                   $optionList.append(`
                   <input type="radio" class="optionToQuestion" name="${question.questionId}" value="${option.isCorrect}"> t${option.option}<br>
                `);

                });

            });

        });
});
        $("#finish-quiz-button").click(() => {
            let numberOfCorrects = 0;
            let numberOfWrongs = 0;

            $(".option-answer").each(function () {
                let optionValue = $(this).data("OptionValue");

                if (optionValue == 1) {
                    numberOfCorrects++;

                } else {
                    numberOfWrongs++;

                }

            });

        });


        $("#logout-button").click(() => {
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


