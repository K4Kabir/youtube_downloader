import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

const DownloadCard = ({ data }) => {
  return (
    <Card>
      <CardTitle className="text-center p-3">
        {data.quality?.toUpperCase()}
      </CardTitle>
      <CardDescription className="text-center p-3">
        {data?.height && data?.width
          ? `${data?.height + "*" + data?.width}`
          : "Resolution is not Available"}
      </CardDescription>
      <CardContent>
        <div className="flex flex-col items-start gap-4">
          <p className="font-bold"> FPS: {data.fps || "---"}</p>
          <p
            className={`${
              data?.hasAudio ? "text-green-400" : "text-red-500"
            } font-bold`}
          >
            AUDIO: {data.hasAudio ? "Yes" : "No"}
          </p>
          <p
            className={`${
              data?.hasVideo ? "text-green-400" : "text-red-500"
            } font-bold`}
          >
            VIDEO: {data.hasVideo ? "Yes" : "No"}
          </p>
          <div className="truncate">
            <Link target="_blank" href={data.url}>
              <Button>
                <Download />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DownloadCard;
