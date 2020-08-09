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
        const corrChar = this._checkingCorrInformation(char, 'char');
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
        const corrHouse = this._checkingCorrInformation(house, 'house');
        return {
            name: corrHouse.name,
            region: corrHouse.region,
            words: corrHouse.words,
            titles: corrHouse.titles,
            overlord: corrHouse.overlord,
            ancestralWeapons: corrHouse.ancestralWeapons,
            id: corrHouse.url
        }
    }

    _transformBooks = (book) => {
        const corrBook = this._checkingCorrInformation(book, 'book');
        return {
            name: corrBook.name,
            numberOfPages: corrBook.numberOfPages,
            publisher: corrBook.publisher,
            released: corrBook.released,
            id: corrBook.url
        }
    }

    _checkingCorrInformation = (res, init) => {
        let corrObj = {};
        for (let key in res) {
            if (res[key] === ''  || typeof(res[key]) === 'object'){
                if (typeof(res[key]) === 'object') {
                    let elem;
                    if (res[key].length === 0) {elem = 'no info';} else {
                        res[key].forEach(item => item === "" ? elem = 'no info' : elem = item )
                    }
                    corrObj[key] = elem
                } else {
                    corrObj[key] = 'no info'
                }
            } else if (key === 'url' && init === 'char') {
                corrObj[key] = +res[key].slice(49)
            } else if (key === 'url' && init === 'book') {
                corrObj[key] = +res[key].slice(44)
            } else if (key === 'url' && init === 'house') {
                corrObj[key] = +res[key].slice(45)
            } else {
                corrObj[key] = res[key]
            }
        }
        return corrObj;
    }
}