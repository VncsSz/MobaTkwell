import { Button } from "@/components/ui/button";
import { 
  ClerkLoaded, 
  ClerkLoading, 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  SignUpButton
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
          <Image src="/img/TWGif.gif" fill alt="Logo"/>
      </div>
      <div className="flex flex-col items-center gap-y-8">
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
            Aprenda, pratique e se especialize em pensamento computacional.
          </h1>
          <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
            <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
            </ClerkLoading>

            <ClerkLoaded>
              <SignedOut>
                <SignUpButton mode="modal" signInFallbackRedirectUrl="/learn">
                    <Button size="lg" variant="secondary" className="w-full">
                      Começar
                    </Button>
                </SignUpButton>

                <SignInButton mode="modal" signUpFallbackRedirectUrl="/learn">
                    <Button size="lg" variant="primaryOutline" className="w-full">
                      Já tenho uma conta
                    </Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Button size="lg" variant="secondary" className="w-full" asChild>
                  <Link href="/learn">
                    Continue aprendendo
                  </Link>
                </Button>
                <div className="w-full flex flex-col items-center mt-2 sm:hidden">
                  <span className="mb-2 text-sm text-gray-400">Powered by</span>
                  <img
                    src="/img/cnpq.svg"
                    alt="Logo"
                    className="w-32 h-auto sm:w-40 md:w-48"
                  />
                </div>
              </SignedIn>
            </ClerkLoaded>
          </div>
      </div>
    </div>
  )
}
