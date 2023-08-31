import { prisma } from "@/lib/utils"
import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: any){
  const id = params.id;
  const { name } = await request.json();
  try {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
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

export async function DELETE(request: Request, { params }: any) {
  const id = params.id;
  try {

    await prisma.category.delete({
      where: {
        id,
      }
    })

    return NextResponse.json({
      status: 'success',
      data: {
        id
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