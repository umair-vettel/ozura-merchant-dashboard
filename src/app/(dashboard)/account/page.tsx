import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import MyAccount from "@/components/dashboard/MyAccount";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      {/* <div>
        <h3 className="text-lg font-medium">aaa</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm /> */}
      <MyAccount />
    </div>
  );
}
