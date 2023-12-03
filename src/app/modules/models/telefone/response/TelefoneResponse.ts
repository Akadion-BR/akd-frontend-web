export class TelefoneResponse {
    prefixo: number;
    numero: number;
    tipoTelefone: string;

    constructor(item: any) {
        this.prefixo = item?.prefixo;
        this.numero = item?.numero;
        this.tipoTelefone = item?.tipoTelefone;
    }
}