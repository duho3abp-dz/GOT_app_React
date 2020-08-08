// ----------------- App -----------------

export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {throw new Error(`Could not fetch ${this._apiBase}${url}, status: ${res.status}`)}
    
        return await await res.json();
    }

    async getAllCharacters(num) {
        const res = await this.getResource(`/characters?page=${num}&pageSize=10`);
        return res.map(item => this._transformCharacter(item));
    }
    
    async getCharacter(id) {
        const res = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(res);
    }

    async getAllHouses(num) {
        const res = await this.getResource(`/houses?page=${num}&pageSize=10`);
        return res.map(this._transformHouse());
    }
    
    async getHouse(id) {
        const res = await this.getResource(`/houses/${id}`);
        return this._transformHouse(res);
    }

    async getAllBooks(num) {
        const res = await this.getResource(`/books?page=${num}&pageSize=10`);
        return res.map(this._transformBooks());
    }
    
    async getBooks(id) {
        const res = await this.getResource(`/books/${id}`);
        return this._transformBooks(res);
    }

    _transformCharacter(char) {
        const corrChar =this._checkingCorrInformation(char);
        return {
            name: corrChar.name,
            gender: corrChar.gender,
            born: corrChar.born,
            died: corrChar.died,
            culture: corrChar.culture
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBooks(book) {
        return {
            name: book.name,
            nameOfPages: book.nameOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }

    _checkingCorrInformation(res) {
        let corrObj = {};
        for (let key in res) {
            if (res[key] === ''){
                corrObj[key] = 'no info'
            } else {
                corrObj[key] = res[key]
            }
        }

        return corrObj;
    }
}