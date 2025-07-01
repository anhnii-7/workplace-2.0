import { type NextRequest, NextResponse } from "next/server"
import Event from "../../../lib/models/event"
import { dbConnect } from "../../../lib/connection"
import { isValidObjectId } from "mongoose"

// GET /api/event - Fetch all events
export async function GET() {
  try {
    await dbConnect()
    const events = await Event.aggregate([
      { $lookup: {
          from: 'hobbies',
          localField: 'eventType',
          foreignField: '_id',
          as: 'eventTypeInfo'
      }},
      { $unwind: { path: '$eventTypeInfo', preserveNullAndEmptyArrays: true } },
      { $lookup: {
          from: 'users',
          localField: 'participants',
          foreignField: '_id',
          as: 'participantUsers'
      }},
      { $sort: { eventDate: 1 } }
    ]);
    
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
