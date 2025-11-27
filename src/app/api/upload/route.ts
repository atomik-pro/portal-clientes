import { NextRequest, NextResponse } from 'next/server';
import { GoogleDriveService } from '@/lib/googleDrive';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const driveService = new GoogleDriveService();
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    const result = await driveService.uploadFile(file, folderId);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
