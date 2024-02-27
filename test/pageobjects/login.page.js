import { $ } from '@wdio/globals'


class LoginPage {
    get email (){
        return $('id:email')
    }
    get password (){
        return $('//android.widget.EditText[@resource-id="password"]')
    }
    get btnLogin(){
        return $('~Login')
    }

    async login(email, password){
        await this.email.setValue(email)
        await this.password.setValue(password)
        await this.btnLogin.click()
    }
}

export default new LoginPage();
