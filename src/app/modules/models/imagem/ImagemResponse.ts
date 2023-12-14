export class ImagemResponse {

    nome: string;
    tamanho: number;
    tipo: string;
    arquivo: File

    constructor (item: any) {
        this.nome = item?.nome;
        this.tamanho = item?.tamanho;
        this.tipo = item?.tipo;
        this.arquivo = item?.arquivo;
    }
}