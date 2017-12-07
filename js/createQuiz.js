$(document).ready(() => {


    SDK.Course((err, data) => {

        let $cList = $("#cList");
        let courses = JSON.parse(data)

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

        $(".course-btn").click (function() {
            const newCourseId = $(this).data("course-id");
            SDK.Storage.persist("newCourseId", newCourseId);
            window.location.href = "createDescription.html";

        });

    });



});