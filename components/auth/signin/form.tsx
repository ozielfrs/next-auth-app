"use client";

import CardWrapper from "@/components/card/wrapper";
import Header from "../header";
import BackButton from "./back/button";

const SignInForm = () => {
  return (
    <CardWrapper
      header={<Header />}
      description={<>Sign in to your account to continue</>}
      footer={
        <>
          <BackButton href="register" label="Not registered yet?" />
        </>
      }
      showSocials
    >
      Here may be the form
    </CardWrapper>
  );
};

export default SignInForm;
