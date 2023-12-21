export class CertificadoDigitalRequest {
    nomeArquivo: string;
    tipoArquivo: string;
    base64: string;
    tamanhoArquivo: number;

    constructor(item: any) {
        this.nomeArquivo = item?.nomeArquivo;
        this.tipoArquivo = item?.tipoArquivo;
        this.base64 = item?.base64;
        this.tamanhoArquivo = item?.tamanhoArquivo;
    }
}