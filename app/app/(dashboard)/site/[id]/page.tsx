export default function SitePage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <span>{id}</span>;
}
