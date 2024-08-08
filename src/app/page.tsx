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
  const [boxOut, setBoxOut] = useState(true);
  const [blackout, setBlackout] = useState(false);

  useEffect(() => {
    if (!account) {
      setBoxOut(false);
      setBlackout(true);
      document.body.style.backgroundColor = 'black';
      setTimeout(() => {
        setBlackout(false); // Clear the blackout effect before navigating
        router.push('/landing');
      }, 1000); // Match the duration of the boxOut animation
    } else {
      setBlackout(false);
      document.body.style.backgroundColor = '#616263'; // Reset to original background color
    }
  }, [account, router]);

  const navbarHeight = '4rem'; // Adjust this value based on your navbar height

const styleTopRight: CSSProperties = {
  position: 'absolute',
  top: navbarHeight, // Start right underneath the navbar
  right: 0,
  width: '20rem', // Increase width
  height: '20rem', // Increase height
  backgroundColor: '#FFDF00',
  borderBottomLeftRadius: '100%',
  transform: 'translate(50%, -50%)', // Adjust position to push to the corner
};

const styleBottomLeft: CSSProperties = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '20rem', // Increase width
  height: '20rem', // Increase height
  backgroundColor: '#FFDF00',
  borderTopRightRadius: '100%',
  transform: 'translate(-50%, 50%)', // Adjust position to push to the corner
};
  

  return (
    <div className={boxOut ? 'box-in' : 'box-out'} style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px',
      position: 'relative',
    }}>
      {blackout && <div className="blackout-out" style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'black', 
        zIndex: 10 
      }}></div>}
      <div style={styleTopRight} className="moveToTopLeft"></div>
      <div style={styleBottomLeft} className="moveToBottomRight"></div>
      <div style={{
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
          position: 'relative',
          zIndex: 1,
        }}>
          <h1 style={{ margin: '20px', color: '#fff' }}>Olympic NFT Generator</h1>
          <AIGenerator />
        </div>
    </div>
  );
}
