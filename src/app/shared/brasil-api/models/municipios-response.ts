export class MunicipiosResponse {
    nome: string;

    constructor(item: any) {
        this.nome = item?.nome;
    }
}
