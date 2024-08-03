import BarcodeScanner from "@/components/barcodeScanner";
import CircularBar from "@/components/circularBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <BarcodeScanner />
      <CircularBar title={"hello"} percentage={75} size={200} strokeWidth={20} />
    </main>
  );
}
