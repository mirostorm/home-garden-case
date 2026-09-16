'use client';
import { Button } from '@/components/ui';
import { ArrowRightIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Index() {
  return (
    <div className="container">
      <div className="mx-auto flex flex-col items-center justify-center gap-4 p-12 rounded-xl bg-green-700/10 w-fit ">
        <Image src="/assets/logo/logo.svg" alt="Logo" width={120} height={120} priority />
        <h1 className="font-heading text-2xl text-green-900 text-center">
          Welcome to your
          <br />
          <span className="text-5xl font-semibold">Home Garden</span>
        </h1>
        <Link href="/gardens">
          <Button className="font-semibold text-lg px-12 py-2 h-fit">
            Check out your gardens
            <ArrowRightIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
