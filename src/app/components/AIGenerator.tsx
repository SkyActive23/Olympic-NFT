"use client";

import { useActiveAccount, useReadContract } from "thirdweb/react";
import { useState } from "react";
import { NFTCollection } from "./NFTCollection";
import { getNFTs } from "thirdweb/extensions/erc721";
import { contract } from "../utils/contract";
import { countries } from "../api/data/countries";
import { sports } from "../api/data/sports";

export const AIGenerator = () => {
  const account = useActiveAccount();
  console.log("Active account:", account);

  const [country, setCountry] = useState("");
  const [sport, setSport] = useState("");
  const [gender, setGender] = useState("Men's"); // Default to "Men's"
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const { data: nfts, refetch } = useReadContract(getNFTs, {
    contract: contract,
  });
  console.log("NFTs data:", nfts);

  const handleGenerateAndMint = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const imagePrompt = `${country} ${sport} ${gender} Olympics`;
    console.log("Image prompt:", imagePrompt);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imagePrompt }),
      });
      console.log("Generate response:", response);

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const blob = await response.blob();
      console.log("Blob received:", blob);

      // Convert blob to base64
      const base64Image = await blobToBase64(blob);
      console.log("Base64 Image:", base64Image);

      if (!base64Image) {
        throw new Error('Failed to convert image to Base64');
      }

      setGeneratedImage(base64Image);  // Store the base64 image string

      setIsGenerating(false);
      setIsMinting(true);

      const mintRes = await fetch('/api/mint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          nftImage: base64Image,  // Sending the Base64 image
          address: account?.address, 
        }),
      });
      console.log("Mint response:", mintRes);

      if (!mintRes.ok) {
        throw new Error('Failed to mint NFT');
      }

      alert('NFT minted successfully');

      setIsMinting(false);
      refetch(); // Refresh the NFT collection
    } catch (error) {
      console.error("Error in handleGenerateAndMint:", error);
      setIsGenerating(false);
      setIsMinting(false);
      refetch();
    }
  };

  // Helper function to convert Blob to Base64
  const blobToBase64 = (blob: Blob): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          resolve(null);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
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
                >
                  Generate Another NFT
                </button>
              )}
            </form>
          </div>
        </div>
        <NFTCollection nfts={nfts!} />
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