const jsonfile = require("jsonfile-promised");
const fs = require("fs");

module.exports = {
  salvaDados(curso, tempoEstudado) {
    let arquivoDoCurso = `${__dirname}/data/${curso}.json`;
    const exists = fs.existsSync(arquivoDoCurso);
    console.log(arquivoDoCurso, exists);
    if (exists) {
      this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
    } else {
      this.criaArquivoDeCurso(arquivoDoCurso, {}).then(() => {
        this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
      });
    }
  },
  adicionaTempoAoCurso(arquivoDoCurso, tempoDeEstudo) {
    let dados = {
      ultimoEstudo: new Date().toString(),
      tempo: tempoDeEstudo,
    };
    jsonfile
      .writeFile(arquivoDoCurso, dados, { spaces: 2 })
      .then(() => {
        console.log("Tempo Salvo com Sucesso!");
      })
      .catch((err) => console.error(err));
  },

  criaArquivoDeCurso(nomeArquivo, conteudoArquivo) {
    return jsonfile
      .writeFile(nomeArquivo, conteudoArquivo)
      .then(() => console.log("Arquivo Criado", nomeArquivo, conteudoArquivo))
      .catch((err) => console.error(err));
  },

  pegaDados(nomeCurso) {
    let arquivoDoCurso = `${__dirname}/data/${nomeCurso}.json`;
    return jsonfile.readFile(arquivoDoCurso);
  },
  pegaNomeDosCursos() {
    return fs
      .readdirSync(`${__dirname}/data/`)
      .map((item) => item.replace(".json", ""));
  },
};
