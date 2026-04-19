import { PrismaClient, type Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const styles = [
  {
    key: "old_school",
    name: "Old School",
    summary: "Estilo classico, marcante e colorido, com simbolos fortes e leitura imediata.",
    characteristics: ["contornos grossos", "cores solidas", "temas nauticos e tradicionais"],
    visualTraits: ["alto contraste", "paleta vibrante", "formas iconicas"]
  },
  {
    key: "blackwork",
    name: "Blackwork",
    summary: "Composicoes em preto intenso para quem busca impacto, contraste e presenca visual.",
    characteristics: ["preto dominante", "areas preenchidas", "composicao grafica"],
    visualTraits: ["massa escura", "linhas fortes", "texturas em preto"]
  },
  {
    key: "fine_line",
    name: "Fine Line",
    summary: "Tatuagens delicadas com linhas finas, detalhes leves e acabamento elegante.",
    characteristics: ["traco fino", "detalhamento sutil", "visual delicado"],
    visualTraits: ["linhas precisas", "pouco preenchimento", "leveza"]
  },
  {
    key: "minimalist",
    name: "Minimalista",
    summary: "Ideias reduzidas ao essencial, com leitura discreta e formas simples.",
    characteristics: ["simplicidade", "poucos elementos", "espaco negativo"],
    visualTraits: ["formas pequenas", "baixo contraste", "simbolos sinteticos"]
  },
  {
    key: "realistic",
    name: "Realista",
    summary: "Indicado para retratos, natureza e referencias visuais com profundidade e detalhe.",
    characteristics: ["sombras elaboradas", "volume", "fidelidade visual"],
    visualTraits: ["gradientes", "detalhes finos", "efeito fotografico"]
  },
  {
    key: "geometric",
    name: "Geometrica",
    summary: "Padroes, simetria e organizacao visual para um resultado moderno e preciso.",
    characteristics: ["simetria", "padroes", "formas abstratas"],
    visualTraits: ["linhas retas", "repeticao", "equilibrio matematico"]
  },
  {
    key: "tribal",
    name: "Tribal",
    summary: "Formas organicas e marcantes com foco em movimento, identidade e presenca corporal.",
    characteristics: ["formas fluidas", "alto contraste", "composicao corporal"],
    visualTraits: ["curvas pretas", "ritmo visual", "silhueta forte"]
  }
];

const questions = [
  {
    key: "music",
    title: "Que tipo de musica mais combina com sua energia?",
    description: "Escolha a referencia mais proxima do seu gosto.",
    category: "music",
    inputType: "single_choice",
    sortOrder: 1,
    options: [
      ["rock_classic", "Rock classico ou punk", "Atitude direta e visual marcante"],
      ["indie_soft", "Indie, folk ou sons leves", "Clima delicado e pessoal"],
      ["electronic", "Eletronica ou experimental", "Ritmo moderno e abstrato"],
      ["hiphop", "Hip hop ou urbano", "Expressao forte e contemporanea"]
    ]
  },
  {
    key: "culture",
    title: "Quais referencias culturais mais chamam sua atencao?",
    description: "Pode escolher mais de uma.",
    category: "culture",
    inputType: "multi_choice",
    sortOrder: 2,
    options: [
      ["vintage", "Objetos e cartazes vintage", "Nostalgia e tradicao visual"],
      ["nature", "Natureza, animais e paisagens", "Imagem organica e emotiva"],
      ["architecture", "Arquitetura, padroes e tecnologia", "Precisao e estrutura"],
      ["ancestry", "Ancestralidade e simbolos de identidade", "Pertencimento e memoria"]
    ]
  },
  {
    key: "personal_style",
    title: "Como voce descreve seu estilo visual no dia a dia?",
    category: "personal_style",
    inputType: "single_choice",
    sortOrder: 3,
    options: [
      ["classic_bold", "Classico com presenca", "Gosta de pecas reconheciveis e fortes"],
      ["clean_discreet", "Limpo e discreto", "Prefere poucos elementos"],
      ["dark_edgy", "Escuro e alternativo", "Curte contraste e impacto"],
      ["detailed_artistic", "Detalhado e artistico", "Valoriza acabamento e riqueza visual"]
    ]
  },
  {
    key: "body_placement",
    title: "Onde voce imagina fazer a tatuagem?",
    category: "body_placement",
    inputType: "single_choice",
    sortOrder: 4,
    options: [
      ["arm", "Braco ou antebraco", "Area versatil para varios tamanhos"],
      ["wrist_ankle", "Pulso, tornozelo ou nuca", "Areas pequenas e discretas"],
      ["back_chest", "Costas, peito ou coxa", "Mais espaco para composicoes"],
      ["hand_neck", "Mao, pescoco ou area muito visivel", "Presenca visual alta"]
    ]
  },
  {
    key: "size",
    title: "Qual tamanho voce imagina?",
    category: "size",
    inputType: "single_choice",
    sortOrder: 5,
    options: [
      ["tiny", "Pequena", "Algo rapido de reconhecer e facil de esconder"],
      ["medium", "Media", "Equilibrio entre detalhe e praticidade"],
      ["large", "Grande", "Espaco para impacto ou detalhes"]
    ]
  },
  {
    key: "visibility",
    title: "Voce quer algo discreto ou chamativo?",
    category: "visibility",
    inputType: "scale",
    sortOrder: 6,
    options: []
  },
  {
    key: "composition",
    title: "Que tipo de composicao voce prefere?",
    category: "composition",
    inputType: "single_choice",
    sortOrder: 7,
    options: [
      ["phrase", "Frase ou palavra", "Mensagem direta em texto"],
      ["symbol", "Simbolo", "Ideia resumida em uma forma"],
      ["visual_art", "Arte visual", "Imagem como foco principal"],
      ["pattern", "Padrao ou abstracao", "Ritmo visual e formas"]
    ]
  },
  {
    key: "emotion",
    title: "Que sentimento ou mensagem voce quer transmitir?",
    category: "emotion",
    inputType: "multi_choice",
    sortOrder: 8,
    options: [
      ["strength", "Forca", "Presenca, resistencia e decisao"],
      ["memory", "Memoria", "Afeto, homenagem ou historia pessoal"],
      ["freedom", "Liberdade", "Movimento e expressao"],
      ["balance", "Equilibrio", "Calma, ordem e clareza"]
    ]
  }
] satisfies Array<{
  key: string;
  title: string;
  description?: string;
  category: Prisma.QuizQuestionCreateInput["category"];
  inputType: Prisma.QuizQuestionCreateInput["inputType"];
  sortOrder: number;
  options: Array<[string, string, string]>;
}>;

const optionRules: Record<string, Array<[string, number, string]>> = {
  "music:rock_classic": [["old_school", 8, "energia classica e atitude visual"], ["blackwork", 4, "preferencia por presenca forte"]],
  "music:indie_soft": [["fine_line", 7, "referencias leves e pessoais"], ["minimalist", 6, "gosto por sutileza"]],
  "music:electronic": [["geometric", 7, "afinidade com ritmo, padroes e modernidade"], ["blackwork", 3, "interesse por contraste grafico"]],
  "music:hiphop": [["blackwork", 6, "expressao urbana marcante"], ["old_school", 4, "atitude e leitura imediata"]],
  "culture:vintage": [["old_school", 8, "referencias vintage e tradicionais"]],
  "culture:nature": [["realistic", 7, "interesse por natureza e imagem detalhada"], ["fine_line", 4, "temas organicos delicados"]],
  "culture:architecture": [["geometric", 8, "apreco por estrutura e padroes"], ["minimalist", 3, "preferencia por formas limpas"]],
  "culture:ancestry": [["tribal", 8, "busca por identidade e simbolos de pertencimento"], ["blackwork", 4, "forca grafica em preto"]],
  "personal_style:classic_bold": [["old_school", 7, "estilo classico com presenca"], ["tribal", 3, "preferencia por impacto corporal"]],
  "personal_style:clean_discreet": [["minimalist", 8, "visual limpo e discreto"], ["fine_line", 6, "acabamento delicado"]],
  "personal_style:dark_edgy": [["blackwork", 8, "gosto por contraste escuro"], ["tribal", 4, "formas fortes e organicas"]],
  "personal_style:detailed_artistic": [["realistic", 8, "valorizacao de detalhe artistico"], ["fine_line", 4, "apreco por precisao"]],
  "body_placement:wrist_ankle": [["minimalist", 6, "area pequena e discreta"], ["fine_line", 5, "boa leitura em areas delicadas"]],
  "body_placement:back_chest": [["realistic", 5, "espaco para detalhe"], ["blackwork", 4, "area permite impacto"], ["tribal", 5, "composicao acompanha o corpo"]],
  "body_placement:hand_neck": [["blackwork", 5, "alta visibilidade pede presenca"], ["old_school", 4, "leitura rapida em area visivel"]],
  "size:tiny": [["minimalist", 8, "tamanho pequeno favorece simbolos simples"], ["fine_line", 6, "traco delicado em pequena escala"]],
  "size:medium": [["old_school", 4, "tamanho medio comporta simbolos claros"], ["geometric", 4, "espaco para padroes precisos"]],
  "size:large": [["realistic", 7, "tamanho grande favorece detalhe"], ["blackwork", 6, "impacto em escala maior"], ["tribal", 5, "composicao corporal ampla"]],
  "composition:phrase": [["fine_line", 5, "frases funcionam bem com traco leve"], ["minimalist", 4, "mensagem direta e simples"]],
  "composition:symbol": [["minimalist", 6, "simbolo sintetico"], ["old_school", 4, "icone forte e reconhecivel"]],
  "composition:visual_art": [["realistic", 7, "foco em imagem detalhada"], ["old_school", 5, "arte visual de leitura forte"]],
  "composition:pattern": [["geometric", 8, "preferencia por padroes"], ["tribal", 6, "formas ritmadas e organicas"]],
  "emotion:strength": [["blackwork", 7, "mensagem de forca e presenca"], ["tribal", 6, "identidade e impacto"]],
  "emotion:memory": [["realistic", 6, "memoria em imagem detalhada"], ["fine_line", 5, "homenagem sutil"]],
  "emotion:freedom": [["old_school", 5, "simbolos de liberdade e movimento"], ["tribal", 4, "formas fluidas"]],
  "emotion:balance": [["geometric", 7, "equilibrio e simetria"], ["minimalist", 5, "clareza e calma visual"]]
};

async function main() {
  for (const style of styles) {
    await prisma.tattooStyle.upsert({
      where: { key: style.key },
      update: style,
      create: style
    });
  }

  for (const question of questions) {
    const createdQuestion = await prisma.quizQuestion.upsert({
      where: { key: question.key },
      update: {
        title: question.title,
        description: question.description ?? null,
        category: question.category,
        inputType: question.inputType,
        sortOrder: question.sortOrder,
        isRequired: true,
        isActive: true
      },
      create: {
        key: question.key,
        title: question.title,
        description: question.description ?? null,
        category: question.category,
        inputType: question.inputType,
        sortOrder: question.sortOrder,
        isRequired: true,
        isActive: true
      }
    });

    for (const [index, [key, label, description]] of question.options.entries()) {
      await prisma.answerOption.upsert({
        where: { questionId_key: { questionId: createdQuestion.id, key } },
        update: { label, description, sortOrder: index + 1, isActive: true },
        create: { questionId: createdQuestion.id, key, label, description, sortOrder: index + 1, isActive: true }
      });
    }
  }

  await prisma.compatibilityRule.deleteMany();
  const styleByKey = new Map((await prisma.tattooStyle.findMany()).map((style) => [style.key, style]));
  const questionByKey = new Map((await prisma.quizQuestion.findMany()).map((question) => [question.key, question]));
  const options = await prisma.answerOption.findMany({ include: { question: true } });
  const optionByPair = new Map(options.map((option) => [`${option.question.key}:${option.key}`, option]));

  for (const [pair, rules] of Object.entries(optionRules)) {
    const [questionKey] = pair.split(":");
    for (const [styleKey, weight, reasonTemplate] of rules) {
      const style = styleByKey.get(styleKey);
      const question = questionByKey.get(questionKey);
      const option = optionByPair.get(pair);
      if (!style || !question || !option) continue;
      await prisma.compatibilityRule.create({
        data: { styleId: style.id, questionId: question.id, answerOptionId: option.id, weight, reasonTemplate }
      });
    }
  }

  const visibilityQuestion = questionByKey.get("visibility");
  const minimalist = styleByKey.get("minimalist");
  const blackwork = styleByKey.get("blackwork");
  if (visibilityQuestion && minimalist && blackwork) {
    await prisma.compatibilityRule.createMany({
      data: [
        {
          styleId: minimalist.id,
          questionId: visibilityQuestion.id,
          condition: { all: [{ questionKey: "visibility", scaleMax: 2 }] },
          weight: 3,
          reasonTemplate: "preferencia por algo mais discreto"
        },
        {
          styleId: blackwork.id,
          questionId: visibilityQuestion.id,
          condition: { all: [{ questionKey: "visibility", scaleMin: 4 }] },
          weight: 5,
          reasonTemplate: "abertura para resultado chamativo"
        }
      ]
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  });
