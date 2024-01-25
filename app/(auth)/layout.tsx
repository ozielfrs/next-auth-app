const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={
        "flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white via-indigo-500 to-slate-950"
      }
    >
      {children}
    </div>
  );
};

export default AuthLayout;
