import { google } from 'googleapis';
import { Readable } from 'stream';

export class GoogleDriveService {
  private auth;
  private drive;

  constructor() {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const projectId = process.env.GOOGLE_PROJECT_ID;

    if (!clientEmail || !privateKey || !projectId) {
      throw new Error('Missing Google Cloud credentials');
    }

    this.auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
        project_id: projectId
      },
      scopes: ['https://www.googleapis.com/auth/drive.file']
    });

    this.drive = google.drive({ version: 'v3', auth: this.auth });
  }

  async uploadFile(file: File, folderId?: string) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const stream = Readable.from(buffer);

      const response = await this.drive.files.create({
        requestBody: {
          name: file.name,
          mimeType: file.type,
          parents: folderId ? [folderId] : undefined
        },
        media: {
          mimeType: file.type,
          body: stream
        },
        fields: 'id, name, webViewLink'
      });

      return response.data;
    } catch (error) {
      console.error('Google Drive Upload Error:', error);
      throw error;
    }
  }
}
