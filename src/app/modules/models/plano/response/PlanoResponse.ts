export class PlanoResponse {
    id: string;
    dataContratacao: string;
    horaContratacao: string;
    dataVencimento: string;
    dataAgendamentoRemocao: string;
    tipoPlano: string;
    statusPlano: string;
    formaPagamentoSistema: string;

    constructor(item: any) {
        this.id = item?.id;
        this.dataContratacao = item?.dataContratacao;
        this.horaContratacao = item?.horaContratacao;
        this.dataVencimento = item?.dataVencimento;
        this.dataAgendamentoRemocao = item?.dataAgendamentoRemocao;
        this.tipoPlano = item?.tipoPlano;
        this.statusPlano = item?.statusPlano;
        this.formaPagamentoSistema = item?.formaPagamentoSistema;
    }
}