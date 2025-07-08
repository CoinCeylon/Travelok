// controllers/reviewController.js
const { uploadToIPFS } = require('../services/ipfsService');
const { storeHashOnCardano } = require('../services/blockchainService');
const { saveReview } = require('../services/dbService');
const emitter = require('../utils/eventEmitter');

async function postReview(req, res) {
  try {
    const { wallet, hotelId, reviewText, rating } = req.body;

    const reviewPayload = {
      wallet,
      hotelId,
      rating,
      reviewText,
      timestamp: new Date().toISOString(),
    };

    const ipfsCid = await uploadToIPFS(reviewPayload);
    //const txHash = await storeHashOnCardano(ipfsCid, wallet);
    txHash = 'hvhgcxdxdrf4345r6thuhuh8yt65e4@t7y4466fedrrt'; 

    await saveReview({ wallet, hotelId, rating, reviewText, ipfsCid, txHash });

    emitter.emit('review:posted', { wallet, hotelId, rating, txHash });

    res.status(201).json({ success: true, txHash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Review submission failed.' });
  }
}

module.exports = { postReview };
