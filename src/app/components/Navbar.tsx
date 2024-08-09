"use client";

import Link from "next/link";
import { useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faImage, faCloud } from "@fortawesome/free-solid-svg-icons"; // Import your icons here

export const Navbar = () => {
  const pathname = usePathname();

  // If the current page is /landing, only show the logo
  if (pathname === "/landing") {
    return (
      <header style={{
        position: 'sticky',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: 'gray',
        borderBottom: '4px solid lightgray',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}>
        <img src="/logo.jpg" alt="logo" height={50}/>
      </header>
    );
  }

  const [hovered, setHovered] = useState<{ home: boolean; nft: boolean; ipfs: boolean }>({
    home: false,
    nft: false,
    ipfs: false,
  });

  const handleMouseEnter = (button: 'home' | 'nft' | 'ipfs') => {
    setHovered({ ...hovered, [button]: true });
  };

  const handleMouseLeave = (button: 'home' | 'nft' | 'ipfs') => {
    setHovered({ ...hovered, [button]: false });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px',
      backgroundColor: 'gray',
      borderBottom: '4px solid lightgray',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <img src="/logo.jpg" alt="logo" height={50}/>
        <p style={{color: 'lightgray', fontSize: '20px', fontWeight: '500'}}>|</p>
        <Link href="/" passHref>
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative',
            }}
            onMouseEnter={() => handleMouseEnter('home')}
            onMouseLeave={() => handleMouseLeave('home')}
          >
            <FontAwesomeIcon icon={faHome} size="2x" color={hovered.home ? 'white' : 'lightgray'} />
            {hovered.home && (
              <span style={{
                position: 'absolute',
                top: '40px',
                backgroundColor: 'black',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                zIndex: 1000,
              }}>
                Home
              </span>
            )}
          </div>
        </Link>
        <p style={{color: 'lightgray', fontSize: '20px', fontWeight: '500'}}>|</p>
        <Link href="/NFTGallery" passHref>
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative',
            }}
            onMouseEnter={() => handleMouseEnter('nft')}
            onMouseLeave={() => handleMouseLeave('nft')}
          >
            <FontAwesomeIcon icon={faImage} size="2x" color={hovered.nft ? 'white' : 'lightgray'} />
            {hovered.nft && (
              <span style={{
                position: 'absolute',
                top: '40px',
                backgroundColor: 'black',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                zIndex: 1000,
              }}>
                NFT Gallery
              </span>
            )}
          </div>
        </Link>
        <p style={{color: 'lightgray', fontSize: '20px', fontWeight: '500'}}>|</p>
        <Link href="IPFS" passHref>
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative',
            }}
            onMouseEnter={() => handleMouseEnter('ipfs')}
            onMouseLeave={() => handleMouseLeave('ipfs')}
          >
            <FontAwesomeIcon icon={faCloud} size="2x" color={hovered.ipfs ? 'white' : 'lightgray'} />
            {hovered.ipfs && (
              <span style={{
                position: 'absolute',
                top: '40px',
                backgroundColor: 'black',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                zIndex: 1000,
              }}>
                IPFS
              </span>
            )}
          </div>
        </Link>
        <p style={{color: 'lightgray', fontSize: '20px', fontWeight: '500'}}>|</p>
      </nav>
      <ConnectButton client={client} />
    </header>
  );
}
