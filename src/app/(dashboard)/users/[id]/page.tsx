import UserDetailsPage from "@/components/dashboard/users/UserDetailsPage";

export default function DemoPage({ params }: any) {
  return (
    <>
      <UserDetailsPage id={params.id} />
    </>
  );
}
