import { type NextRequest, NextResponse } from "next/server"
import Hobby from "../../../lib/models/hobby"
import { dbConnect } from "../../../lib/connection"

// GET /api/hobby - Fetch all hobbies
export async function GET() {
  try {
    await dbConnect()
    const hobbies = await Hobby.find().sort({ createdAt: -1 })
    return NextResponse.json(
      {
        success: true,
        data: hobbies,
        count: hobbies.length,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error fetching hobbies:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch hobbies",
      },
      { status: 500 },
    )
  }
}

// POST /api/hobby - Create a new hobby
export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const body = await req.json()

    // Validate required fields
    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Title is required and must be a string",
        },
        { status: 400 },
      )
    }

    // Trim and validate title length
    const title = body.title.trim()
    if (title.length < 1 || title.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Title must be between 1 and 100 characters",
        },
        { status: 400 },
      )
    }

    const hobbyData = {
      ...body,
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const hobby = await Hobby.create(hobbyData)

    return NextResponse.json(
      {
        success: true,
        data: hobby,
        message: "Hobby created successfully",
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Error creating hobby:", error)

    if (error.code === 11000) {
      // MongoDB duplicate key error
      const field = Object.keys(error.keyPattern)[0]
      return NextResponse.json(
        {
          success: false,
          message: `Hobby with this ${field} already exists`,
        },
        { status: 409 },
      )
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: messages,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
