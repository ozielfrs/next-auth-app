const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className={'main-bg-900 text-white'}>{children}</div>
    </>
  );
};

export default ProtectedLayout;
