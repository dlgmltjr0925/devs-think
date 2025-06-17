"use client";

import { Button } from "~/client/shared/ui/button";
import { signIn } from "../api";

interface GithubSignInButtonProps {
  callbackUrl?: string;
}

export const GithubSignInButton = ({
  callbackUrl = "/",
}: GithubSignInButtonProps) => {
  return (
    <Button onClick={() => signIn("github", { callbackUrl })}>
      Sign in with Github
    </Button>
  );
};
