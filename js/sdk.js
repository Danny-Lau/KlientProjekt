const SDK = {
    serverURL:"http://localhost:8080/api",
    request: (options, cb) => {

        let headers = {};
        if (options.headers) {
            Object.keys(options.headers).forEach((h) => {
                headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
            });
        }

        $.ajax({
            url: SDK.serverURL + options.url,
            method: options.method,
            headers: headers,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(options.data),
            success: (data, status, xhr) => {
                cb(null, data, status, xhr);
            },
            error: (xhr, status, errorThrown) => {
                cb({xhr: xhr, status: status, error: errorThrown});
            }
        });

    },

    Course: (cb) => {
        SDK.request({
            headers: { authorization: SDK.Storage.load("token") },
            url: "/course",
            method: "GET"
        }, (err, course) => {
            if (err) return cb(err);

            console.log(course);

            cb(null, course);
        });
    },


    User: {

        login: (username, password, cb) => {
            SDK.request({
                data: {
                    username: username,
                    password: password
                },
                url: "/user/login",
                method: "POST"
            }, (err, data) => {

                if (err) return cb(err);

                let userdata = JSON.parse(data);

                SDK.Storage.persist("token", userdata);


                cb(null, data);
            });
        },

        loadUser: (cb) => {
            SDK.request({
                headers: { authorization: SDK.Storage.load("token") },
                url: "/user/myuser",
                method: "GET"

            }, (err, data) => {
                if (err) return cb(err);

                let userData = JSON.parse(data);

                SDK.Storage.persist("username", userData.username);
                SDK.Storage.persist("userId", userData.userId);
                SDK.Storage.persist("type", userData.type);

                cb(null, data);
            });
        },


        current: () => {
            return SDK.Storage.load("userId"),
                SDK.Storage.load("username"),
                SDK.Storage.load("type");

        },

        logout: (userId, cb) => {
            SDK.request({
                url: "/user/logout",
                method: "POST",
                data: userId

            }, (err, data) => {
                if (err) return cb(err);

                cb(err, data);

            });
        },

        signup: (username, password, cb) => {
            SDK.request({
                data: {
                    username: username,
                    password: password
                },
                url:"/user/signup",
                method: "POST"
            }, (err, data) => {

             if (err) return cb(err);

             let userdata = JSON.parse(data);

             SDK.Storage.persist("userId", userdata.userId);
             SDK.Storage.persist("username", userdata.username);
             SDK.Storage.persist("password", userdata.password);

             cb(null, data);

            });
        },
    },
    Quiz:{
        createQuiz: (createdBy, questionCount, quizTitle, quizDescription, courseId, cb) => {
            SDK.request({
                data: {
                    createdBy: createdBy,
                    questionCount: questionCount,
                    quizTitle: quizTitle,
                    quizDescription: quizDescription,
                    courseId: courseId
                },
                headers: {
                    authorization: SDK.Storage.load("token"),
                },
                url: "/quiz",
                method: "POST",
            }, (err, data) => {

                let userdata = JSON.parse(data);

                SDK.Storage.persist("newQuizId", userdata.quizId);

                cb(null, data);
            })
        },


        showQuizzes:(cb) => {

            const currentCourseID = SDK.Storage.load("currentCourse");
            SDK.request({
                headers: { authorization: SDK.Storage.load("token") },
                url: "/quiz/" + currentCourseID,
                method: "GET"
            }, (err, quizzes) => {

                console.log(quizzes);

                cb(null, quizzes);

            });

        },

    },

    Option: {
        createOption: (option, optionToQuestionId, isCorrect,  cb) => {
            SDK.request({
                data:{
                    option: option,
                    optionToQuestionId: optionToQuestionId,
                    isCorrect: isCorrect
                },
                headers: {authorization: SDK.Storage.load("token")},
                url: "/option",
                method: "POST"
            }, (err, data) => {

                cb(null, data);

            });

        },
    },

    Question: {
        loadQuestion: (cb) => {

            const currentQuizId = SDK.Storage.load("currentQuiz")
            SDK.request({
                headers: { authorization: SDK.Storage.load("token") },
                url: "/question/" + currentQuizId,
                method: "GET"
            }, (err, questions) => {

                console.log(questions);

                cb(null, questions);
            });
        },

        createQuestion:(question, questionToQuizId, cb) => {
            SDK.request({
                data: {
                    question: question,
                    questionToQuizId: questionToQuizId
                },
                headers: {
                    authorization: SDK.Storage.load("token")
                },
                url: "/question",
                method: "POST"
            }, (err, data) => {

                console.log(data);

                let questionData = JSON.parse(data);

                SDK.Storage.persist("newQuestionId", questionData.questionId);

                cb(null, data);

            });

        },
    },

    Storage: {
        prefix: "EksamensquizSDK",
        persist: (key, value) => {
            window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: (key) => {
          const val = window.localStorage.getItem(SDK.Storage.prefix + key);
          try {
            return JSON.parse(val);
          }
          catch (e) {
            return val;
          }
        },
        remove: (key)  => {
            window.localStorage.removeItem(SDK.Storage.prefix + key);
        }
    }
};