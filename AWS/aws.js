const AWS = require('aws-sdk');

// Configuração das credenciais AWS
AWS.config.update({
  region: 'us-west-2',  // Substitua pela sua região
  accessKeyId: 'SEU_ACCESS_KEY',
  secretAccessKey: 'SEU_SECRET_KEY'
});

// Criação da instância do S3
const s3 = new AWS.S3();


const fs = require('fs');

// Função para fazer o upload de um arquivo

// const ref = UUID.new()
const uploadFile = (filePath, bucketName, keyName) => {
  const fileContent = fs.readFileSync(filePath);

  const params = {
    Bucket: bucketName,  // Nome do seu bucket S3
    Key: keyName,        // Nome do arquivo no S3
    Body: fileContent    // Conteúdo do arquivo
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error('Erro ao fazer o upload:', err);
    } else {
      console.log('Arquivo carregado com sucesso:', data.Location);
    }
  });
};

// Exemplo de uso
uploadFile('./caminho/do/seu/arquivo.txt', 'nome-do-seu-bucket', 'arquivo-no-s3.txt');


// Função para baixar um arquivo do S3
const downloadFile = (bucketName, keyName, downloadPath) => {
    const params = {
      Bucket: bucketName,
      Key: keyName
    };
  
    const file = fs.createWriteStream(downloadPath);
  
    s3.getObject(params).createReadStream().pipe(file);
  
    file.on('close', () => {
      console.log('Arquivo baixado com sucesso:', downloadPath);
    });
  };
  
  // Exemplo de uso
  downloadFile('nome-do-seu-bucket', 'arquivo-no-s3.txt', './caminho/do/arquivo-baixado.txt');