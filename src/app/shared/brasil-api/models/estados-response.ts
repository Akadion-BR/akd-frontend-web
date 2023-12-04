export class EstadosResponse {
    sigla: string;
    nome: string;

    constructor(item: any) {
        this.sigla = item?.sigla;
        this.nome = item?.nome;
    }


}
