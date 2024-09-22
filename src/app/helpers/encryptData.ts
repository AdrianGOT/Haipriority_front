export const encryptDataV2 = async (data: string, publicKey: string) => {
    const pKey = await importPublicKey(publicKey);
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data)

    const encryptedData = await window.crypto.subtle.encrypt( { name: "RSA-OAEP" }, pKey, encodedData );
    return btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
}

export const importPublicKey = async ( publicKey: string) => {
    
    const binaryData = window.atob(publicKey.replace(/-----[^-]+-----/g, '').replace(/\s/g, ''));
    const binaryBuffer = new Uint8Array([...binaryData].map(c => c.charCodeAt(0))).buffer

    return await window.crypto.subtle.importKey(
        "spki",
        binaryBuffer,
        {
          name: "RSA-OAEP",
          hash: "SHA-256"
        },
        true,
        ["encrypt"]
    );

}

// Para generar las claves privadas y publicas para 
// poder enviar información cifrada desde el backend y poder decifrarlas en el frontend
export const generatePairKey = async() => {

  const keyPair = await window.crypto.subtle.generateKey({
    name: "RSA-OAEP",
    modulusLength: 2048,
    publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
    hash: "SHA-256",
  },
  true, ["encrypt", "decrypt"]
  );

  const _publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
  const _privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

  // Convertir a un formato legible
  const publicKeyBase64 = convertBufferToBase64(_publicKey, 'PUBLIC KEY'); 
  const privateKeyBase64 = convertBufferToBase64(_privateKey, 'PRIVATE KEY'); 

  return {
    publicKeyBase64,
    privateKeyBase64
  }
}

export const  convertBufferToBase64 = (buffer: ArrayBuffer, type: string) =>{
  const binary = String.fromCharCode(...new Uint8Array(buffer));
  const base64 = btoa(binary);
  const pemString = `-----BEGIN ${type}-----\n${base64.match(/.{1,64}/g)!.join('\n')}\n-----END ${type}-----\n`;
  return pemString;
}