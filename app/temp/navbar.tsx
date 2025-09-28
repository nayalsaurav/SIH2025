import codingInFlowLogo from "@/assets/coding_in_flow_logo.jpg";
import { ModeToggle } from "@/components/mode-toggle";
import { UserDropdown } from "@/components/user-dropdown";
import { getServerSession } from "@/lib/get-session";
import Image from "next/image";
import Link from "next/link";

export async function Navbar() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) return null;

  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src={codingInFlowLogo}
              alt="AyuTrace Logo"
              width={32}
              height={32}
              className="border-muted rounded-full border"
            />
            AyuTrace
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/lab"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Laboratory
            </Link>
            <Link
              href="/collector"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Collector
            </Link>
            <Link
              href="/processor"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Processor
            </Link>
            <Link
              href="/consumer"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Consumer
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
}
