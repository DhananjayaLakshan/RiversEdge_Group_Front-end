class AuthenticationService {
    
    successfulLogin(firstName, role){
        sessionStorage.setItem('authenticatedUserId', firstName);
        sessionStorage.setItem('authenticatedUserRole', role);
    }

    logout(){
        console.log("User Id Removed"+'authenticatedUserId');
        console.log("User Id Role"+'authenticatedUserRole');
        sessionStorage.removeItem('authenticatedUserId');
        sessionStorage.removeItem('authenticatedUserRole');
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUserId');
        if (user === null) return false;
        return true;
    }

    loggedUserId(){
        let id = sessionStorage.getItem('authenticatedUserId');
        if (id === null) return '';
        return id;
    }

    // loggedUserName(){
    //     let name = sessionStorage.getItem('authenticatedUserName');
    //     if (name === null) return '';
    //     return name;
    // }

    loggedUserRole() {
        let role = sessionStorage.getItem('authenticatedUserRole');
        if(role != null) return role;
        return null;
    }

}
export default new AuthenticationService()