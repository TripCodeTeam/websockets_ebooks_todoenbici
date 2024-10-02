const CryptoJS = require('crypto-js');

const EncryptJson = ({ password }) => {
  try {
    const jsonTest = {
      type: 'service_account',
      project_id: 'todoenbici',
      private_key_id: '6f6563ed7b548f84bfb368a5210492682c17bb58',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC3S8KrrMQJQpl1\n0JYlzDdod2vgFfu43XOiNvQZR6d5WTkBAXC2JagWI6zKpeBIOBxdCk/Doo3C1Zyt\ny8KJ4DXjdrEVTyvi+alljrhbIhbq6m39V5IYFlEJSzFhK1sflCUXyziRWnV2HYNp\nqvsK7OShd2zr33XCb6OgMCRTydDZC8lTjD7kVoY8gpWNzOhDISehgqNdZQDH0LXR\nWm83mAt/9s3H6xR3F2vVlcBK6sCCiTShUgwDgUZf50s0F1NDzX/AZcfnaX4WTDgg\nMSOgGb9rP2GmEtRyXNbeNRwaAWjMsOvJTPZSDmnMIl1ujJ+whgJGqBXi9DROsQqm\nH+8ZResBAgMBAAECggEAW6TOZUVREoww7B3pJGbRgTLMRdLX85sNWJp/OzB/RIXe\noWkV8IwtWTxnBT8gPxuG2uHv9ZGNrU9eMesBjiwC5YKPkWbvO2G2V2efNzl5GeUy\nLwucqNxnkez9eGbT/Zr1XMsnskz3E6I39RoewFynBzANznUAjMGCnvHTB+2MtSd8\nXoflCjyuH+fkz6Ps7DTCuiVcuAviuJ0sVY24u4td2YX2fS4ubdN9GrqLPEhfn/Zo\nmTqTbwk/kIxdcSRaCCj9+en5RtwXQhCzsKRfpanjrpR4+xNvqlp/oIpe2ywmlviD\nFkzKrzuoo7QRb8L7WBUrtIc0SHbGNOSqDzZNN4DZ/QKBgQDzehwpNs9aVhnGnGWJ\nxYoty7Ypga61vefzVtVkiyoQl9F/+t1qU2QT67O2MXAhf1TZ1J553Z6AzWN5wTyF\nl5655/VbGVG12vMBKnO9XkmAk//KCvhCRw/XHQNWvGwMLTamjH57k2pWezFZSPVR\nxn1eW2JV1UQ77HFz+W6a0wQXPwKBgQDAuT1OI7SniDQJGMo0Iv7mx9YwNFHGt+BU\nhDUBedNi6S2v14hn4Sr8/Lzj4Yb3SzjZtmsMQZ2f1KB5sSez7PU7H4sUobyzSN9m\nf2xZC6K/y1EwnzPE4h4ZbVEe0TJAUwN4MZSiUuaMFykmTjLI6t2eAdQbixDVzKSt\njx5gRL2tvwKBgB5sSqqHs78o9Q2RK0rcyRhR1RA4qRkCgsIwPnfSv83U+pOQSCxq\nAR5QHGOOp+E3pOWXILo/i/eyMlTbZXGX8XhvWIQqlMAxfJ3PrSijaHHNjG+1kTHO\n6VbKxEkJQEMBP0vuUDumvunReOgcKrMuJyosJwxsmpsWP1LrfvuPlHpHAoGAB7Ug\n04gwCGc1FYwNQiqIITiqw0DEaHsgGKE08XsqzhDfR+IJzYW+z2FYOJDjce5rNqHK\nBDJ3mFXLmTJRkSuP3y5yxH93aYAnlxTPg3wopRz/gT9MtboJVCEAFohtRw9K2zq4\nZAmGuOGQPrzv4QMrm88c6YEVSkel6l8H6ve00kcCgYB+4ymkLBsYzARQ464Rtu3g\nvaoxUkNuSX3/2fQEUCai1JCLzgrymGR8KLdTuVxCRA1g48Fy7Hpsg0tnIuBiWbhh\nurFsjvPn0KLNfpseu52N3WIvP2hXWqtwsT3SBYkwvauVuU3ipYyR9iZeHeW4qp8Q\nlrrNCuQn6x86hcJqAXCvLw==\n-----END PRIVATE KEY-----\n',
      client_email: 'ebook-todoenbici@todoenbici.iam.gserviceaccount.com',
      client_id: '115785708871223564522',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/ebook-todoenbici%40todoenbici.iam.gserviceaccount.com',
      universe_domain: 'googleapis.com',
    };

    if (password === undefined) {
      throw new Error('Variable de entorno no esta cargando...');
    }

    // Convierte el objeto JSON a una cadena
    const jsonString = JSON.stringify(jsonTest);

    // Encripta la cadena JSON con la clave proporcionada
    const encryptedData = CryptoJS.AES.encrypt(jsonString, password).toString();

    if (encryptedData == null)
      throw new Error('Error desencryptando clave ...');

    return encryptedData;
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return error;
    }
  }
};

EncryptJson({
  password: process.env.JWT_PASSWORD,
});
