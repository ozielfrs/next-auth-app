import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { SignInButton } from "@/components/auth/signin/button";

const font = Poppins({
  subsets: ["latin-ext"],
  weight: ["600"],
});

const AppPage = () => {
  return (
    <main
      className={
        "flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white via-indigo-500 to-slate-950"
      }
    >
      <div className={"space-y-6 text-white text-center"}>
        <h1
          className={cn(
            "text-6xl font-semibold drop-shadow-xl text-gradient-100",
            font.className
          )}
        >
          Auth App
        </h1>
        <p className={"text-lg"}>
          A simple app to demonstrate authentication with NextAuth.js
        </p>
        <div>
          <SignInButton>
            <Button variant={"secondary"}>Sign in</Button>
          </SignInButton>
        </div>
      </div>
    </main>
  );
};

export default AppPage;
