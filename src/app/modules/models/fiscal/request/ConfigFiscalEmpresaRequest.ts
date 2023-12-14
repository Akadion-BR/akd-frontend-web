import { NfceConfigRequest } from "./nfce/NfceConfigRequest";
import { NfeConfigRequest } from "./nfe/NfeConfigRequest";
import { NfseConfigRequest } from "./nfse/NfseConfigRequest";

export class ConfigFiscalEmpresaRequest {

    discriminaImpostos: boolean;
    habilitaNfe: boolean;
    habilitaNfce: boolean; 
    habilitaNfse: boolean;
    habilitaEnvioEmailDestinatario: boolean;
    exibeReciboNaDanfe: boolean;
    cnpjContabilidade: string;
    senhaCertificadoDigital: string;
    certificadoDigital: File;
    orientacaoDanfe: string;
    regimeTributario: string;
    nfeConfig: NfeConfigRequest;
    nfceConfig: NfceConfigRequest;
    nfseConfig: NfseConfigRequest;

    constructor(item: any) {
        this.discriminaImpostos = item?.discriminaImpostos;
        this.habilitaNfe = item?.habilitaNfe;
        this.habilitaNfce = item?.habilitaNfce;
        this.habilitaNfse = item?.habilitaNfse;
        this.habilitaEnvioEmailDestinatario = item?.habilitaEnvioEmailDestinatario;
        this.exibeReciboNaDanfe = item?.exibeReciboNaDanfe;
        this.cnpjContabilidade = item?.cnpjContabilidade;
        this.senhaCertificadoDigital = item?.senhaCertificadoDigital;
        this.certificadoDigital = item?.certificadoDigital;
        this.orientacaoDanfe = item?.orientacaoDanfe;
        this.regimeTributario = item?.regimeTributario;
        this.nfeConfig = item?.nfeConfig;
        this.nfceConfig = item?.nfceConfig;
        this.nfseConfig = item?.nfseConfig;
    }
}