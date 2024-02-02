import { currentrole } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const role = await currentrole();

  return role === UserRole.ADMIN
    ? new NextResponse(null, { status: 200 })
    : new NextResponse(null, { status: 403 });
}
