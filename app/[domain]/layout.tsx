export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col min-h-screen p-6">{children}</div>;
}
