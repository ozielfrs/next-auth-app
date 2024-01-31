'use client';
import { useSession, signOut } from 'next-auth/react';

const HomePage = () => {
  const session = useSession();
  const onClick = () => {
    signOut();
  };

  return (
    <div>
      {JSON.stringify(session)}
      <button onClick={onClick}>Sign Out</button>
    </div>
  );
};

export default HomePage;
