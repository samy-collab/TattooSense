# Feature Specification: TattooSense Style Quiz

**Feature Branch**: `002-tattoo-style-quiz`  
**Created**: 2026-04-19  
**Status**: Draft  
**Input**: User description: "Quero criar um software chamado TattooSense. A primeira feature será um questionário inteligente para ajudar usuários a descobrirem estilos de tatuagem que combinam com sua personalidade, gostos e intenção estética. O usuário responderá perguntas sobre estilos musicais e referências culturais que gosta, estilo pessoal e visual, local do corpo onde pretende tatuar, tamanho desejado da tatuagem, se quer algo discreto ou chamativo, se deseja incluir frase, símbolo ou apenas arte visual, e tipo de sentimento ou mensagem que quer transmitir com a tatuagem. Com base nas respostas, o sistema deve analisar o perfil do usuário e sugerir estilos de tatuagem mais compatíveis, como old school, blackwork, fine line, minimalista, realista, geométrica e tribal. O resultado final deve mostrar os estilos mais compatíveis com o perfil do usuário, uma breve explicação do motivo daquela recomendação, características principais de cada estilo sugerido, e uma experiência simples, intuitiva e visualmente agradável."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Complete Tattoo Style Quiz (Priority: P1)

Uma pessoa interessada em fazer uma tatuagem responde a um questionário guiado sobre gostos, referências culturais, estilo pessoal, preferências visuais e intenção emocional para descobrir estilos de tatuagem compatíveis com seu perfil.

**Why this priority**: Este é o principal valor do TattooSense: transformar preferências pessoais em recomendações de estilos de tatuagem.

**Independent Test**: Pode ser testado por uma pessoa que inicia o questionário, responde todas as perguntas obrigatórias e chega a uma tela de resultado com recomendações coerentes com as respostas fornecidas.

**Acceptance Scenarios**:

1. **Given** que o usuário acessa o TattooSense pela primeira vez, **When** ele inicia o questionário, **Then** o sistema apresenta perguntas claras sobre personalidade, gostos e intenção estética.
2. **Given** que o usuário está respondendo ao questionário, **When** ele informa suas preferências de música, referências culturais, estilo pessoal, local do corpo, tamanho, nível de discrição, composição desejada e mensagem emocional, **Then** o sistema registra essas respostas para análise do perfil.
3. **Given** que o usuário tenta finalizar o questionário sem responder uma pergunta obrigatória, **When** ele solicita o resultado, **Then** o sistema indica quais respostas ainda precisam ser preenchidas de forma clara e não punitiva.

---

### User Story 2 - Receive Compatible Style Recommendations (Priority: P2)

Após concluir o questionário, o usuário recebe uma lista priorizada de estilos de tatuagem que combinam com seu perfil, acompanhada de explicações compreensíveis.

**Why this priority**: A recomendação final é o resultado esperado pelo usuário e precisa gerar confiança suficiente para orientar a escolha estética.

**Independent Test**: Pode ser testado com conjuntos de respostas diferentes e verificação de que o resultado apresenta estilos, justificativas e características principais alinhadas às preferências indicadas.

**Acceptance Scenarios**:

1. **Given** que o usuário concluiu o questionário, **When** o sistema analisa o perfil, **Then** ele exibe os estilos de tatuagem mais compatíveis em ordem de relevância.
2. **Given** que um estilo foi recomendado, **When** o usuário visualiza o resultado, **Then** ele vê uma breve explicação do motivo da recomendação e as principais características daquele estilo.
3. **Given** que as respostas do usuário indicam preferências mistas, **When** o resultado é gerado, **Then** o sistema apresenta mais de uma sugestão compatível em vez de forçar uma única resposta.

---

### User Story 3 - Explore Recommendations Visually (Priority: P3)

O usuário visualiza os estilos recomendados em uma experiência simples, intuitiva e agradável, com informações fáceis de comparar antes de buscar um tatuador ou referência visual.

**Why this priority**: A apresentação visual melhora a compreensão dos estilos e ajuda o usuário a se sentir mais seguro sobre as recomendações.

**Independent Test**: Pode ser testado observando se o usuário consegue entender e comparar os estilos sugeridos sem orientação externa.

**Acceptance Scenarios**:

1. **Given** que o usuário chegou ao resultado, **When** ele compara os estilos sugeridos, **Then** consegue identificar rapidamente nome, compatibilidade, motivo e características principais de cada estilo.
2. **Given** que o usuário está em um dispositivo com tela menor, **When** ele visualiza o questionário e o resultado, **Then** o conteúdo permanece legível, organizado e fácil de navegar.

### Edge Cases

