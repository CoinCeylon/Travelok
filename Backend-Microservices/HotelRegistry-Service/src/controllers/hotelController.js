import Hotel from '../models/hotelModel.js';
import { uploadToIPFS } from '../services/ipfsService.js';
import { mintVerifiedNFT } from '../services/nftMinter.js';
import policyScript from '../../policyScript.json' with { type: 'json' };

const lucidPolicyScript = {
    type: "PlutusV2",
    script: policyScript.compiledCode
};

export const registerHotel = async (req, res) => {
    try {
        const { name, location } = req.body;

        if (!req.files || !req.files.license || !req.files.image) {
            return res.status(400).json({ error: "Both license and image files are required" });
        }

        const licenseFile = req.files.license[0];
        const imageFile = req.files.image[0];

        const ipfsHash = await uploadToIPFS(licenseFile.buffer, licenseFile.originalname);
        const imageIPFSHash = await uploadToIPFS(imageFile.buffer, imageFile.originalname);

        const walletAddress = "addr_test1vzpwq95z3xyum8vqndgdd9mdnmafh3djcxnc6jemlgdmswcve6tkw";

        const hotel = await Hotel.create({
            name,
            location,
            walletAddress,
            licenseIPFSHash: ipfsHash,
            imageIPFSHash: imageIPFSHash
        });

        res.status(201).json({ message: "Hotel registered", hotel });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Registration failed" });
    }
};


export const verifyHotel = async (req, res) => {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    if (!hotel) return res.status(404).json({ error: "Hotel not found" });

    // Upload metadata JSON to IPFS first
    const metadataHash = await uploadToIPFS(Buffer.from(JSON.stringify({
        name: "Verified Hotel",
        location: hotel.location,
        registered_on: new Date().toISOString().slice(0, 10)
    })), `${hotel.name}-metadata.json`);

    const txHash = await mintVerifiedNFT(
        hotel.walletAddress,
        policyScript.policyId,
        lucidPolicyScript,
        metadataHash
    );

    hotel.isVerified = true;
    hotel.nftTxHash = txHash;
    await hotel.save();

    res.json({ message: "Hotel verified and NFT issued", txHash });
};

export const getRegisteredHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json({ hotels });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch hotels" });
    }
};