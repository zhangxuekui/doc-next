interface DocumentsLayoutProps {
  children: React.ReactNode;
}

const DocumentsLayout = ({ children }: DocumentsLayoutProps) => {
  return <div className="flex flex-col gap-red-500">
    <nav className="w-full bg-red-500">Documents Layout</nav>
     {children}</div>;
};

export default DocumentsLayout;
