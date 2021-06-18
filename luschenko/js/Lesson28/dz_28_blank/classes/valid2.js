class Valid2 extends Valid{
    constructor(email, password){
        super(email, password);
        this.emailError = '';
        this.passwordError = '';
    }
    validate(){
        super.validate();
        if(!this.isValid)this.passwordError = 'min length 6';
        if(this.email.length == 0)this.emailError = 'Email empty';
        else if(this.email.indexOf(`@`) == -1)this.emailError = 'Wrong email format';
        if(this.emailError != '')this.isValid = false;
    }
}