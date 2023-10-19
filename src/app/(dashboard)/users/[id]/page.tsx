import UserDetailsPage from "@/components/dashboard/Users/UserDetailsPage";

export default function DemoPage({ params }: any) {
  return (
    <>
      <UserDetailsPage id={params.id} />
    </>
  );
}
