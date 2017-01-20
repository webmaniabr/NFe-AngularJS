// Pedido
var data;
data = {
  'ID' : 123456, // Número do pedido
  'operacao' : 1, // Tipo de Operação da Nota Fiscal
  'natureza_operacao' : 'Venda de produção do estabelecimento', // Natureza da Operação
  'modelo' : 1, // Modelo da Nota Fiscal
  'emissao' : 1, // Tipo de Emissão da NF-e
  'finalidade' : 1, // Finalidade de emissão da Nota Fiscal
  'ambiente' : 2, // Identificação do Ambiente do Sefaz
  'cliente' : {
    'cpf' : '980.453.164-03', // (pessoa fisica) Número do CPF
    'nome_completo' : 'Miguel Pereira da Silva', // (pessoa fisica) Nome completo
    'endereco' : 'Av. Anita Garibaldi', // Endereço de entrega dos produtos
    'complemento' : 'Sala 809 Royal', // Complemento do endereço de entrega
    'numero' : 850, // Número do endereço de entrega
    'bairro' : 'Ahú', // Bairro do endereço de entrega
    'cidade' : 'Curitiba', // Cidade do endereço de entrega
    'uf' : 'PR', // Estado do endereço de entrega
    'cep' : '80540-180', // CEP do endereço de entrega
    'telefone' : '(41) 4063-9102', // Telefone do cliente
    'email' : 'suporte@webmaniabr.com', // E-mail do cliente para envio da NF-e
  },
  'produtos' : [],
  'pedido' : {
    'pagamento' : 0, // Indicador da forma de pagamento
    'presenca' : 2, // Indicador de presença do comprador no estabelecimento comercial no momento da operação
    'modalidade_frete' : 0, // Modalidade do frete
    'frete' : '12.56', // Total do frete
    'desconto' : '10.00', // Total do desconto
    'total' : '137.26', // Valor total do pedido pago pelo cliente
  }
}

// Produtos
items = {};
angular.forEach(items, function(value, key) {

  data.produtos.push({
    'nome' : 'Camisetas Night Run', // Nome do produto
    'sku' : 'camisetas-10-milhas', // Código identificador - SKU
    'ncm' : '6109.10.00', // Código NCM
    'cest' : '28.038.00', // Código CEST
    'quantidade' : 3, // Quantidade de itens
    'unidade' : 'UN', // Unidade de medida da quantidade de itens
    'peso' : '0.500', // Peso em KG. Ex: 800 gramas = 0.800 KG
    'origem' : 0, // Origem do produto
    'subtotal' : '44.90', // Preço unitário do produto - sem descontos
    'total' : '134.70', // Preço total (quantidade x preço unitário) - sem descontos
    'classe_imposto' : 'REF1637' // Referência do imposto cadastrado
  });

});

// Emissão
$http({
  method: 'POST',
  url: 'https://webmaniabr.com/api/1/nfe/emissao/',
  headers: {
      'Content-Type' : 'application/json; charset=utf-8',
      'X-Consumer-Key' : SEU_CONSUMER_KEY,
      'X-Consumer-Secret' : SEU_CONSUMER_SECRET,
      'X-Access-Token' : SEU_ACCESS_TOKEN,
      'X-Access-Token-Secret' : SEU_ACCESS_TOKEN_SECRET,
  },
  data: data
}).then(function successCallback(response) {

    response = angular.fromJson(response);

    if (response.data.error){

      console.log('Erro ao emitir NF-e');
      console.log(response.data.error);

    } else {

      console.log('NF-e processada');
      console.log(response);

      var status = response.data.status; // aprovado, reprovado, cancelado, processamento ou contingencia
      var nfe = response.data.nfe; // número da NF-e
      var serie = response.data.serie; // número de série
      var recibo = response.data.recibo; // número do recibo
      var chave = response.data.chave; // número da chave de acesso
      var xml = response.data.xml; // URL do XML
      var danfe = response.data.danfe; // URL do Danfe (PDF)
      var log = response.data.log;

    }

}, function errorCallback(response) {

    console.log('Erro de comunicação');
    console.log(response);

});
