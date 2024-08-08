"use client";

import Link from "next/link";
import { useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  
  if (pathname === "/landing") {
    return null;
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
        <p style={{color: 'lightgray', fontSize: '20px', fontWeight: '500'}}>|</p>
        <Link href="/" passHref>
          <button 
            style={{
              fontSize: '20px',
              fontWeight: '500',
              color: hovered.home ? 'lightgray' : 'white',
              backgroundColor: 'transparent',
              border: 'none',
              textDecoration: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={() => handleMouseEnter('home')}
            onMouseLeave={() => handleMouseLeave('home')}
          >
            Home
          </button>
        </Link>
        <p style={{color: 'lightgray', fontSize: '20px', fontWeight: '500'}}>|</p>
        <Link href="#" passHref>
          <button 
            style={{
              fontSize: '20px',
              fontWeight: '500',
              color: hovered.nft ? 'lightgray' : 'white',
              backgroundColor: 'transparent',
              border: 'none',
              textDecoration: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={() => handleMouseEnter('nft')}
            onMouseLeave={() => handleMouseLeave('nft')}
          >
            NFT
          </button>
        </Link>
        <p style={{color: 'lightgray', fontSize: '20px', fontWeight: '500'}}>|</p>
        <Link href="#" passHref>
          <button 
            style={{
              fontSize: '20px',
              fontWeight: '500',
              color: hovered.ipfs ? 'lightgray' : 'white',
              backgroundColor: 'transparent',
              border: 'none',
              textDecoration: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={() => handleMouseEnter('ipfs')}
            onMouseLeave={() => handleMouseLeave('ipfs')}
          >
            IPFS
          </button>
        </Link>
        <p style={{color: 'lightgray', fontSize: '20px', fontWeight: '500'}}>|</p>
      </nav>
      <ConnectButton client={client} />
    </header>
  );
}
