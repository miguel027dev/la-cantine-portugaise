# Briefing — La Cantine Portugaise, Nantes

Pesquisa e conceito: 11 de outubro de 2026. Projeto de redesign independente / **protótipo não oficial**.

## 1. Identidade e dados confirmados

- **Nome oficial (francês):** La Cantine Portugaise.
- **Categoria:** restaurante de especialidades portuguesas com cozinha tradicional e familiar.
- **Endereço atual:** 57 Quai Magellan, 44000 Nantes, France.
- **Telefone:** +33 7 45 13 57 50.
- **E-mail indicado na página do restaurante:** latable-rondeportugaise@outlook.com.
- **Localização:** próximo dos cais do rio Loire, sem vista direta confirmada para a água.
- **Serviços anunciados:** consumo no salão, retirada, eventos privados / grupos, acessibilidade.
- **Atendimento:** o restaurante apresenta horários em seus canais, mas eles divergiram entre si; recomendamos confirmação antes de publicar.
- **Responsável legal conforme site atual:** Mirian Ferreira / SARL LA CANTINE PORTUGAISE. **Não há confirmação de nome do chef** e o novo site não deve inventar um.
- **Avaliações:** 9/10 no TheFork em consulta feita em outubro de 2026; não tratar como nota fixa para integrar ao código.
- **Ticket médio divulgado pelo TheFork:** 23 € por pessoa (indicativo, não preço obrigatório).
- **ATENÇÃO AO ENDEREÇO:** publicações de 2019 e listagens antigas registram 47 Chaussée de la Madeleine, mas os canais atuais indicam 57 Quai Magellan.

## 2. Cardápio com base em informações publicadas

Segundo o TheFork, menu atualizado em 28/03/2026:

| Categoria | Item | Preço publicado |
| --- | --- | ---: |
| Especialidades | Poulpe grillé | 30 € |
| Especialidades | Morue maison | 23 € |
| Especialidades | Morue grillée | 23 € |
| Especialidades | Francesinha | 19,95 € |
| Carnes | Bitoque | 19,95 € |
| Carnes | Brochette de picanha | 25 € |
| Carnes | Brochette de filet mignon | 26 € |
| Carnes | Faux-filet | 23 € (na seção viandes) |
| Almoço | Plat du jour | 14,95 € |
| Almoço | Entrée + plat | 16,95 € |
| Almoço | Plat + dessert | 16,95 € |
| Almoço | Entrée + plat + dessert | 19,95 € |
| Sobremesas | Pastel de nata | 3,50 € |
| Sobremesas | Gâteau aux biscuits | 3,50 € |
| Sobremesas | Pudding | 3,50 € |

**Observação de confiabilidade:** há discrepância interna no TheFork para o faux-filet (21 € na seção à la carte versus 23 € na seção carnes). O protótipo usa 23 € na seção de carnes, mas é recomendável confirmar com o estabelecimento. Os pratos do dia variam. O site oficial principal sinaliza que sua carta ainda será disponibilizada.

## 3. Direção artística

### Posicionamento

> Un petit coin de Portugal, au cœur de Nantes.

Culinária portuguesa autêntica sem visual turístico exagerado: **modern Portuguese editorial**, com sofisticação acolhedora, textura orgânica, azulejaria abstrata e tipografia expressiva.

### Paleta do protótipo

| Aplicação | Tom | Hex |
|---|---|---|
| Marca e cabeçalhos | Verde português escuro | `#173F31` |
| Rodapé e profundidade | Verde floresta profundo | `#102E23` |
| Ações/realce | Terracota quente | `#BD603F` |
| Fundo principal | Creme | `#FAF7F0` |
| Blocos auxiliares | Areia clara | `#F4EDE0` |
| Galeria | Verde névoa | `#E9EEE6` |
| Corpo do texto | Grafite esverdeado | `#27392F` |

Paleta é **uma proposta**, não cores oficiais do restaurante. A decoração e sinalização atuais têm verde, branco, motivos portugueses coloridos e terracota.

### Tipografia

- Titulares: Playfair Display (serifa elegante; pesos regular/itálico).
- Componentes/menus: DM Sans (alta legibilidade no mobile).

### Motion / UI

- Entrada das seções com reveal suave em viewport, única execução.
- Imagens ampliam de forma discreta no hover.
- Cardápio destaque com prato circular rotativo e troca via setas/swipe.
- Menu segmentado em 4 categorias, sem recarregar página.
- Marquee tipográfica sem imagens pesadas.
- Header translúcido responsivo com menu hamburger e CTAs acessíveis.
- `prefers-reduced-motion` é respeitado.
- Sem vídeos automáticos, WebGL obrigatório ou sequências longas que degradem o desempenho.

## 4. Seleções, cálculo e arquitetura

