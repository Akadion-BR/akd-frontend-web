export class PageSettings {
    pageNumber: number;
    pageSize: number;
    sortDirection: string;

    constructor() {
        this.pageNumber = 0;
        this.pageSize = 10;
        this.sortDirection = 'DESC';
    }
}