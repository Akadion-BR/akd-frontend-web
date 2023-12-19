import { EnderecoRequest } from "../../endereco/request/EnderecoRequest";
import { ConfigFiscalEmpresaRequest } from "../../fiscal/request/ConfigFiscalEmpresaRequest";
import { TelefoneRequest } from "../../telefone/request/TelefoneRequest";

export class EmpresaRequest {
    razaoSocial: string;
    cnpj: string;
    endpoint: string;
    email: string;
    nomeFantasia: string;
    inscricaoEstadual: string;
    inscricaoMunicipal: string;
    segmentoEmpresa: string;
    configFiscal: ConfigFiscalEmpresaRequest;
    telefone: TelefoneRequest;
    endereco: EnderecoRequest;

    constructor(item: any) {
        this.razaoSocial = item?.razaoSocial;
        this.cnpj = item?.cnpj;
        this.endpoint = item?.endpoint;
        this.email = item?.email;
        this.nomeFantasia = item?.nomeFantasia;
        this.inscricaoEstadual = item?.inscricaoEstadual;
        this.inscricaoMunicipal = item?.inscricaoMunicipal;
        this.segmentoEmpresa = item?.segmentoEmpresa;
        this.configFiscal = item?.configFiscal;
        this.telefone = item?.telefone;
        this.endereco = item?.endereco;
    }
}