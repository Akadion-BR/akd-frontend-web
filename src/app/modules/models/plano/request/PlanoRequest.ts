export class PlanoRequest {
    tipoPlano: string;
    formaPagamentoSistema: string;

    constructor(item: any) {
        this.tipoPlano = item?.tipoPlano;
        this.formaPagamentoSistema = item?.formaPagamentoSistema;
    }
}