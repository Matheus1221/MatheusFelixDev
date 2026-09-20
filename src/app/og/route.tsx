import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f7f5f0", color: "#252723", padding: "64px 80px", borderLeft: "16px solid #4c613e" }}>
      <div style={{ display: "flex", fontSize: 30, color: "#4c613e" }}>{profile.name} / Portfólio</div>
      <div style={{ display: "flex", fontSize: 88, lineHeight: 1.05, letterSpacing: "-4px" }}>
        {profile.role}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 25, color: "#5d6258", borderTop: "1px solid #d7d9cf", paddingTop: 28 }}>
        <span>Frontend · Backend · Dados · Deploy</span><span>Desde {profile.professionalSince}</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
