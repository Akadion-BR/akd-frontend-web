import { EmpresaResponse } from "./EmpresaResponse";

export class EmpresaPageResponse {
    content: EmpresaResponse[];
    numberOfElements: number;
    pageNumber: number;
    pageSize: number;
    size: number;
    totalElements: number;
    totalPages: number;
    sortDirection: string;

    constructor(item: any) {
        this.content = item?.content;
        this.numberOfElements = item?.numberOfElements;
        this.pageNumber = item?.pageNumber;
        this.pageSize = item?.pageSize;
        this.size = item?.size;
        this.totalElements = item?.totalElements;
        this.totalPages = item?.totalPages;
        this.sortDirection = item?.sortDirection;
    }
}