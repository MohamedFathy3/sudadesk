// lib/encryption.ts
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.COOKIE_SECRET_KEY || 'fallback-secret-key-change-in-production';

export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

export function decryptData(encryptedData: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('❌ Decryption error:', error);
    return '';
  }
}