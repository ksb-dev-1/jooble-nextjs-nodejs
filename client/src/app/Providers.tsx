"use client";

interface Props {
  children: React.ReactNode;
}

const Providers: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Providers;
