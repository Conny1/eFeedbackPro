"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PaymentSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const resp = await fetch("../api/user/logout");
        const data = await resp.json();
        if (data.status === 200) {
          localStorage.removeItem("user");
          setTimeout(() => {
            router.push("/auth");
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    logout();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-700">Redirecting to login page...</p>
    </div>
  );
};

export default PaymentSuccess;
