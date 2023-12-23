import { CertificadoDigitalRequest } from "./certificado-digital/CertificadoDigitalRequest";
import { NfceConfigRequest } from "./nfce/NfceConfigRequest";
import { NfeConfigRequest } from "./nfe/NfeConfigRequest";
import { NfseConfigRequest } from "./nfse/NfseConfigRequest";

export class ConfigFiscalEmpresaRequest {

    discriminaImpostos: boolean;
    habilitaNfe: boolean;
    habilitaNfce: boolean;
    habilitaNfse: boolean;
    habilitaEnvioEmailDestinatario: boolean;
    cnpjContabilidade: string | null;
    senhaCertificadoDigital: string | null;
    regimeTributario: string;
    nfeConfig: NfeConfigRequest | null;
    nfceConfig: NfceConfigRequest | null;
    nfseConfig: NfseConfigRequest | null;
    certificadoDigital: CertificadoDigitalRequest | null;

    constructor(item: any) {
        this.discriminaImpostos = item?.discriminaImpostos;
        this.habilitaNfe = item?.habilitaNfe;
        this.habilitaNfce = item?.habilitaNfce;
        this.habilitaNfse = item?.habilitaNfse;
        this.habilitaEnvioEmailDestinatario = item?.habilitaEnvioEmailDestinatario;
        this.cnpjContabilidade = item?.cnpjContabilidade;
        this.senhaCertificadoDigital = item?.senhaCertificadoDigital;
        this.certificadoDigital = item?.certificadoDigital;
        this.regimeTributario = item?.regimeTributario;
        this.nfeConfig = item?.nfeConfig;
        this.nfceConfig = item?.nfceConfig;
        this.nfseConfig = item?.nfseConfig;
        this.certificadoDigital = item?.certificadoDigital;
    }
}