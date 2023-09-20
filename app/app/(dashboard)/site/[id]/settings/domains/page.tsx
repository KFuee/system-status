import CustomDomainForm from "@/components/sites/custom-domain-form";
import SubdomainForm from "@/components/sites/subdomain-form";

export default async function SiteDomainSettingsPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma?.site.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-4">
      <SubdomainForm site={data} />
      <CustomDomainForm site={data} />
    </div>
  );
}
