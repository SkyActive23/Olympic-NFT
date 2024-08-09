"use client";

// app/landing/page.tsx
import { useEffect, useState, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { ConnectEmbed, useActiveAccount } from 'thirdweb/react';
import { client } from '../client';

export default function Landing() {
  const router = useRouter();
  const account = useActiveAccount();
  const [boxIn, setBoxIn] = useState(true);
  const [blackout, setBlackout] = useState(false);

  useEffect(() => {
    if (account) {
      setBoxIn(false);
      setBlackout(true);
      document.body.style.backgroundColor = 'black';
      setTimeout(() => {
        setBlackout(false); // Clear the blackout effect before navigating
        router.push('/');
      }, 1000); // Match the duration of the boxOut animation
    }
  }, [account, router]);

  useEffect(() => {
    if (!account) {
      document.body.style.backgroundColor = '#616263'; // Original background color
    }
  }, [account]);

  const styleTopRight: CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '10rem',
    height: '10rem',
    backgroundColor: '#FFDF00',
    borderBottomLeftRadius: '100%',
  };

  const styleBottomLeft: CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '10rem',
    height: '10rem',
    backgroundColor: '#FFDF00',
    borderTopRightRadius: '100%',
  };

  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh', 
        position: 'relative',
        backgroundImage: `url('/first-place-medal.jpg')`,  // Background image path
        backgroundSize: 'cover',  // Cover the entire page
        backgroundPosition: 'center',  // Center the background image
        backgroundRepeat: 'no-repeat',  // Prevent repetition of the image
    }}>
        {blackout && <div className="blackout-in" style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'black', 
            zIndex: 10 
        }}></div>}
          {/* <div style={styleTopRight} className="moveToTopLeft"></div>
          <div style={styleBottomLeft} className="moveToBottomRight"></div> */}
        <div style={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '20px', 
          borderTop: '15px solid lightgray',
          borderLeft: '10px solid lightgray',
          borderRight: '5px solid darkgray',
          borderBottom: '5px solid darkgray',
          borderRadius: '20px',
          backgroundColor: 'gray',
          boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          zIndex: 1,
        }}>
            <h1 style={{color: '#fff'}}>Connect & Collect Iconic Olympic NFTs</h1>
            <p style={{color: '#fff', paddingBottom: '15px'}}>Immerse yourself in the rich history and legacy of the Olympic Games</p>
            <ConnectEmbed client={client} />
        </div>
    </div>
  );
}
