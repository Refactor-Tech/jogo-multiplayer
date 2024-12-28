# Jogo Multiplayer

## Arquitetura da aplicação

- Cliente-servidor

## Camadas

### Apresentação

- Responsável por exibir visualmente o estado do jogo
- Não possui regras ou lógicas do jogo
- Faz uso da [Canvas API](https://developer.mozilla.org/pt-BR/docs/Web/API/Canvas_API)
- Obtem dados da camada de **lógica + dados**

### Lógica + Dados

- Responsável pelo comportamento e regras do jogo
- Guarda as informações e estado do jogo
- _State Machine_

### Inputs

- Responsável por coletar os comandos do usuário
- Envia os dados para a camada de **lógica + dados**

### Networking

- Responsável pela sincronização entre os _clients_ e o _server_
