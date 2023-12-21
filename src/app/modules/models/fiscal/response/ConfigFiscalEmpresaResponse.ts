import { NfceConfigResponse } from "./nfce/NfceConfigResponse";
import { NfeConfigResponse } from "./nfe/NfeConfigResponse";
import { NfseConfigResponse } from "./nfse/NfseConfigResponse";

export class ConfigFiscalEmpresaResponse {
    discriminaImpostos: boolean;
    habilitaNfe: boolean;
    habilitaNfce: boolean;
    habilitaNfse: boolean;
    habilitaEnvioEmailDestinatario: boolean;
    cnpjContabilidade: string;
    regimeTributario: string;
    nfeConfig: NfeConfigResponse;
    nfceConfig: NfceConfigResponse;
    nfseConfig: NfseConfigResponse;

    constructor(item: any) {
        this.discriminaImpostos = item?.discriminaImpostos;
        this.habilitaNfe = item?.habilitaNfe;
        this.habilitaNfce = item?.habilitaNfce;
        this.habilitaNfse = item?.habilitaNfse;
        this.habilitaEnvioEmailDestinatario = item?.habilitaEnvioEmailDestinatario;
        this.cnpjContabilidade = item?.cnpjContabilidade;
        this.regimeTributario = item?.regimeTributario;
        this.nfeConfig = item?.nfeConfig;
        this.nfceConfig = item?.nfceConfig;
        this.nfseConfig = item?.nfseConfig;
    }
}