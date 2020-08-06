export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {throw new Error(`Could not fetch ${this._apiBase}${url}, status: ${res.status}`)}
    
        return await await res.json();
    }

    getAllCharacters(num) {
        return this.getResource(`/characters?page=${num}&pageSize=10`);
    }
    
    getCharacter(id) {
        return this.getResource(`/characters/${id}`);
    }
}