import { Task } from './Task.js';

class Todos {
    #tasks = [];
    #backendUrl = '';  

    constructor(url) {
        this.#backendUrl = url;
    }

    getTasks = () => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backendUrl)
                .then(response => response.json())
                .then((json) => {
                    this.#readJson(json);
                    resolve(this.#tasks);   
                }, (error) => {
                    reject(error);
                })
        });
    }

    addTask = (text) => {
        return new Promise(async (resolve, reject) => {
            const json = JSON.stringify({ description: text });
            fetch(this.#backendUrl + '/new', {  
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
            .then(response => response.json())
            .then((json) => {  
                const task = new Task(json.id, text);
                this.#tasks.push(task);
                resolve(task);
            }, (error) => {
                reject(error);
            })
        });
    };

    #readJson = (tasksAsJson) => {
        tasksAsJson.forEach(node => {
            const task = new Task(node.id, node.description);
            this.#tasks.push(task);
        });
    }
}

export { Todos };