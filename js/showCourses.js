$(document).ready(() => {

    //Henter aller fagene
    SDK.Course((err, data) => {

        let $cList = $("#cList");
        let courses = JSON.parse(data)

        //For hver fag, skal der være titel og ID
        courses.forEach((course) =>{
            const courseHTML =` 
            <div class="panel panel-default">
                <div class="panel-body">
                    <div class="col-lg-8">
                      <dl>
                        <dt>ID:</dt>
                        <dd>${course.courseId}</dd>
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
            </div>`;

            $cList.append(courseHTML);

        });

        //Når man vælger et fag, skal fages ID hentes ned
        $(".course-btn").click (function() {
            const currentCourseId = $(this).data("course-id");
            SDK.Storage.persist("currentCourse", currentCourseId);
            window.location.href = "showQuizzes.html";
            
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