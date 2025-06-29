'use client';

import Link from 'next/link';
import EffectsInitializer from "../../components/EffectsInitializer";
import { Button } from "../../components/components/ui/button";

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen pt-36 pb-24 px-4 bg-black">
      <EffectsInitializer />
      <section className="max-w-3xl mx-auto flex flex-col items-center justify-center text-center space-y-16">
        <div className="space-y-8 w-full">
          <h1 className="text-6xl font-bold text-white tracking-tight [text-shadow:_0_4px_12px_rgb(255_255_255_/_20%)] fade-in">
            Registration Successful!
          </h1>
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed [text-shadow:_0_2px_8px_rgb(255_255_255_/_15%)] typing-content">
            Thank you for registering for the NASA Space Apps Challenge 2025 Lucknow Edition. We&apos;re excited to have you on board!
          </p>
          <p className="text-lg text-gray-400 [text-shadow:_0_2px_8px_rgb(255_255_255_/_10%)] fade-in">
            You will receive a confirmation email shortly with more details about the event.
          </p>
        </div>
        <div>
          <Link href="/">
            <Button className="hero-btn primary text-lg px-10 py-5">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
