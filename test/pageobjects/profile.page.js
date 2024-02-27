import { $ } from '@wdio/globals'


class ProfilePage {
    async profileName (name){
        return await $(`//android.widget.EditText[@resource-id="${name}"]`)
    }
}

export default new ProfilePage();
