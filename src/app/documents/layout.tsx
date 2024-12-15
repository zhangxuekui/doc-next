interface DocumentsLayoutProps {
  children: React.ReactNode;
}

const DocumentsLayout = ({ children }: DocumentsLayoutProps) => {
  return <div className="flex flex-col gap-red-500">
     {children}</div>;
};

export default DocumentsLayout;
