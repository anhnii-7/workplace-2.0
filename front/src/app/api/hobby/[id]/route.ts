import { type NextRequest, NextResponse } from "next/server"
import Hobby from "../../../../lib/models/hobby"
import { dbConnect } from "../../../../lib/connection"
import { isValidObjectId } from "mongoose"

// GET /api/hobby/[id] - Fetch a specific hobby
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid hobby ID format",
        },
        { status: 400 },
      )
    }

    const hobby = await Hobby.findById(id)

    if (!hobby) {
      return NextResponse.json(
        {
          success: false,
          message: "Hobby not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: hobby,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error fetching hobby:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch hobby",
      },
      { status: 500 },
    )
  }
}

// PUT /api/hobby/[id] - Update a specific hobby
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid hobby ID format",
        },
        { status: 400 },
      )
    }

    const body = await req.json()

    // Validate title if provided
    if (body.title !== undefined) {
      if (typeof body.title !== "string") {
        return NextResponse.json(
          {
            success: false,
            message: "Title must be a string",
          },
          { status: 400 },
        )
      }

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
      body.title = title
    }

    // Add updatedAt timestamp
    body.updatedAt = new Date()

    const hobby = await Hobby.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!hobby) {
      return NextResponse.json(
        {
          success: false,
          message: "Hobby not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: hobby,
        message: "Hobby updated successfully",
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error updating hobby:", error)

    if (error.code === 11000) {
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
        message: "Failed to update hobby",
      },
      { status: 500 },
    )
  }
}

// DELETE /api/hobby/[id] - Delete a specific hobby
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid hobby ID format",
        },
        { status: 400 },
      )
    }

    const hobby = await Hobby.findByIdAndDelete(id)

    if (!hobby) {
      return NextResponse.json(
        {
          success: false,
          message: "Hobby not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Hobby deleted successfully",
        data: hobby,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error deleting hobby:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete hobby",
      },
      { status: 500 },
    )
  }
}
  
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid hobby ID format",
        },
        { status: 400 },
      )
    }

    const body = await req.json()

    // Validate users array if provided
    if (body.users !== undefined) {
      if (!Array.isArray(body.users)) {
        return NextResponse.json(
          {
            success: false,
            message: "Users must be an array of ObjectIds",
          },
          { status: 400 },
        )
      }
      body.users = body.users.map((userId: string) => {
        if (!isValidObjectId(userId)) {
          throw new Error("Invalid user ID format")
        }
        return userId
      })
      // Use $addToSet to add users without duplicates
      const hobby = await Hobby.findByIdAndUpdate(
        id,
        { $addToSet: { users: { $each: body.users } } },
        { new: true, runValidators: true }
      )
      if (!hobby) {
        return NextResponse.json(
          {
            success: false,
            message: "Hobby not found",
          },
          { status: 404 },
        )
      }
      return NextResponse.json(
        {
          success: true,
          data: hobby,
          message: "Hobby updated successfully",
        },
        { status: 200 },
      )
    }

    // If no users array, fallback to default update logic
    const hobby = await Hobby.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!hobby) {
      return NextResponse.json(
        {
          success: false,
          message: "Hobby not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: hobby,
        message: "Hobby updated successfully",
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error updating hobby:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update hobby",
      },
      { status: 500 },
    )
  }
}