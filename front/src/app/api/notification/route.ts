import { NextRequest, NextResponse } from "next/server";
import Notification from "../../../lib/models/notification";
import { dbConnect } from "../../../lib/connection";

// GET: Fetch notifications for a user (to)
export async function GET(req: NextRequest) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const to = searchParams.get("to");
    const from = searchParams.get("from");
    if (!to && !from) {
        return NextResponse.json({ error: "to (userId) or from (userId) is required" }, { status: 400 });
    }
    const match: any = {};
    if (to) match.to = { $in: [new (require('mongoose')).Types.ObjectId(to)] };
    if (from) match.from = new (require('mongoose')).Types.ObjectId(from);
    const notifications = await Notification.aggregate([
      { $match: match },
      { $sort: { createdAt: -1 } },
      { $lookup: {
          from: 'users',
          localField: 'from',
          foreignField: '_id',
          as: 'fromUser'
      }},
      { $unwind: { path: '$fromUser', preserveNullAndEmptyArrays: true } },
      { $lookup: {
          from: 'departments',
          localField: 'fromUser.department',
          foreignField: '_id',
          as: 'fromUser.departmentInfo'
      }},
      { $unwind: { path: '$fromUser.departmentInfo', preserveNullAndEmptyArrays: true } },
      { $lookup: {
          from: 'users',
          localField: 'to',
          foreignField: '_id',
          as: 'toUser'
      }},
      { $unwind: { path: '$toUser', preserveNullAndEmptyArrays: true } },
      { $lookup: {
          from: 'departments',
          localField: 'toUser.department',
          foreignField: '_id',
          as: 'toUser.departmentInfo'
      }},
      { $unwind: { path: '$toUser.departmentInfo', preserveNullAndEmptyArrays: true } },
      { $lookup: {
          from: 'events',
          localField: 'typeId',
          foreignField: '_id',
          as: 'event'
      }},
      { $unwind: { path: '$event', preserveNullAndEmptyArrays: true } },
      { $lookup: {
          from: 'hobbies',
          localField: 'event.eventType',
          foreignField: '_id',
          as: 'eventTypeInfo'
      }},
      { $unwind: { path: '$eventTypeInfo', preserveNullAndEmptyArrays: true } },
      { $lookup: {
          from: 'requests',
          localField: 'typeId',
          foreignField: '_id',
          as: 'request'
      }},
      // Deduplicate notifications by _id
      { $group: {
          _id: '$_id',
          doc: { $first: '$$ROOT' }
      }},
      { $replaceRoot: { newRoot: '$doc' } }
    ]);
    return NextResponse.json({ success: true, data: notifications });
}

// POST: Create a new notification
export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json()
        const notification = await Notification.create(body);
        return NextResponse.json({ success: true, data: notification }, { status: 201 });
    } catch (error) {
        console.error("Error creating notification:", error);
        const message = error instanceof Error ? error.message : "Failed to create notification";
        return NextResponse.json({ error: "Failed to create notification", message }, { status: 500 });
    }
}

// PATCH: Update notification status (e.g., mark as read/accepted/declined)
export async function PATCH(req: NextRequest) {
    await dbConnect();
    try {
        const { notificationId, status } = await req.json();
        if (!notificationId || !status) {
            return NextResponse.json({ error: "notificationId and status are required" }, { status: 400 });
        }
        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            { status },
            { new: true }
        );
        if (!notification) {
            return NextResponse.json({ error: "Notification not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: notification });
    } catch (error) {
        console.error("Error updating notification:", error);
        return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
    }
}