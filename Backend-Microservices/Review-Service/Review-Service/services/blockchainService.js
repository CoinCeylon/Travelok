// services/blockchainService.js
(async () => {
  const { Lucid, Blockfrost } = await import('lucid-cardano');
})();

let lucid;

/**
 * Initialize Lucid instance once
 */
async function initLucid() {
  if (!lucid) {
    lucid = await Lucid.new(
      new Blockfrost('https://cardano-mainnet.blockfrost.io/api/v0', process.env.BLOCKFROST_API_KEY),
      'Mainnet'
    );

    lucid.selectWalletFromPrivateKey(process.env.PLATFORM_PRIVATE_KEY);
  }
}

/**
 * Store IPFS CID metadata on Cardano chain
 * @param {string} ipfsHash - IPFS CID of the review
 * @param {string} walletAddress - Wallet that submitted the review
 */
const storeHashOnCardano = async (ipfsHash, walletAddress) => {
  try {
    await initLucid();

    const tx = await lucid
      .newTx()
      .attachMetadata(674, {
        reviewCID: ipfsHash,
        submittedBy: walletAddress,
        timestamp: new Date().toISOString(),
      })
      .complete();

    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();

    console.log('✅ TX Submitted:', txHash);
    return txHash;
  } catch (err) {
    console.error('❌ Lucid TX Failed:', err.message || err);
    throw err;
  }
}

module.exports = { storeHashOnCardano };
