export class NfceConfigRequest {

    proximoNumeroProducao: number;
    serieProducao: number;
    cscProducao: string;
    idTokenProducao: number;

    constructor(item: any) {
        this.proximoNumeroProducao = item?.proximoNumeroProducao;
        this.serieProducao = item?.serieProducao;
        this.cscProducao = item?.cscProducao;
        this.idTokenProducao = item?.idTokenProducao;
    }
}