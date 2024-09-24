
import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
import { DebitCardComplete } from '../home/pages/debitCard/interfaces/debitCard';
import { CreditCard } from '../home/pages/creditCard/interfaces/creditCard';


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


export const decodeCardData = async (encrypCards: CreditCard[] | DebitCardComplete[], secretKey: string, iv: string) => {
  const newCardList = [];

  
  const ivBytes = naclUtil.decodeBase64(iv);
  const secretKeyBytes = naclUtil.decodeBase64(secretKey);

  
  for(const card of encrypCards){

      const numberdecoded = decodeMessage(card.number, ivBytes, secretKeyBytes);
      const cvcdecoded = decodeMessage(`${card.cvc}`, ivBytes, secretKeyBytes);

      newCardList.push(
          {
              ...card,
              cvc: Number(cvcdecoded),
              number: numberdecoded,
          }
      )            
  }
  return newCardList;
} 

export const decodeOneCard = 
  <T>(card: T , secretKey: string, iv: string): T =>{

  const ivBytes = naclUtil.decodeBase64(iv);
  const secretKeyBytes = naclUtil.decodeBase64(secretKey);
  const numberdecoded = decodeMessage(card.number, ivBytes, secretKeyBytes);
  const cvcdecoded = decodeMessage(`${card.cvc}`, ivBytes, secretKeyBytes);

  return {
    ...card,
    number: numberdecoded,
    cvc: Number(cvcdecoded)
  }

}

const decodeMessage =  (text: string,iv: Uint8Array, secretKey: Uint8Array ) => {
  
  const dataInBytes = naclUtil.decodeBase64(text);
  const dataDecode = nacl.secretbox.open(dataInBytes, iv, secretKey);
  const newData = naclUtil.encodeUTF8(dataDecode!)
  return newData;
}
