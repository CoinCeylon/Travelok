import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import cbor from 'cbor';
import * as csl from '@emurgo/cardano-serialization-lib-nodejs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function loadWalletConfig() {
  const configPath = resolve(__dirname, 'wallet-config.json');
  try {
    const data = await readFile(configPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Wallet config error:', error);
    throw new Error(`Wallet config file missing or invalid: ${configPath}`);
  }
}

export function generateNonce() {
  return crypto.randomBytes(16).toString('hex');
}

export function validateAddress(address) {
  const bech32Pattern = /^addr(_test)?1[0-9a-z]+$/;
  const hexPattern = /^[0-9a-f]{114}$/i;
  const shortHexPattern = /^[0-9a-f]{56,116}$/i;
  const isValid =
    bech32Pattern.test(address) ||
    hexPattern.test(address) ||
    shortHexPattern.test(address);

  console.log('Address validation:', {
    address,
    length: address.length,
    isValid,
  });

  return isValid;
}

function parseCBORKey(keyHex) {
  try {
    const keyBytes = Buffer.from(keyHex, 'hex');
    const decoded = cbor.decodeFirstSync(keyBytes);

    if (decoded instanceof Map) {
      const key = decoded.get(-2);
      if (
        key &&
        (Buffer.isBuffer(key) || key instanceof Uint8Array) &&
        key.length === 32
      ) {
        return Buffer.from(key);
      }
    }
    throw new Error('Unable to extract public key from CBOR structure');
  } catch (error) {
    console.error('CBOR key parsing error:', error);
    throw new Error('Failed to parse public key');
  }
}

function createCOSESign1SigStructure(protectedHeaders, externalAAD, payload) {
  try {
    const sigStructure = [
      'Signature1',
      protectedHeaders,
      externalAAD,
      payload,
    ];
    return Buffer.from(cbor.encode(sigStructure));
  } catch (error) {
    console.error('Error creating COSE_Sign1 Sig_structure:', error);
    throw error;
  }
}

export async function verifySignature(
  address,
  signature,
  key,
  message,
  messageHex
) {
  try {
    console.log('=== SIGNATURE VERIFICATION START ===');
    console.log('Address:', address);
    console.log('Message:', message);
    console.log('Message hex:', messageHex);

    const signatureBytes = Buffer.from(signature, 'hex');
    const coseSign1 = cbor.decodeFirstSync(signatureBytes);

    if (!Array.isArray(coseSign1) || coseSign1.length < 4) {
      throw new Error('Invalid COSE_Sign1 structure');
    }

    const [protectedHeaders, , payload, sig] = coseSign1;

    const actualKey = parseCBORKey(key);

    if (actualKey.length !== 32) {
      throw new Error(
        `Invalid public key length: ${actualKey.length} (expected 32)`
      );
    }

    if (sig.length !== 64) {
      throw new Error(
        `Invalid signature length: ${sig.length} (expected 64)`
      );
    }

    const publicKey = csl.PublicKey.from_bytes(actualKey);
    const ed25519Signature = csl.Ed25519Signature.from_bytes(sig);

    const externalAAD = Buffer.alloc(0);
    const sigStructure = createCOSESign1SigStructure(
      protectedHeaders,
      externalAAD,
      payload
    );

    const isValid = publicKey.verify(sigStructure, ed25519Signature);

    if (isValid) {
      const payloadStr = payload.toString('utf8');
      return payloadStr === message;
    }
    return false;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  } finally {
    console.log('=== SIGNATURE VERIFICATION END ===');
  }
}
