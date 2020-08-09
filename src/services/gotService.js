// ----------------- App -----------------

export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {throw new Error(`Could not fetch ${this._apiBase}${url}, status: ${res.status}`)}
    
        return await await res.json();
    }

    getAllCharacters = async (num) => {
        const res = await this.getResource(`/characters?page=${num}&pageSize=10`);
        return res.map(item => this._transformCharacter(item));
    }
    
    getCharacter = async (id) => {
        const res = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(res);
    }

    getAllHouses = async (num) => {
        const res = await this.getResource(`/houses?page=${num}&pageSize=10`);
        return res.map(item => this._transformHouse(item));
    }
    
    getHouse = async (id) => {
        const res = await this.getResource(`/houses/${id}`);
        return this._transformHouse(res);
    }

    getAllBooks = async (num) => {
        const res = await this.getResource(`/books?page=${num}&pageSize=10`);
        return res.map(item => this._transformBooks(item));
    }
    
    getBooks = async (id) => {
        const res = await this.getResource(`/books/${id}`);
        return this._transformBooks(res);
    }

    _transformCharacter = (char) => {
        const corrChar =this._checkingCorrInformation(char);
        return {
            name: corrChar.name,
            gender: corrChar.gender,
            born: corrChar.born,
            died: corrChar.died,
            culture: corrChar.culture,
            id: corrChar.url
        }
    }

    _transformHouse = (house) => {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBooks = (book) => {
        return {
            name: book.name,
            nameOfPages: book.nameOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }

    _checkingCorrInformation = (res) => {
        let corrObj = {};
        for (let key in res) {
            if (res[key] === ''){
                corrObj[key] = 'no info'
            } else if (key === 'url') {
                corrObj[key] = +res[key].slice(49)
            } else {
                corrObj[key] = res[key]
            }
        }

        return corrObj;
    }
}