import { EnderecoResponse } from "../../endereco/response/EnderecoResponse";
import { ConfigFiscalEmpresaResponse } from "../../fiscal/response/ConfigFiscalEmpresaResponse";
import { ImagemResponse } from "../../imagem/ImagemResponse";
import { TelefoneResponse } from "../../telefone/response/TelefoneResponse";

export class EmpresaResponse {
    id: string;
    dataCadastro: string;
    horaCadastro: string;
    nome: string;
    razaoSocial: string;
    cnpj: string;
    endpoint: string;
    email: string;
    nomeFantasia: string;
    inscricaoEstadual: string;
    inscricaoMunicipal: string;
    ativa: boolean;
    segmentoEmpresa: string;
    logo: ImagemResponse;
    telefone: TelefoneResponse;
    endereco: EnderecoResponse;
    configFiscalEmpresa: ConfigFiscalEmpresaResponse;

    constructor(item: any) {
        this.id = item?.id;
        this.dataCadastro = item?.dataCadastro;
        this.horaCadastro = item?.horaCadastro;
        this.nome = item?.nome;
        this.razaoSocial = item?.razaoSocial;
        this.cnpj = item?.cnpj;
        this.endpoint = item?.endpoint;
        this.email = item?.email;
        this.nomeFantasia = item?.nomeFantasia;
        this.inscricaoEstadual = item?.inscricaoEstadual;
        this.inscricaoMunicipal = item?.inscricaoMunicipal;
        this.ativa = item?.ativa;
        this.segmentoEmpresa = item?.segmentoEmpresa;
        this.logo = item?.logo;
        this.telefone = item?.telefone;
        this.endereco = item?.endereco;
        this.configFiscalEmpresa = item?.configFiscalEmpresa;
    }
}