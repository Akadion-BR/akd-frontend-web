export class EnderecoResponse {
    logradouro: string;
    numero: number;
    bairro: string;
    codigoPostal: string;
    cidade: string;
    complemento: string;
    estado: string;

    constructor(item: any) {
        this.logradouro = item?.logradouro;
        this.numero = item?.numero;
        this.bairro = item?.bairro;
        this.codigoPostal = item?.codigoPostal;
        this.cidade = item?.cidade;
        this.complemento = item?.complemento;
        this.estado = item?.estado;
    }
}