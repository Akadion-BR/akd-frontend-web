import { EnderecoRequest } from "../../../endereco/request/EnderecoRequest";
import { PlanoRequest } from "../../../plano/request/PlanoRequest";
import { TelefoneRequest } from "../../../telefone/request/TelefoneRequest";

export class AtualizacaoClienteRequest {

    dataNascimento: string;
    email: string;
    nome: string;
    senha: string;
    cpf: string;
    telefone: TelefoneRequest;
    endereco: EnderecoRequest;

    constructor(item: any) {
        this.dataNascimento = item?.dataNascimento;
        this.email = item?.email;
        this.nome = item?.nome;
        this.senha = item?.senha;
        this.cpf = item?.cpf;
        this.telefone = item?.telefone;
        this.endereco = item?.endereco;
    }

}