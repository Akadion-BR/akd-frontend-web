import { EnderecoResponse } from "../../endereco/response/EnderecoResponse";
import { PlanoResponse } from "../../plano/response/PlanoResponse";
import { TelefoneResponse } from "../../telefone/response/TelefoneResponse";

export class ClienteResponse {
    id: string;
    dataCadastro: string;
    horaCadastro: string;
    dataNascimento: string;
    email: string;
    nome: string;
    senha: string;
    cpf: string;
    saldo: number;
    plano: PlanoResponse;
    telefone: TelefoneResponse;
    endereco: EnderecoResponse;

    constructor(item: any) {
        this.dataNascimento = item?.dataNascimento;
        this.email = item?.email;
        this.nome = item?.nome;
        this.senha = item?.senha;
        this.cpf = item?.cpf;
        this.plano = item?.plano;
        this.telefone = item?.telefone;
        this.endereco = item?.endereco;
    }

}