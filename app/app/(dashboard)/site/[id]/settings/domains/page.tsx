import CustomDomainForm from "@/components/sites/custom-domain-form";
import SubdomainForm from "@/components/sites/subdomain-form";

export default function SiteDomainSettingsPage() {
  return (
    <div className="space-y-4">
      <SubdomainForm />
      <CustomDomainForm />
    </div>
  );
}