| Bloco | Função | Interações |
|---|---|---|
| 1. Hero | Apresentar marca, conceito e prato | Reserva, ver cardápio, rolar |
| 2. Faixa de assinatura | Imersão editorial | Movimento ornamental |
| 3. Notre histoire | Origem e experiência | Link para contato |
| 4. Nos incontournables | Cardápio fotográfico giratório | Próximo/anterior e gesto de toque |
| 5. La carte | Cardápio legível | 4 filtros; 15 itens e valores publicados |
| 6. Notre maison | Fotografia real do salão | Galeria visual |
| 7. À bientôt | Endereço, reservas, horários | Telefone, mapa, reserva |
| Rodapé | Navegação e atribuição | Links úteis |

**Dimensão atual:** 7 blocos principais de conteúdo + faixa ornamental + rodapé, 4 categorias, 15 itens de menu, 3 pratos fotográficos em destaque, 3 fotos de ambiente, 12 componentes React, 3 CTAs principais (reserva, cardápio e localização). Layout preparado com breakpoints para desktop (>920 px), tablet (681–920 px) e telefone (até 680 px; refinamento extra até 390 px).

**Estrutura técnica:** Vite + React 19 + Motion 12 + Lucide React, CSS puro (sem Tailwind em runtime) e conteúdo em `src/data.js` para revisão fácil. Em um site institucional público e buscável, React web responsivo é mais adequado do que React Native, que é voltado à criação de apps móveis.

## 5. Banco de mídia identificado

- **Salão real:**
  - https://cdn.website.dish.co/media/b5/c1/9489572/LA-CANTINE-PORTUGAISE-LA-CANTINE-SALLE-3-jpg.jpg
  - https://cdn.website.dish.co/media/04/73/9489562/LA-CANTINE-PORTUGAISE-LA-CANTINE-SALLE-1-jpg.jpg
  - https://cdn.website.dish.co/media/47/4f/9489567/LA-CANTINE-PORTUGAISE-LA-CANTINE-SALLE-2-jpg.jpg
- **Pratos reais publicados pelo restaurante:**
  - https://cdn.website.dish.co/media/47/5c/9489592/LA-CANTINE-PORTUGAISE-LA-CANTINE-PLAT-4-jpg.jpg (pastéis de nata)
  - https://cdn.website.dish.co/media/5f/c5/9489582/LA-CANTINE-PORTUGAISE-LA-CANTINE-PLAT-1-jpg.jpg (petiscos sem identificação formal)
  - https://cdn.website.dish.co/media/f6/ee/9489577/LA-CANTINE-PORTUGAISE-LA-CANTINE-PLAT-2-jpg.jpg (prato sem identificação formal)
- **Pratos fotografados no TheFork:**
  - Francesinha: https://cdn.thefork.com/tf-lab/image/upload/w_500%2Ch_500%2Cc_fill%2Cq_auto%2Cf_jpg/restaurant/638c2293-ee08-4fef-98d6-521b68a3794d/6ecf824d-f28a-4564-90c7-98abc5bc2f4f.webp
  - Poulet: https://cdn.thefork.com/tf-lab/image/upload/w_500%2Ch_500%2Cc_fill%2Cq_auto%2Cf_jpg/restaurant/638c2293-ee08-4fef-98d6-521b68a3794d/73371185-5b1f-4e57-9cea-af3143744f3c.webp

**Direitos de uso:** todas essas fotos pertencem a seus titulares. São URLs públicas para referência visual no **protótipo**, não uma licença automática de republicação, redistribuição ou hotlink permanente. Obter autorização e hospedar cópias otimizadas próprias antes de publicar uma versão comercial. O ZIP não inclui os arquivos dessas fotos.

## 6. Fontes conferidas

- Site atual do restaurante: https://www.la-cantine-portugaise-restaurant-nantes.fr/
- Site de contato / fotos: https://la-cantine-portugaise-nantes.eatbu.com/?lang=fr
- Cardápio atualizado no TheFork: https://www.thefork.fr/restaurant/la-cantine-portugaise-r859494/menu
- Referência de endereço antigo, artigo de 2019: https://www.lebonbon.fr/nantes/les-tops-food-et-drink/cantine-portugaise-nouveau-restaurant-specialites-portugaises-nantes/

## 7. Checklist de produção

- [ ] Obter autorização de uso das fotos e logos oficiais.
- [ ] Confirmar valores e descrições de todo cardápio com o proprietário.
- [ ] Resolver divergência dos horários entre sites.
- [ ] Confirmar melhor URL de reserva e retorno de conclusão da reserva.
- [ ] Substituir URLs de imagens externas por mídias próprias em formatos responsivos WebP/AVIF.
- [ ] Testar o site em Chrome, Safari/iOS e Firefox; no desktop e em dispositivos móveis reais.
- [ ] Validar acessibilidade WCAG (contraste, foco, teclado, leitor de tela).
- [ ] Adicionar política de privacidade/mentions légales apropriadas ao proprietário caso site público.
- [ ] Conectar domínio, analytics somente com consentimento apropriado e gerar sitemap/canonical finais.
