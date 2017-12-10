$(document).ready(() => {


    // Henter alle quizzene ned
    SDK.Quiz.showQuizzes((err, data) => {

        let $qList = $("#qList");
        let quizzes = JSON.parse(data);

        //For hver quiz skal parameterne id, title, antal spørgsmål, oprettet af og beskrivelse vises
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
                            <button class="btn btn-success deleteQuiz-btn" data-delete-quiz-id="${quiz.quizId}">Slet quiz</button>
                        </div>
                    </div>
                </div>
            </div>`;

            $qList.append(courseHTML);

        });
        // Når man vælger en quiz, skal quizzens ID hentes ned
        $(".quiz-btn").click (function() {
            const currentQuizId = $(this).data("quiz-id");
            SDK.Storage.persist("currentQuiz", currentQuizId);
            window.location.href = "startQuiz.html";

        });

        //Bruger quizzens Id til at slette quizzen
        $(".deleteQuiz-btn").click(function() {
            const deleteQuizId = $(this).data("delete-quiz-id");
            SDK.Storage.persist("deleteId", deleteQuizId);
            const type = SDK.Storage.load("type");

            //Tjekke om brugeren er Administrator
            if (type == 1) {
                SDK.Quiz.deleteQuiz((err, data) => {

                    if (err && err.xhr.status === 401) {
                        $(".form-group").addClass("Der opstod en fejl");
                    }
                    else if (err) {
                        console.log("fejl")
                    }
                    else {
                        window.location.href = "showQuizzes.html";

                    }
                });
            } else {
                alert("DU har ikke rettigheder til denne handling");
            }

        });

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
