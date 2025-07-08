import axios from 'axios';

const api = axios.create({
    baseURL: "https://cardano-preprod.blockfrost.io/api/v0",
    headers: { project_id: process.env.BLOCKFROST_API_KEY },
});

export const getWalletDetails = async (walletAddress) => {
    const res = await api.get(`/addresses/${walletAddress}`);
    return res.data;
};
