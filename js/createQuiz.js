$(document).ready(() =>{

        SDK.Course((err, data) => {

            let $courseList = $("#courseList");
            let courses = JSON.parse(data)

            courses.forEach((course) => {
                const courseHTML = `
                <div class="row" id="coursesModal" aria-hidden="false"></div>
                   <h3> Vælg fag du vil oprette en qui< til</h3>
                   <div class="panel panel-default">
                        <div class="panel-body">
                            <div class="col-lg-8">
                             <dl>
                                <dt>Titel:</dt>
                                <dd>${course.courseTitle}</dd>
                            </dl>
                           </div>
                        </div>
                        <div class="panel-footer">
                            <div class="row">
                                <div class="col-lg-8 text-right">
                                    <button class="btn btn-success course-btn" data-course-id="${course.courseId}">Vælg</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                $courseList.append(courseHTML);

            });

            $(".course-btn").click(function () {
                const newCourseId = $(this).data("course-id");
                SDK.Storage.persist("newCourseId", newCourseId);
            });
        });

        $("#coursesModal").modal("true");
        $("#quizInfoModal").modal("false");


        $("#continue-btn").click(function() {
            let Title = $("#inputQuizTitle").val();
            let description = $("#inputDescription").val();

            if(!Title || description){
                alert("Udfyld venligst alle felterne")
            }
            else {
                $("#quizInfoModal").modal("true");
                $("#questionModal").modal("false");

                const quizTitle = $("#inputQuizTitle").val();
                const quizDescription = $("#inputDescription").val();
                const courseId = SDK.Storage.load("newCourseId");
                const createdBy = SDK.Storage.load("username");
                var questionCount = 0;

                SDK.Quiz.createQuiz(createdBy, questionCount, quizTitle, quizDescription, courseId, (err, newQuiz) => {
                    if (err && err.xhr.status === 401) {
                        $(".form-group").addClass("Der Opstod en fejl");

                    } else if (err) {
                        console.log("Der skete en fejl")

                    } else {
                        let question = $("#inputQuestion").val();
                        if (!question) {
                            alert("Stil venligst et spørgsmål")

                        } else {

                            $("#next-question-btn").click(function(){
                                questionCount ++;

                                let newQuestion = $("#inputQuestion").val();

                                if(!newQuestion) {
                                    alert("Stil venligt et spørgsmål");

                                } else {

                                    const newQuizId = newQuiz.quizId;

                                    SDK.Question.createQuestion()
                                }
                                

                        })
            }
                    }

                })
            }

    });




        else
            SDK.Question.createQuestion(question, (err, data) => {
                if(err && err.xhr.status === 401) {
                    $(".form-group").addClass("Der Opstod en fejl");

                } else if (err) {
                    console.log("Der skete en fejl")

                } else {

                    let option1 = $("#correctAnswer").val();
                    let option2 = $("#wrongAnswer1").val();
                    let option3 = $("#wrongAnswer2").val();
                    let option4 = $("#wrongAnswer3").val();

                    if(!option1 || !option2 || !option3 || !option4) {
                        alert("udfyld venligt alle felterne");

                    } else {
                        SDK.Question.createOption(option, (err, data) => {
                            if(err && err.xhr.status === 401){
                                $(".form-group").addClass("Der er fejl");
                            }
                            else if(err) {
                                console.log("Der skete en fejl");
                            } else {
                                alert("Quizzen er blevet oprettet")
                            }
                        });
                    };
                };
            });
        });

    $("#next-question-btn").click(()=> {




    });

});