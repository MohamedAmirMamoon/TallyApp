'use client'
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "../universal-components/Sidebar";

interface ComingSoonProps {
  pageName: string;
}

function ComingSoonComponent({ pageName }: ComingSoonProps) {
  return (
    <div className=" mt-40 mx-20 bg-[#FFFFFF] p-8 rounded-lg border-2 shadow-lg text-center">
      <h1 className="py-30 px-30 text-4xl font-uncut-sans text-[#444EAA] font-bold">
        {pageName} Coming Soon!
      </h1>
    </div>
  );
}

export default function Products() {
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
        <ComingSoonComponent pageName="Products" />
      </div>
    </div>
  );
}