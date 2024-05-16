# DigiCartShop

Após o clone, realize a instalação das dependencias usando **yarn** na linha de comando no diretório do projeto;

Após, em um terminal separado, execute o json server para a leitura e disponibilidade dos dados do json com o comando:

**json-server --watch db.json --port 3004 
(verifique se a porta 3004 está disponível, caso não altere para a porta que desejar)**

caso o json server esteja rodando sem problemas, se foi alterado a porta, altere no arquivo /src/app/services/ApiRequest.ts

**baseURL: 'http://localhost:3004/' (a porta selecionada no json server)**

Após as configurações acima, basta rodar em um terminal diferente o comando **yarn dev** e abrir no navegador a url **http://localhost:3000/**
