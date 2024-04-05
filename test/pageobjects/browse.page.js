import { $, $$ } from '@wdio/globals'


class BrowsePage {

    get searchInput(){
        return $(`-ios predicate string:name == "SearchInput"`)
    }

    get products(){
        return $$(`-ios predicate string:name == "productsDetails"`)
    }
}

export default new BrowsePage();
