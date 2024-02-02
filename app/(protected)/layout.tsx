import { Navbar } from './_components/navbar';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className={'main-bg-900 text-white space-y-4'}>
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default ProtectedLayout;
