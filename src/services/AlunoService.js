const prisma = require("../databases/prisma");
const AlunoInvalidoError = require("../errors/AlunoInvalidoError");
const AlunoNaoEncontradoError = require("../errors/AlunoNaoEncontradoError");

class AlunoService{

    async findMany(page, pageSize, orderBy = "id", order = "asc"){
        const pagina = Number(page) > 0 ? Number(page) : 1;
        const tamanhoPagina = Number(pageSize) > 0 ? Number(pageSize) : 10;

        const camposPermitidos = ["id", "nome", "email", "createdAt"];
        const campoOrdenacao = camposPermitidos.includes(String(orderBy)) ? String(orderBy) : "id";
        const direcao = order === "desc" ? "desc" : "asc";

        const [alunos, total] = await Promise.all([
            prisma.aluno.findMany({
                skip: (pagina - 1) * tamanhoPagina,
                take: tamanhoPagina,
                orderBy: {
                    [campoOrdenacao]: direcao
                }
            }),
            prisma.aluno.count()
        ]);

        return { alunos, total };
    }

    async findById(id){
        const aluno = await prisma.aluno.findUnique({
            where: { id: Number(id) }
        });

        if (!aluno) {
            throw new AlunoNaoEncontradoError();
        }

        return aluno;
    }

    async create(aluno){
        const {nome, email} = aluno;
        if(!nome || !email){
            throw new AlunoInvalidoError();
        }
        //create = insert
        //update = update
        //delete = delete
        //findMany = select * from
        const novoAluno = await prisma.aluno.create({data:aluno});

        return novoAluno;
    }
}

module.exports = new AlunoService();