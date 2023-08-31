import { prisma } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany();    
    return NextResponse.json({
      status: 'success',
      data: {
        categories
      }
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error,
    }, {
      status: 500
    })
  }
}

export async function POST(request: Request) {
  const { name } = await request.json()
  try {
    const category = await prisma.category.create({
      data: {
        name
      }
    })

    return NextResponse.json({
      status: 'success',
      data: {
        category
      }
    })
    
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error,
    }, {
      status: 500
    })
  }
}