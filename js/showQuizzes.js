$(document).ready(() => {

    const currentUser = SDK.User.current();
    const userId = currentUser.userId;


    SDK.Quiz.showQuizzes((err, data) => {

        let $qList = $("#qList");
        let quizzes = JSON.parse(data);

        quizzes.forEach((quiz) =>{
            const courseHTML =` 
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="col-lg-8">
                      <dl>
                        <dt>ID:</dt>
                        <dd>${quiz.quizId}</dd>
                        <dt>Title:</dt>
                        <dd>${quiz.quizTitle}</dd>
                        <dt>Antal spørgsmål:</dt>
                        <dd>${quiz.questionCount}</dd>
                        <dt>Oprettet af: </dt>
                        <dd>${quiz.createdBy}</dd>
                        <dt>Beskrivelse: </dt>
                        <dd>${quiz.quizDescription}</dd>
                      </dl>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-lg-8 text-right">
                            <button class="btn btn-success quiz-btn" data-quiz-id="${quiz.quizId}">Start quiz</button>
                        </div>
                    </div>
                </div>
            </div>`;

            $qList.append(courseHTML);

        });

        $(".quiz-btn").click (function() {
            const currentQuizId = $(this).data("quiz-id");
            SDK.Storage.persist("currentQuiz", currentQuizId);
            window.location.href = "startQuiz.html";

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


