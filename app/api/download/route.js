import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function POST(req) {
  try {
    const { url } = await req.json();
    let info = await ytdl.getInfo(url);
    if (info) {
      return NextResponse.json(
        {
          message: info.formats,
          success: true,
          thumbnail: info.videoDetails.thumbnails[0].url,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
