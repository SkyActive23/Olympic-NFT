"use client";

import { MediaRenderer, useActiveAccount, useReadContract } from "thirdweb/react";
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
    const [gender, setGender] = useState("Men's"); // Default to "Men's"
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

        const imagePrompt = `${country} ${sport} ${gender} Olympics`;

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

    if (account) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
            }}>
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
                                backgroundColor: "lightgray",
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
                                {/* Gender Selection Dial */}
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "20px 0",
                                }}>
                                    <label style={{ marginRight: "10px", fontWeight: "bold" }}>
                                        <input 
                                            type="radio" 
                                            value="Men's" 
                                            checked={gender === "Men's"} 
                                            onChange={(e) => setGender(e.target.value)} 
                                            style={{ marginRight: "5px" }} 
                                        />
                                        Men's
                                    </label>
                                    <label style={{ marginLeft: "10px", fontWeight: "bold" }}>
                                        <input 
                                            type="radio" 
                                            value="Women's" 
                                            checked={gender === "Women's"} 
                                            onChange={(e) => setGender(e.target.value)} 
                                            style={{ marginRight: "5px" }} 
                                        />
                                        Women's
                                    </label>
                                </div>
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
                Please connect your wallet.
            </div>
        );
    }
};
