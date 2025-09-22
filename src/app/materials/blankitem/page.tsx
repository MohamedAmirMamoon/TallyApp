'use client'
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "../../universal-components/Sidebar";
import BlankItem from "./BlankItem";

export default function BlankItemPage() {
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

  // Mock data for demonstration
  const mockItems = [
    {
      name: "Sample Item",
      image: "https://via.placeholder.com/48x48.png",
      color: "Blue",
      size: "M",
      quantity: "10",
      threshold: "5"
    }
  ];

  const handleChangeQuantity = (index: number, delta: number) => {
    console.log(`Changing quantity for item ${index} by ${delta}`);
  };

  return (
    <div className="flex h-screen bg-[#F2F2F2]">
      <Sidebar user={user} />
      <div className="flex-1 overflow-auto">
        <div className="min-h-screen bg-gray-50 px-30 py-12">
          <div className="max-w-[1800px] mx-auto">
            <BlankItem items={mockItems} onChangeQuantity={handleChangeQuantity} />
          </div>
        </div>
      </div>
    </div>
  );
}