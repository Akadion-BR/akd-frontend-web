export class ConsultaCepResponse {
    logradouro: string;
    bairro: string;
    codigoPostal: string;
    cidade: string;
    estado: string;

    constructor(item: any) {
        this.codigoPostal = item?.cep;
        this.estado = item?.state;
        this.cidade = item?.city;
        this.bairro = item?.neighborhood;
        this.logradouro = item?.street;
    }
}
