"use client";

// app/page.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useActiveAccount } from 'thirdweb/react';
import { AIGenerator } from '../app/components/AIGenerator';

export default function Home() {
  const router = useRouter();
  const account = useActiveAccount();
  // const disconnect = useDisconnect();

  useEffect(() => {
    if (!account) {
      router.push('/landing');
    }
  }, [account, router]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px',
    }}>
      <h1 style={{ margin: '20px' }}>Olympic NFT Generator</h1>
      {/* <button onClick={disconnect}>Disconnect</button> */}
      <AIGenerator />
    </div>
  );
}
