// ipfs upload service for Pinata

import axios from 'axios';
import FormData from 'form-data';

export const uploadToIPFS = async (fileBuffer, fileName) => {
    const form = new FormData();
    form.append("file", fileBuffer, fileName);

    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", form, {
        maxBodyLength: Infinity,
        headers: {
            ...form.getHeaders(),
            Authorization: `Bearer ${process.env.PINATA_JWT}`
        },
    });

    return res.data.IpfsHash;
};