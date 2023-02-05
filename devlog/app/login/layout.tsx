import React from "react";
import LoginForm from "./components/LoginForm";

type Props = {
  children: React.ReactNode;
};

function LoginLayout({ children }: Props) {
  return (
    <div className="flex">
      {/* @ts-ignore */}
      <LoginForm />
      <div className="w-full">{children}</div>
    </div>
  );
}

export default LoginLayout;