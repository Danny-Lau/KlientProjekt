$(document).ready(() =>{


    SDK.Course((err, data) => {

        let $cList = $("#cList");
        let courses = JSON.parse(data)

        courses.forEach((course) => {
            const courseHTML = ` 
            
                <input type="radio" > ${course.courseTitle}<br> </input>


`;

            $cList.append(courseHTML);

        });

    });


});