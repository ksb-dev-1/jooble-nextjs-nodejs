interface Props {
  children: React.ReactNode;
}

const InnerLayout: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default InnerLayout;
