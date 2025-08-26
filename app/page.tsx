"use client";

import AdInfo from "@/components/ad-info";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coffee, Github } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="absolute left-0 top-0 m-4 p-4 rounded-md border">
        <AdInfo />
      </div>
      <div className="absolute right-0 m-4">
        <ModeToggle />
      </div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Card>
            <CardHeader>
              <CardTitle>Bear Formation Generator</CardTitle>
              <CardDescription>
                Quickly generate the perfect bear formations
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <a href="/bear">
                <Button data-umami-event="Navigate to Bear Formation Tool">
                  Go to tool
                </Button>
              </a>
            </CardFooter>
          </Card>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          Discord: @leo1305
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/davidemarcoli/wos-formation-generator"
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="View Source"
          >
            <Github />
            Source Code →
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://buymeacoffee.com/davidemarcoli"
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="Support Developer"
          >
            <Coffee />
            Support me →
          </a>
        </footer>
      </div>
    </div>
  );
}
