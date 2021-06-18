class Valid{
    constructor(email, password){
        this.email = email;
        this.password = password;
        this.isValid = false;
        // this.val = password.length>5;
    }
    validate(){
        this.isValid = this.password.length > 5 
    }
}