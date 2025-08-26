"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useMounted } from "@/lib/use-mounted";

export default function AdInfo() {

  const [hasDismissed, setHasDismissed] = useState(false);

  const mounted = useMounted();
  if (!mounted) {
    return null;
  }

  const cookies = document.cookie;
  const adsDisabled = cookies.includes("ads_disabled=true");
  const absoluteLegend = cookies.includes("absolute_legend=true");

  if (adsDisabled || absoluteLegend || hasDismissed) {
    return null;
  }

  return (
    <div>
      <p className="mb-2">
        This page serves ads to keep the project alive.
        <br />
        If you want to disable ads, please consider supporting the developer.
      </p>
      <Button
        onClick={() => {
          document.cookie = "ads_disabled=true";
          window.location.reload();
        }}
        variant="secondary"
        data-umami-event="Disable Ads"
      >
        Disable Ads
      </Button>
      <Button
        onClick={() => {
          document.cookie = "absolute_legend=true";
          setHasDismissed(true);
        }}
        className="ml-2"
        data-umami-event="Allow Ads"
      >
        Allow Ads
      </Button>
    </div>
  );
}