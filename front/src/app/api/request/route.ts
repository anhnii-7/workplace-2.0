import { NextRequest, NextResponse } from 'next/server';
import RequestModel from '../../../lib/models/request';
import User from '../../../lib/models/user';
import { dbConnect } from '../../../lib/connection';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    console.log(searchParams , "Search Params")
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');
    let query: any = {};
    if (status) query.status = status;
    if (userId) {
      if (type === 'received') query.to = userId;
      else if (type === 'sent') query.from = userId;
    }
    
    const requests = await RequestModel.find(query)
      .populate('from', 'name lastName email role')
      .populate('to', 'name lastName email role');
    
    return NextResponse.json(
      { 
        success: true, 
        data: requests,
        count: requests.length 
      }, 
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch requests" 
      }, 
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { from, to, message, selectedSchedule } = await req.json();
    
    const [fromUser, toUser] = await Promise.all([
      User.findById(from),
      User.findById(to),
    ]);
    
    if (!fromUser || !toUser) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'User not found' 
        }, 
        { status: 404 }
      );
    }
    
    if (toUser.role !== 'mentor') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Can only send requests to mentors' 
        }, 
        { status: 400 }
      );
    }
    
    if (!toUser.availableSchedules.includes(selectedSchedule)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Selected schedule is not available' 
        }, 
        { status: 400 }
      );
    }
    
    const existingRequest = await RequestModel.findOne({
      from,
      to,
      status: 'pending',
    });
    
    if (existingRequest) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Request already sent and pending' 
        }, 
        { status: 400 }
      );
    }  
    const request = await RequestModel.create({
      from,
      to,
      message,
      selectedSchedule,
      status: 'pending',
    });
    
    return NextResponse.json(
      { 
        success: true, 
        data: request,
        message: "Request created successfully"
      }, 
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to create request" 
      }, 
      { status: 500 }
    );
  }
} 