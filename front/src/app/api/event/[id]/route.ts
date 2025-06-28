import { type NextRequest, NextResponse } from "next/server"
import Event from "../../../../lib/models/event"
import { dbConnect } from "../../../../lib/connection"
import { isValidObjectId } from "mongoose"

// GET /api/event/[id] - Fetch a specific event
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid event ID format",
        },
        { status: 400 },
      )
    }

    const event = await Event.findById(id).populate('eventType', 'title image')

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "Event not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: event,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error fetching event:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch event",
      },
      { status: 500 },
    )
  }
}

// PUT /api/event/[id] - Update a specific event
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid event ID format",
        },
        { status: 400 },
      )
    }

    const body = await req.json()

    // Validate eventType if provided
    if (body.eventType && !isValidObjectId(body.eventType)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid event type ID format",
        },
        { status: 400 },
      )
    }

    // Add updatedAt timestamp
    body.updatedAt = new Date()

    const event = await Event.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).populate('eventType', 'title image')

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "Event not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: event,
        message: "Event updated successfully",
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error updating event:", error)

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
        message: "Failed to update event",
      },
      { status: 500 },
    )
  }
}

// DELETE /api/event/[id] - Delete a specific event
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid event ID format",
        },
        { status: 400 },
      )
    }

    const event = await Event.findByIdAndDelete(id)

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "Event not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Event deleted successfully",
        data: event,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error deleting event:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete event",
      },
      { status: 500 },
    )
  }
}

// PATCH /api/event/[id]/join - Join an event
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params
    const body = await req.json()

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid event ID format",
        },
        { status: 400 },
      )
    }

    const event = await Event.findById(id)
    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "Event not found",
        },
        { status: 404 },
      )
    }

    // Check if action is join or leave
    const { action, userName } = body

    if (!userName || typeof userName !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "User name is required",
        },
        { status: 400 },
      )
    }

    let updatedEvent

    if (action === "join") {
      // Check if event is full
      if (event.participants.length >= event.maxParticipants) {
        return NextResponse.json(
          {
            success: false,
            message: "Event is full",
          },
          { status: 400 },
        )
      }

      // Check if user is already a participant
      if (event.participants.includes(userName)) {
        return NextResponse.json(
          {
            success: false,
            message: "User is already a participant",
          },
          { status: 400 },
        )
      }

      // Add user to participants
      updatedEvent = await Event.findByIdAndUpdate(
        id,
        { 
          $push: { participants: userName },
          updatedAt: new Date()
        },
        { new: true }
      ).populate('eventType', 'title image')

    } else if (action === "leave") {
      // Remove user from participants
      updatedEvent = await Event.findByIdAndUpdate(
        id,
        { 
          $pull: { participants: userName },
          updatedAt: new Date()
        },
        { new: true }
      ).populate('eventType', 'title image')

    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid action. Use 'join' or 'leave'",
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedEvent,
        message: `Successfully ${action === "join" ? "joined" : "left"} the event`,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error updating event participation:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update event participation",
      },
      { status: 500 },
    )
  }
} 