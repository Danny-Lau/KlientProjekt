$(document).ready(() =>{

        SDK.Course((err, data) => {

            let $courseList = $("#courseList");
            let courses = JSON.parse(data)

            courses.forEach((course) => {
                const courseHTML = ` 
                    <form id="courses">
                    <input type="radio" id = "${course.courseId}" name = "courses"> ${course.courseTitle}<br> </input>
                    </form>
                `;
                $courseList.append(courseHTML);
            });

        });

        $("#finish-btn").click(() => {

        let question = $("#inputQuestion").val();

        if(!question){
            alert("Stil venligst et spørgsmål")
        }
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
            })
        });
});