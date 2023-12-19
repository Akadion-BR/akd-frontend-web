export class NfeConfigRequest {

    proximoNumeroProducao: number;
    serieProducao: number;
    exibirReciboNaDanfe: boolean;
    imprimirColunasDoIpi: boolean;
    mostraDadosDoIssqn: boolean;
    imprimirImpostosAdicionaisNaDanfe: boolean;
    sempreMostrarVolumesNaDanfe: boolean;

    constructor(item: any) {
        this.proximoNumeroProducao = item?.proximoNumeroProducao;
        this.serieProducao = item?.serieProducao;
        this.exibirReciboNaDanfe = item?.exibirReciboNaDanfe;
        this.imprimirColunasDoIpi = item?.imprimirColunasDoIpi;
        this.mostraDadosDoIssqn = item?.mostraDadosDoIssqn;
        this.imprimirImpostosAdicionaisNaDanfe = item?.imprimirImpostosAdicionaisNaDanfe;
        this.sempreMostrarVolumesNaDanfe = item?.sempreMostrarVolumesNaDanfe;
    }
}