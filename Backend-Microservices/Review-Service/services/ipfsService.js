const axios = require('axios');

const uploadToIPFS = async (reviewData) => {
  try {
    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      {
        pinataMetadata: {
          name: `review-${reviewData.hotelId}-${new Date().toISOString()}`,
        },
        pinataContent: reviewData,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const ipfsHash = res.data.IpfsHash;
    console.log("✅ Uploaded to IPFS via Pinata:", ipfsHash);
    return ipfsHash;
  } catch (err) {
    console.error("❌ IPFS Upload Failed (Pinata):", err.response?.data || err.message);
    throw err;
  }
};

module.exports = { uploadToIPFS };
