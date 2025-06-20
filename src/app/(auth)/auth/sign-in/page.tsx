import { GithubSignInButton } from "~/client/features/auth";

export default async function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex flex-col items-center space-y-4 rounded-lg border p-8 shadow-lg">
        <h1 className="text-3xl font-bold">로그인</h1>
        <GithubSignInButton />
      </div>
    </div>
  );
}
