"use client";

// app/page.tsx
import { CSSProperties, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useActiveAccount } from 'thirdweb/react';
import { AIGenerator } from '../app/components/AIGenerator';
import { Navbar } from './components/Navbar';

export default function Home() {
  const router = useRouter();
  const account = useActiveAccount();
  const [blackout, setBlackout] = useState(false);

  useEffect(() => {
    if (!account) {
      setBlackout(true);
      document.body.style.backgroundColor = 'black';
      setTimeout(() => {
        setBlackout(false); // Clear the blackout effect before navigating
        router.push('/landing');
      }, 1000); // Match the duration of the blackout animation
    } else {
      setBlackout(false);
      document.body.style.backgroundColor = '#616263'; // Reset to original background color
    }
  }, [account, router]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {blackout && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            zIndex: 10,
          }}
        />
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
          marginTop: '30px',
          marginBottom: '30px',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            margin: '10px',
            borderTop: '15px solid lightgray',
            borderLeft: '10px solid lightgray',
            borderRight: '5px solid darkgray',
            borderBottom: '5px solid darkgray',
            borderRadius: '20px',
            backgroundColor: 'gray',
            boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)',
            width: 'auto',
            maxWidth: '600px', // Control the maximum width of the component
          }}
        >
          <h1 style={{ margin: '20px', color: '#fff' }}>Olympic NFT Generator</h1>
          <AIGenerator />
        </div>
      </div>
    </div>
  );
}
