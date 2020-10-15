"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "levels",
      [
        {
          name: "1.5",
          description:
            "Você tem experiência limitada e está trabalhando principalmente para colocar a bola em jogo.",
          order: 0,
        },
        {
          name: "2.0",
          description:
            "Você não tem experiência na quadra e seus golpes precisam ser desenvolvidos. Você está familiarizado com as posições básicas para jogos de simples e duplas.",
          order: 1,
        },
        {
          name: "2.5",
          description:
            "Você está aprendendo a ler a bola, embora sua cobertura da quadra seja limitada. Você pode manter um rally curto de ritmo lento com outros jogadores da mesma habilidade.",
          order: 2,
        },
        {
          name: "3.0",
          description:
            "Você é bastante consistente ao executar golpes de ritmo médio, mas não se sente confortável com todos os movimentos e falta-lhe execução ao tentar controle direcional, profundidade ou potência. A sua formação de duplas mais comum é um a frente, um atrás.",
          order: 3,
        },
        {
          name: "3.5",
          description:
            "Você alcançou um bom controle de bola em golpes de ritmo moderado, mas precisa desenvolver profundidade e variedade. Você exibe um jogo mais agressivo, melhorou a cobertura da quadra e está desenvolvendo o trabalho em equipe em duplas.",
          order: 4,
        },
        {
          name: "4.0",
          description:
            "Você tem movimentos confiáveis, incluindo controle direcional e profundidade nos lados do forehand e backhand em golpes de ritmo moderado. Você pode usar lobs, smashes, bolas de aproximação e voleios com algum sucesso e, ocasionalmente, consegue forçar erros ao sacar. Pontos podem ser perdidos devido à impaciência. O trabalho em equipe em duplas é evidente.",
          order: 5,
        },
        {
          name: "4.5",
          description:
            "Você desenvolveu seu uso de potência e speen, e pode controlar o ritmo. Você tem um bom trabalho com os pés, pode controlar a profundidade dos golpes e tentar variar o plano de jogo de acordo com seus oponentes. Você pode atingir os primeiros saques com força e precisão e colocar o segundo saque. Você tende a exagerar a força em bolas difíceis. Joga agressivamente na rede em jogos de duplas.",
          order: 6,
        },
        {
          name: "5.0",
          description:
            "Você tem uma boa antecipação de golpes e frequentemente tem um golpe ou atributo excelente em torno do qual seu jogo pode ser estruturado. Você pode acertar winners regularmente ou forçar erros em bolas curtas e arrumar voleios. Você pode executar com sucesso lobs, drop shots, voleios, golpes aéreos e ter boa profundidade e speen na maioria dos segundos saques.",
          order: 7,
        },
        {
          name: "5.5",
          description:
            "Você dominou a potência e / ou a consistência como uma arma principal. Você pode variar estratégias e estilos de jogo em uma situação competitiva e acertar golpes confiáveis ​​em uma situação de estresse.",
          order: 8,
        },
      ],
      { fields: ["name", "description", "order"], logging: console.log }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("levels", null, {});
  },
};
