import { Lucid, Blockfrost, Data, fromHex, toHex } from "lucid-cardano";
import dotenv from 'dotenv';
dotenv.config();

export async function mintVerifiedNFT(hotelWalletAddress, policyId, policyScript, ipfsMetadataHash) {
    const lucid = await Lucid.new(
        new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", process.env.BLOCKFROST_API_KEY),
        "Preprod"
    );

    // Load admin wallet that signs mint tx
    lucid.selectWalletFromPrivateKey(process.env.ADMIN_PRIVATE_KEY);

    const unit = policyId + toHex("VerifiedHotelBadge");

    const metadata = {
        [policyId]: {
            "VerifiedHotelBadge": {
                name: "Verified Hotel Badge",
                image: `ipfs://${ipfsMetadataHash}`,
                description: "Issued to verified hotels",
                registered_on: new Date().toISOString().slice(0, 10),
            },
        },
    };

    const tx = await lucid
        .newTx()
        .mintAssets({ [unit]: 1n }, Data.void()) // call policy with Unit redeemer
        .attachMintingPolicy(policyScript)
        .payToAddress(hotelWalletAddress, { [unit]: 1n })
        .attachMetadata(721, metadata)
        .complete();

    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();

    return txHash;
}
