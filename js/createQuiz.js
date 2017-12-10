$(document).ready(() => {


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

        const userType = SDK.Storage.load("type");
        $(".course-btn").click (function() {

            if (userType == 1) {
                const newCourseId = $(this).data("course-id");
                SDK.Storage.persist("newCourseId", newCourseId);
                window.location.href = "createDescription.html";
            }
            else {
                alert("Du har desværre ikke rettigheder til denne handling. " +
                    "\nDet er kun Administratorer der kan tilgå denne handling");
            }

        });

    });



});