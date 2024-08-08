"use client";

import { ConnectButton, MediaRenderer, useActiveAccount, useReadContract } from "thirdweb/react";
import { client } from "../client";
import { useState } from "react";
import { NFTCollection } from "./NFTCollection";
import { getNFTs } from "thirdweb/extensions/erc721";
import { contract } from "../utils/contract";
import { countries } from "../api/data/countries";
import { sports } from "../api/data/sports";

export const AIGenerator = () => {
    const account = useActiveAccount();

    const [country, setCountry] = useState("");
    const [sport, setSport] = useState("");
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isMinting, setIsMinting] = useState(false);

    const { data: nfts, refetch } = useReadContract(
        getNFTs,
        {
            contract: contract,
        }
    );

    const handleGenerateAndMint = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsGenerating(true);

        const imagePrompt = `${country} ${sport} Olympics`;

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imagePrompt }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate image');
            }

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setGeneratedImage(imageUrl);

            setIsGenerating(false);
            setIsMinting(true);

            // Minting process (assuming you have the mint function)
            // await mintNFT(imageUrl);

            setIsMinting(false);
            refetch(); // Refresh the NFT collection
        } catch (error) {
            console.error(error);
            setIsGenerating(false);
            setIsMinting(false);
        }
    };

    // const mintNFT = async (imageUrl: string) => {
    //     // Implement the minting logic using the thirdweb SDK
    //     // Example:
    //     // await contract.call("mint", account.address, imageUrl);
    // };

    if (account) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
            }}>
                <ConnectButton 
                    client={client}
                />
                <div>
                    <div style={{ margin: "20px 0"}}>
                        {generatedImage ? (
                            <img
                                src={generatedImage}
                                alt="Generated"
                                style={{
                                    width: "300px",
                                    height: "300px",
                                    borderRadius: "8px",
                                }}
                            />
                        ) : (
                            <div style={{
                                width: "300px",
                                height: "300px",
                                border: "1px dashed #777",
                                borderRadius: "10px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <p style={{ color: "#777" }}>
                                    {isGenerating ? "Generating image..." : "No image generated"}
                                </p>
                            </div>
                        )}
                    </div>
                    <div>
                        <form onSubmit={handleGenerateAndMint}>
                            {!generatedImage || isMinting ? (
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}>
                                    <select 
                                        value={country} 
                                        onChange={(e) => setCountry(e.target.value)}
                                        style={{
                                            width: "300px",
                                            height: "40px",
                                            padding: "0 10px",
                                            borderRadius: "5px",
                                            border: "1px solid #777",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <option value="">Select Country</option>
                                        {countries.map((country) => (
                                            <option key={country.code} value={country.name}>{country.name}</option>
                                        ))}
                                    </select>
                                    <select 
                                        value={sport} 
                                        onChange={(e) => setSport(e.target.value)}
                                        style={{
                                            width: "300px",
                                            height: "40px",
                                            padding: "0 10px",
                                            borderRadius: "5px",
                                            border: "1px solid #777",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <option value="">Select Sport</option>
                                        {sports.map((sport) => (
                                            <option key={sport} value={sport}>{sport}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="submit"
                                        disabled={isGenerating || isMinting || !country || !sport}
                                        style={{
                                            width: "300px",
                                            height: "40px",
                                            backgroundColor: "#333",
                                            color: "#fff",
                                            borderRadius: "5px",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {
                                            isGenerating ? "Generating..." 
                                            : isMinting ? "Minting..." 
                                            : "Generate and Mint"
                                        }
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setGeneratedImage(null)}
                                    style={{
                                        width: "300px",
                                        height: "40px",
                                        backgroundColor: "#333",
                                        color: "#fff",
                                        borderRadius: "5px",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >Generate Another NFT</button>
                            )}
                        </form>
                    </div>
                </div>
                <NFTCollection 
                    nfts={nfts!}
                />
            </div>
        );
    } else {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                <ConnectButton client={client} />
            </div>
        );
    }
};
