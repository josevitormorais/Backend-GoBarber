conceitos:
SoC -> separetion of concers -> separação de preocupações.

DTO -> Data Transfer Object -> transferir dados de um arquivo para outro, usando objetos para fazer isso.

Dependency Inversion -> pegando o exemplo da nossa aplicação, em vez de ficar instanciando o repository dentro da rota e dentro do services, no services pegamos o repository pelos parametros passados dentro dos () do constructor

estrutura de fluxo da aplicação

model é o modelo da entidade que o repository vai usar para fazer a criação dessa entidade -> o service ele vai ser responsavel pela regra de negocio,fazendo entao a importação do repository la dentro e trabalhando na execução dos dados, e tratando os erros, entao a rota faz o fluxo de receber os dados enviar para o -> repository o repository envia os dados para o service -> que pega esses dados e envia para a rota -> fazendo a criação dos dados.

MODEL --> REPOSITORY <-> SERVICES <-> ROTA <-- FRONTEND REQUEST.BODY
