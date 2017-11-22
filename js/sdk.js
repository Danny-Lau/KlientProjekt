const SDK = {
    serverURL:"http://localhost:8080/api",
    request: (options, cb) => {

        event.preventDefault();
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

    Quiz:{

    }

    User: {
        current: () => {
            return SDK.Storage.load("user");
        }

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

                SDK.Storage.persist("username", data.username);
                SDK.Storage.persist("password", data.password);

                cb(null, data);
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

             SDK.Storage.persist("userId", data.userId);
             SDK.Storage.persist("username", data.username);
             SDK.Storage.persist("password", data.password);

             cb(null, data);

            });
        },

        myProfile: () => {
            SDK.request({
             method: "GET",
             url: "/user/myuser" + SDK.User.current().id,
             headers:{ authorization: SDK.Storage.load("tokenId")
            }
        }, cb);




        Logout: () => {
            SDK.Storage.remove("userId", data.userId);
            SDK.Storage.remove("username", data.username);
            SDK.Storage.remove("password", data.password);
        }
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