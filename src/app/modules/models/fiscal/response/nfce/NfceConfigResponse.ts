export class NfceConfigResponse {
    proximoNumeroProducao: number;
    proximoNumeroHomologacao: number;
    serieProducao: number;
    serieHomologacao: number;
    cscProducao: string;
    cscHomologacao: string;
    idTokenProducao: number;
    idTokenHomologacao: number

    constructor(item: any) {
        this.proximoNumeroProducao = item?.proximoNumeroProducao;
        this.proximoNumeroHomologacao = item?.proximoNumeroHomologacao;
        this.serieProducao = item?.serieProducao;
        this.serieHomologacao = item?.serieHomologacao;
        this.cscProducao = item?.cscProducao;
        this.cscHomologacao = item?.cscHomologacao;
        this.idTokenProducao = item?.idTokenProducao;
        this.idTokenHomologacao = item?.idTokenHomologacao;
    }
}