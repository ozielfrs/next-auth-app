"use client";

import { useRouter } from "next/navigation";

interface SignButtonProps {
  children: React.ReactNode;
  href?: string;
  mode?: "modal" | "page";
  asChild?: boolean;
}

export const SignButton = ({
  children,
  href = "",
  mode = "page",
  asChild,
}: SignButtonProps) => {
  const router = useRouter();

  const clickHandler = () => {
    router.push(href);
  };

  return (
    <>
      <span onClick={clickHandler} className={"cursor-pointer"}>
        {children}
      </span>
    </>
  );
};
