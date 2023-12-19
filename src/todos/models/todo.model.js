import { v4 as uuid } from "uuid";

export class Todo {


    /**
     * 
     * @param {String} description 
     */
    constructor ( description ){
        this.id = uuid(); // Esto da un ID unico y no se cambia se instala por npm
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }
}