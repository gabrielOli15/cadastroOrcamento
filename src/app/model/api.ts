
export class api {
    USER: string = 'TOTVS:t0tvs';
    URL: string = 'http://192.168.2.235:7200/rest'     
    
    constructor(obj = {}) {
        Object.assign(this, obj);
    }
}