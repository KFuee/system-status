export default async function SiteHomePage({
  params: { domain },
}: {
  params: { domain: string };
}) {
  return (
    <div>
      <span>{domain}</span>
    </div>
  );
}