- O usuário escolhe respostas contraditórias, como uma tatuagem muito discreta e muito chamativa ao mesmo tempo.
- O usuário não conhece alguns termos de tatuagem ou referências culturais apresentadas no questionário.
- O usuário prefere apenas frase, apenas símbolo ou apenas arte visual, exigindo recomendações compatíveis com composições diferentes.
- O usuário escolhe uma área do corpo pequena com desejo de tatuagem grande ou muito detalhada.
- O usuário fornece respostas neutras ou genéricas, reduzindo a diferenciação entre estilos.
- O usuário abandona o questionário antes de finalizar e depois deseja recomeçar.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE apresentar um questionário guiado sobre gostos musicais, referências culturais, estilo visual pessoal, local pretendido no corpo, tamanho desejado, nível de discrição, tipo de composição desejada e sentimento ou mensagem pretendida.
- **FR-002**: O sistema DEVE indicar claramente quais perguntas do questionário são obrigatórias antes de gerar recomendações.
- **FR-003**: O usuário DEVE conseguir selecionar ou informar respostas que expressem preferências pessoais sem precisar conhecer termos técnicos de tatuagem.
- **FR-004**: O sistema DEVE analisar as respostas como um perfil que represente preferências estéticas, gostos culturais, restrições de local no corpo, expectativa de tamanho, nível de visibilidade, preferência de composição e intenção emocional.
- **FR-005**: O sistema DEVE recomendar estilos de tatuagem compatíveis a partir de um catálogo inicial que inclua old school, blackwork, fine line, minimalista, realista, geometrica e tribal.
- **FR-006**: O sistema DEVE apresentar mais de um estilo compatível quando o perfil do usuário combinar razoavelmente com múltiplos estilos.
- **FR-007**: Cada estilo recomendado DEVE incluir uma explicação breve conectando a recomendação às respostas do usuário.
- **FR-008**: Cada estilo recomendado DEVE incluir suas principais características em linguagem compreensível para usuários não especialistas.
- **FR-009**: O sistema DEVE tornar o resultado fácil de comparar ao mostrar, em conjunto, nome do estilo, indicação de compatibilidade, motivo da recomendação e características do estilo.
- **FR-010**: O sistema DEVE lidar com respostas incompletas, neutras ou conflitantes com orientação clara ou recomendações equilibradas, em vez de produzir um resultado sem explicação.
- **FR-011**: A experiência do usuário DEVE permanecer simples, intuitiva, visualmente agradável e adequada para pessoas que estão explorando ideias de tatuagem pela primeira vez.
- **FR-012**: O sistema DEVE evitar apresentar recomendações como conselho profissional de tatuagem, saúde, jurídico ou segurança; os resultados são apenas orientação estética.

### Key Entities

- **Resposta do Questionario**: Representa as respostas do usuário sobre gostos, referências, estilo visual, local pretendido, tamanho da tatuagem, preferência de visibilidade, tipo de composição e mensagem desejada.
- **Perfil de Estilo do Usuario**: Representa o perfil estético interpretado a partir das respostas do questionário, incluindo preferências, restrições e intenção emocional.
- **Estilo de Tatuagem**: Representa um estilo disponível para recomendação, incluindo nome, características definidoras, traços visuais típicos e sinais de adequação.
- **Recomendacao de Estilo**: Representa um estilo sugerido para um perfil específico, incluindo indicação de compatibilidade, explicação e características exibidas ao usuário.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Pelo menos 90% dos usuários de primeira viagem conseguem completar o questionário e chegar a um resultado de recomendação sem ajuda externa.
- **SC-002**: Usuários conseguem completar o questionário e revisar as recomendações iniciais em menos de 5 minutos.
- **SC-003**: 95% dos questionários concluídos produzem pelo menos duas recomendações de estilo compatíveis com explicações.
- **SC-004**: Pelo menos 85% dos usuários conseguem explicar corretamente por que o principal estilo recomendado foi sugerido após ler o resultado.
- **SC-005**: Pelo menos 80% dos usuários avaliam a experiência de recomendação como clara, útil ou visualmente agradável em feedback após o resultado.
- **SC-006**: Todos os resultados de recomendação incluem nome do estilo, explicação e características principais para cada estilo sugerido.

## Assumptions

- A primeira versão foca descoberta estética e educação, não agendamento com tatuadores, geração de arte final de tatuagem ou orientação de segurança para tatuagem.
- O questionário pode ser concluído sem exigir conta de usuário.
- O catálogo inicial de estilos é intencionalmente limitado aos estilos comuns citados na solicitação da feature e pode expandir depois.
- As recomendações são baseadas nas preferências informadas pelo usuário e devem ser tratadas como orientação, não como direção artística definitiva.
- A experiência deve funcionar bem em tamanhos comuns de tela de celular e desktop, pois usuários podem explorar ideias de tatuagem de forma casual.
