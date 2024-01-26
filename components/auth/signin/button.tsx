"use client";

import { useRouter } from "next/navigation";

interface SignInButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "page";
  asChild?: boolean;
}

export const SignInButton = ({
  children,
  mode = "page",
  asChild,
}: SignInButtonProps) => {
  const router = useRouter();

  const clickHandler = () => {
    router.push(`/signin`);
  };

  return (
    <>
      <span onClick={clickHandler} className={"cursor-pointer"}>
        {children}
      </span>
    </>
  );
};
