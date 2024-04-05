import { $ } from '@wdio/globals'

class ProductPage {

    async getProductTitle(name){
        return $(`~${name}`)
    }

    async addProduct(){
        return (await $(`-ios predicate string name == "Adicionar ao carrinho"`)).click()
        (await $(`-ios predicate string name == "Size Selecione uma Size"`)).click()
        (await $(`-ios predicate string name == "M"`)).click()
        (await $(`-ios predicate string name == "Color Selecione uma Color"`)).click()
        (await $(`-ios predicate string name == "Red"`)).click()

    }
}

export default new ProductPage();