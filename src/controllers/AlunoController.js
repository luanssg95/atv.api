const alunoService = require("../services/AlunoService");

class AlunoController{

    async findMany(request, response){
        let {page, pageSize, orderBy, order} = request.query;
        page ||= 1;
        pageSize ||= 10;

        const resultado = await alunoService.findMany(page, pageSize, orderBy, order);
        return response.status(200).json(resultado);
    }

    async findById(request, response){
        try {
            const id = Number(request.params.id);
            const aluno = await alunoService.findById(id);
            return response.status(200).json({ aluno });
        } catch (e) {
            return response.status(e.statusCode || 500).json({ error: e.message });
        }
    }

    async create(request, response){
        try{
            const aluno = await alunoService.create(request.body);
            return response.status(201).json({aluno});
        }catch(e){
            return response.status(e.statusCode).json({error: e.message});
        }
    }
}

module.exports = new AlunoController();