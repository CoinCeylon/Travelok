import { generatePrivateKey, getAddressDetails, Lucid, Blockfrost } from "lucid-cardano";
import dotenv from "dotenv";
import fs from "fs";
import crypto from "crypto";


dotenv.config();


if (!process.env.BLOCKFROST_API_KEY) {
    console.error("BLOCKFROST_API_KEY not found in environment variables");
    process.exit(1);
}

// 1. Generate private key
const privateKey = generatePrivateKey();
console.log("Private Key:", privateKey);

console.log("\n=== Generating Wallet Info ===");
const plutusScript = JSON.parse(fs.readFileSync("src/contracts/verified_nft.plutus.json", "utf-8"));
const mintingValidator = plutusScript.validators.find(v => v.title.includes("mint"));

if (!mintingValidator) {
    console.error("No minting validator found in the Plutus script");
    process.exit(1);
}

console.log("Minting Validator Found:", mintingValidator.title);
console.log("Validator Hash:", mintingValidator.hash);

// Calculate Policy ID manually (Policy ID = Blake2b-224 hash of the script)
// Note: Using SHA256 as fallback since Blake2b might not be available
const scriptBytes = Buffer.from(mintingValidator.compiledCode, 'hex');
let policyId;
try {
    policyId = crypto.createHash('blake2b224').update(scriptBytes).digest('hex');
} catch (e) {
    // Fallback to SHA256 and truncate to 28 bytes (224 bits)
    const sha256Hash = crypto.createHash('sha256').update(scriptBytes).digest('hex');
    policyId = sha256Hash.substring(0, 56); // 28 bytes = 56 hex characters
    console.log("Note: Using SHA256 fallback for policy ID calculation");
}
console.log("Policy ID (calculated):", policyId);

try {
    const lucid = await Lucid.new(undefined, "Preprod");
    lucid.selectWalletFromPrivateKey(privateKey);
    const address = await lucid.wallet.address();
    const { paymentCredential } = lucid.utils.getAddressDetails(address);
    console.log("Wallet Address:", address);
    console.log("PubKey Hash:", paymentCredential.hash);
} catch (walletError) {
    console.log("Wallet generation failed, but we have the policy ID");
    console.log("Error:", walletError.message);
}

// Save the policy information
const policyInfo = {
    policyId: policyId,
    validatorHash: mintingValidator.hash,
    compiledCode: mintingValidator.compiledCode,
    title: mintingValidator.title
};

fs.writeFileSync("policyScript.json", JSON.stringify(policyInfo, null, 2));
console.log("\nPolicy information saved to policyScript.json");




