export class NfceConfigRequest {

    proximoNumeroProducao: number | null;
    serieProducao: number | null;
    cscProducao: string | null;
    idTokenProducao: number | null;

    constructor(item: any) {
        this.proximoNumeroProducao = item?.proximoNumeroProducao;
        this.serieProducao = item?.serieProducao;
        this.cscProducao = item?.cscProducao;
        this.idTokenProducao = item?.idTokenProducao;
    }
}