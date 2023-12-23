export class TelefoneRequest {
    prefixo: number;
    numero: number;
    tipoTelefone: string | null;

    constructor(item: any) {
        this.prefixo = item?.prefixo;
        this.numero = item?.numero;
        this.tipoTelefone = item?.tipoTelefone;
    }
}