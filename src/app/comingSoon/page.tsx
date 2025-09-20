import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "../universal-components/Sidebar";

interface ComingSoonProps {
  pageName: string;
}

function ComingSoonComponent({ pageName }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gray-50 px-30 py-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="bg-[#FFFFFF] p-4 rounded-lg border-2 shadow-lg">
          <div className="flex items-center justify-center h-64">
            <h1 className="text-4xl font-uncut-sans text-[#444EAA] font-bold text-center">
              {pageName} Coming Soon!
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComingSoon() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-[#F2F2F2]">
      <Sidebar user={user} />
      <div className="flex-1 overflow-auto">
        <ComingSoonComponent pageName="Coming Soon" />
      </div>
    </div>
  );
}