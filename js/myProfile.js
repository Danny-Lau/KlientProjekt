$(document).ready(() => {

    SDK.User.loadNavigation();

    const currentUser = SDK.User.current();

    SDK.User.myProfile((cb) => {
        $(".my-profile").html(`
     <dl>
         <dt>Bruger Id</dt>
         <dt>${currentUser.id}</dt>
         <dt>Brugernavn</dt>
         <dd>${currentUser.username}</dd>
         <dt>Password</dt>
         <dd>${currentUser.password}</dd>
     </dl>    
    `);

    });
})