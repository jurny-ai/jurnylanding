"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/bb454a78-d8c4-4776-aa28-246c06947dfc.png" 
            alt="Jurny Logo" 
            className="h-5 opacity-90" 
          />
        </Link>
        <nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium text-foreground/80 hover:text-foreground gap-1 px-2">
                Articles
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[260px]">
              <DropdownMenuItem asChild>
                <Link href="/articles/csr-vs-ssr" className="cursor-pointer">
                  Your Website Looks Amazing. Can Anyone Find It?
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/articles/usability-testing-problems" className="cursor-pointer">
                  The Biggest Problems With Usability Testing Today
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/articles/i-found-an-issue-now-what" className="cursor-pointer">
                  How to Debug with Cursor
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
};

export default Header;
