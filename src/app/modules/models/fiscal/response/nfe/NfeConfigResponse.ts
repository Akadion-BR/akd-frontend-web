export class NfeConfigResponse {
    proximoNumeroProducao: number;
    proximoNumeroHomologacao: number;
    serieProducao: number;
    serieHomologacao: number;

    constructor(item: any) {
        this.proximoNumeroProducao = item?.proximoNumeroProducao;
        this.proximoNumeroHomologacao = item?.proximoNumeroHomologacao;
        this.serieProducao = item?.serieProducao;
        this.serieHomologacao = item?.serieHomologacao;
    }
}