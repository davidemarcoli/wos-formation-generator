import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="absolute right-0 m-4">
        <ModeToggle />
      </div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Card>
            <CardHeader>
              <CardTitle>Bear Formation Generator</CardTitle>
              <CardDescription>Quickly generate the perfect bear formations</CardDescription>
            </CardHeader>
            <CardFooter>
              <a href="/bear">
                <Button>Go to tool</Button>
              </a>
            </CardFooter>
          </Card>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/davidemarcoli/wos-formation-generator"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            Source Code →
          </a>
        </footer>
      </div>
    </div>
  );
}
