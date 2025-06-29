import { type NextRequest, NextResponse } from "next/server"
import Event from "../../../lib/models/event"
import { dbConnect } from "../../../lib/connection"
import { isValidObjectId } from "mongoose"

// GET /api/event - Fetch all events
export async function GET() {
  try {
    await dbConnect()
    const events = await Event.find()
      .populate('eventType', 'title image')
      .sort({ eventDate: 1 })
    
    return NextResponse.json(
      {
        success: true,
        data: events,
        count: events.length,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error fetching events:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch events",
      },
      { status: 500 },
    )
  }
}

// POST /api/event - Create a new event
export async function POST(req: NextRequest) {
  try {
    await dbConnect()
    const body = await req.json()

    // Validate required fields
    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Event name is required and must be a string",
        },
        { status: 400 },
      )
    }

    if (!body.eventType || !isValidObjectId(body.eventType)) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid event type (hobby ID) is required",
        },
        { status: 400 },
      )
    }

    if (!body.eventDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Event date is required",
        },
        { status: 400 },
      )
    }

    if (!body.eventTime || typeof body.eventTime !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Event time is required and must be a string",
        },
        { status: 400 },
      )
    }

    if (!body.eventLocation || typeof body.eventLocation !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Event location is required and must be a string",
        },
        { status: 400 },
      )
    }

    if (!body.maxParticipants || typeof body.maxParticipants !== "number" || body.maxParticipants < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Max participants is required and must be a positive number",
        },
        { status: 400 },
      )
    }

    if (!body.description || typeof body.description !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Description is required and must be a string",
        },
        { status: 400 },
      )
    }

    if (!body.organizer || typeof body.organizer !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Organizer is required and must be a string",
        },
        { status: 400 },
      )
    }

    const eventData = {
      ...body,
      participants: [body.organizer], // Automatically add organizer as first participant
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const event = await Event.create(eventData)
    const populatedEvent = await Event.findById(event._id).populate('eventType', 'title image')

    return NextResponse.json(
      {
        success: true,
        data: populatedEvent,
        message: "Event created successfully",
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Error creating event:", error)

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
