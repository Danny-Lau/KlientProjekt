$(document).ready(() => {

    //Viser aller fagene, som der kan oprettes quiz til
    SDK.Course((err, data) => {

        let $cList = $("#cList");
        let courses = JSON.parse(data);

        courses.forEach((course) =>{
            const courseHTML =` 
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
            </div>`;

            $cList.append(courseHTML);

        });

        //Tjekker om brugeren er administrator
        const userType = SDK.Storage.load("type");
        $(".course-btn").click (function() {

            //Hvis brugeren er administrator, bliver oplysningerne sendt videre
            if (userType == 1) {
                const newCourseId = $(this).data("course-id");
                SDK.Storage.persist("newCourseId", newCourseId);
                window.location.href = "createDescription.html";
            }

            //Hvis brugeren ikke er administrator, bliver han sendt tilbage til my profile,
            else {
                alert("Du har desværre ikke rettigheder til denne handling. " +
                    "\nDet er kun Administratorer der kan tilgå denne handling");

                window.location.href = "myProfile.html";
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