export class NfseConfigRequest {
    proximoNumeroProducao: number;
    serieProducao: number;

    constructor(item: any) {
        this.proximoNumeroProducao = item?.proximoNumeroProducao;
        this.serieProducao = item?.serieProducao;
    }
}