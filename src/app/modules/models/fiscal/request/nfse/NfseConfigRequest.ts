export class NfseConfigRequest {
    proximoNumeroProducao: number | null;
    serieProducao: number | null;

    constructor(item: any) {
        this.proximoNumeroProducao = item?.proximoNumeroProducao;
        this.serieProducao = item?.serieProducao;
    }
}