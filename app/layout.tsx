import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import { ptBR } from '@clerk/localizations'
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";

const font = Nunito({ subsets: ["latin"] });
//Ver load para colocar simbolo CNPQ
export const metadata: Metadata = {
  title: {
    template: '%s | ThinkWell',
    default: 'ThinkWell - Aprenda lógica computacional.',
  },
  description:
    'Desenvolva suas habilidades e supere desafios nessa nova jordana de aprendizagem sobre lógica computacional!',
  keywords: ['ThinkWell', 'Lógica computacional', 'Lógica', 'Computação'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
    <html lang="en">
      <body className={font.className}>
        <Toaster />
        <ExitModal />
        <HeartsModal />
        <PracticeModal />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
