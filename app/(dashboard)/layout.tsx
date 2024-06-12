import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
        <Logo />
  <Tabs defaultValue="account" className="w-[auto] items-center ">
  <TabsList>
    <TabsTrigger value="Home">Dashboard</TabsTrigger>
    <TabsTrigger value="Static">Analytics</TabsTrigger>
    <TabsTrigger value="password">Responses</TabsTrigger>
    <TabsTrigger value="Data Export">Data Export</TabsTrigger>

  </TabsList>
  
</Tabs>


        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
        </div>  
      </nav>
      
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  );
}

export default Layout;