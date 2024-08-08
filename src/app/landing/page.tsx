"use client";

// app/landing/page.tsx
import { useEffect, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { ConnectEmbed, useActiveAccount } from 'thirdweb/react';
import { client } from '../client';

export default function Landing() {
  const router = useRouter();
  const account = useActiveAccount();

  useEffect(() => {
    if (account) {
      router.push('/');
    }
  }, [account, router]);

  const styleTopRight: CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '10rem',  // 20 * 0.25rem = 5rem
    height: '10rem',
    backgroundColor: '#FFDF00',  // Gold
    borderBottomLeftRadius: '100%',  // Fully rounded bottom left corner
  };

  const styleBottomLeft: CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '10rem',
    height: '10rem',
    backgroundColor: '#FFDF00',
    borderTopRightRadius: '100%',  // Fully rounded top right corner
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', position: 'relative' }}>
      <h1 style={{color: '#fff'}}>Welcome to the Olympic NFT Generator</h1>
      <p style={{color: '#fff'}}>Connect your wallet to get started.</p>
      <ConnectEmbed client={client} />
      <div style={styleTopRight}></div>
      <div style={styleBottomLeft}></div>
    </div>
  );
}
