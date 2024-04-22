"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import DownloadCard from "@/components/DownloadCard";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDetails = async function () {
    setImage("");
    try {
      setLoading(true);
      let res = await axios.post("/api/download", { url: url });
      setLoading(false);
      if (res.data.success) {
        setData(res.data.message);
        setImage(res.data.thumbnail);
      }
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      setData([]);
    }
  };
  console.log(data);
  return (
    <div className="py-7 px-7">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl py-4">
        Paste Link to see available formats
      </h1>
      <div className="flex items-center gap-3">
        <Input
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="Paste Link here!"
        />

        <Button onClick={fetchDetails} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Please wait" : "Fetch"}
        </Button>
      </div>
      {image && (
        <div className="flex justify-center py-6">
          <Image src={image} width={500} height={500} />
        </div>
      )}

      {loading ? (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl py-7">
          Please wait...
        </h1>
      ) : (
        <div className="grid grid-cols-2 gap-4 py-4">
          {data.map((el, index) => {
            return <DownloadCard key={index} data={el} />;
          })}
        </div>
      )}
    </div>
  );
}
