
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';


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


export const decodeMessage =  (text: string,iv: Uint8Array, secretKey: Uint8Array ) => {
  const dataInBytes = naclUtil.decodeBase64(text);
  const dataDecode = nacl.secretbox.open(dataInBytes, iv, secretKey);
  const newData = naclUtil.encodeUTF8(dataDecode!)
  return newData;
}
