import type { Project } from "@/types/portfolio";

export const projects = [
    {
    slug: "deixa-na-conta",
    title: "Deixa na Conta",
    shortDescription: "Aplicação de gestão financeira e de clientes, com controle de cobranças e pagamentos.",
    role: "Atuação na evolução de interfaces, validações, regras de negócio e persistência de dados.",
    featured: true,
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Auth0", "libphonenumber-js"],
    repositoryPrivate: true,
    confidentialityNotice:
      "O código-fonte deste projeto não está disponível publicamente. As informações apresentadas neste case foram selecionadas para demonstrar minha participação técnica sem expor código ou dados confidenciais.",
    highlights: [
      "Implementação da autenticação e controle de acesso com Auth0.",
      "Desenvolvimento e evolução da área de configurações de conta e perfil.",
      "Participação na implementação do fluxo de criação de assinaturas.",
      "Criação de funcionalidades de compartilhamento de cobranças com clientes.",
      "Refatoração de fluxos para separar interface, regras de negócio, actions e acesso aos dados.",
      "Atualização e manutenção da aplicação em Next.js.",
    ],
    caseStudy: {
      context: [
        "O Deixa na Conta é uma aplicação de gestão financeira e de clientes que reúne autenticação, configurações de conta, assinaturas e compartilhamento de informações de cobrança.",
        "O produto permite registrar receitas e gastos, calcular o resultado financeiro de cada mês e manter os dados entre os meses. Valores que permanecem iguais podem ser reaproveitados, alterando apenas o que mudou.",
        "Essas funcionalidades descrevem o produto como um todo. Minha atuação nas entregas individuais e colaborativas está detalhada a seguir.",
      ],
      problem: [
        "A aplicação precisava concentrar autenticação, gerenciamento de conta, clientes, assinaturas e cobranças em uma única experiência.",
        "Durante a evolução do produto, foi necessário refinar validações, persistência e atualização dos dados, operações assíncronas e feedback para o usuário. A distribuição de responsabilidades e a comunicação entre cliente e servidor também precisavam ser aprimoradas.",
      ],
      solution: [
        "A aplicação foi estruturada para centralizar autenticação, gerenciamento de conta, clientes, assinaturas e compartilhamento de cobranças.",
        "Os fluxos foram desenvolvidos e refinados com separação entre interface, regras de negócio, acesso aos dados, models/schemas e operações executadas no servidor.",
        "A evolução incluiu validações, tratamento de operações assíncronas, feedback após salvamento e atualização da interface com os dados persistidos. Simplificações e refatorações tornaram mais clara a organização desses fluxos.",
      ],
      participation: ["Atuei na construção e evolução de interfaces, validações, regras de negócio, comunicação entre cliente e servidor, persistência de dados e organização das responsabilidades internas da aplicação."],
      contributions: [
        {
          title: "Autenticação e controle de acesso",
          description: "Configurei a autenticação com Auth0 e implementei validação de login e restrição de funcionalidades a usuários autenticados. Também simplifiquei a lógica e removi código que deixou de ser necessário.",
        },
        {
          title: "Assinaturas — entrega colaborativa",
          description: "Participei da implementação do fluxo de criação de assinaturas. Minhas contribuições incluíram a estrutura da tabela, a criação de assinaturas e a validação para evitar e-mail duplicado. A entrega também contou com contribuições de outro desenvolvedor.",
        },
        {
          title: "Configurações de conta e perfil",
          description: "Atuei na criação e evolução da tela de configurações, na tipagem do formulário e na reorganização de models e schemas. Implementei validação de telefone, tratamento de valores ausentes, verificação de autenticação nos casos de uso e atualização da interface após persistir os dados. Usei useTransition e feedback visual no salvamento, além de reduzir resets manuais com os dados da conta como valores iniciais.",
        },
        {
          title: "Compartilhamento de cobranças",
          description: "Implementei o componente de ação e o fluxo de compartilhamento de cobrança na tela de vendas, com busca dos dados do cliente por identificador e Server Action. Atuei no tratamento assíncrono, na validação e normalização de telefone com libphonenumber-js e no uso de uma mensagem padrão configurável.",
        },
        {
          title: "Visualização de clientes",
          description: "Participei da implementação da visualização e gestão de clientes por meio de uma DataTable/Data Grid.",
          // TODO: confirmar informação com Matheus. Detalhes de busca, paginação, filtros e ações da tabela.
        },
        {
          title: "Manutenção e evolução técnica",
          description: "Participei da manutenção técnica, incluindo a atualização do Next.js para a versão 15.2.6, refatorações, simplificação de lógica e remoção de código desnecessário durante a evolução das funcionalidades.",
        },
      ],
      architecture: [
        {
          title: "Interface e operações no servidor",
          description: "Componentes de interface e actions executadas no servidor organizam a comunicação dos formulários e demais fluxos com as operações da aplicação.",
        },
        {
          title: "Regras de negócio e persistência",
          description: "Casos de uso e regras de negócio são separados do acesso aos dados, persistidos em PostgreSQL. Durante a evolução das funcionalidades, responsabilidades foram reorganizadas para evitar a concentração de lógica em um único ponto.",
        },
        {
          title: "Modelos, validação e tipagem",
          description: "Models, schemas e tipos descrevem e validam os dados utilizados pelos formulários e fluxos. Essa organização torna mais claro o caminho entre interface, regras de negócio e persistência.",
        },
      ],
      technicalCase: {
        title: "Evolução do fluxo de configurações da conta",
        problem: "O fluxo de configurações acumulava responsabilidades relacionadas ao formulário, às regras de negócio, à atualização dos dados e à comunicação com o servidor.",
        investigation: "Durante a evolução da funcionalidade, foram identificados tratamentos manuais e responsabilidades que poderiam ser melhor distribuídas. Também foi necessário tratar valores ausentes, validação de telefone, autenticação, atualização dos dados após o salvamento e estados de operações assíncronas.",
        correction: "Reorganizei responsabilidades entre interface, casos de uso, actions e acesso aos dados. Passei a utilizar os dados da conta como valores iniciais do formulário, reduzindo resets manuais. O fluxo recebeu tratamento assíncrono, feedback visual após as operações e refinamento de models e schemas.",
        result: "O fluxo ficou mais organizado, com responsabilidades mais bem definidas e menos manipulação manual do estado do formulário. O caminho dos dados entre interface, regras de negócio e persistência também ficou mais claro.",
      },
    },
    // TODO: confirmar informação com Matheus. Screenshots autorizadas, aplicação pública, deploy e infraestrutura.
  },


  {
    slug: "get-doc",
    title: "GET DOC",
    shortDescription:
      "Sistema de registro e tabulação de atendimentos utilizado em contexto profissional real.",
    role: "Participação em frontend, backend, dados e deploy.",
    featured: true,
    // TODO: confirmar informação com Matheus. Tecnologias divulgáveis do GET DOC.
    technologies: [],
    highlights: [
      "90 atendentes",
      "Mais de 3.000 atendimentos registrados diariamente",
    ],
    proprietary: true,
    confidentialityNotice:
      "Projeto proprietário. O código não está disponível publicamente por política da empresa.",
    caseStudy: {
      context: ["Sistema de registro e tabulação de atendimentos utilizado em contexto profissional real."],
      problem: ["Registrar e tabular os atendimentos de uma operação com 90 atendentes e mais de 3.000 atendimentos registrados diariamente."],
      solution: [
        "O GET DOC permite registrar e tabular os atendimentos dessa operação.",
        // TODO: confirmar informação com Matheus. Fluxos e decisões técnicas divulgáveis.
      ],
      participation: ["Participei do desenvolvimento da solução de ponta a ponta, atuando desde a modelagem dos dados até o desenvolvimento do frontend, backend e processo de deploy."],
      metrics: [
        { value: "90", label: "atendentes" },
        { value: "3.000+", label: "atendimentos registrados diariamente" },
      ],
    },
  },

] satisfies readonly Project[];
// TODO: confirmar informação com Matheus. Status, arquiteturas reais e imagens permitidas.
// TODO: confirmar informação com Matheus. Repositório e demonstração pública, se existirem.
