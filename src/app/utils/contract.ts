
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

export const nftCollectionContractAddress = "0x2b3D19fe7F3B244EBB6A6CFA57071fdF0Eef5266";

export const contract = getContract({
    client: client,
    chain: sepolia,
    address: nftCollectionContractAddress
});