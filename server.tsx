import express from 'express';
import multer from 'multer';
import axios from 'axios';
import * as dotenv from 'dotenv';
import fs from 'fs';
import { supabase } from './utils/supabase'; // Adjust the path to your Supabase utility file

dotenv.config();

const app = express();
const port = 3000;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Rev AI API endpoint and access token
const REVAI_API_URL = 'https://api.rev.ai/speechtotext/v1/jobs';
const REVAI_ACCESS_TOKEN = process.env.EXPO_PUBLIC_REVAI_ACCESS_TOKEN;

console.log(REVAI_ACCESS_TOKEN, REVAI_API_URL);

app.post('/transcribe', upload.single('audio'), async (req: any, res: any) => {
  let audioFilePath: string | null = null; // Declare audioFilePath outside the try block

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    audioFilePath = req.file.path;

    // Step 1: Upload the file to Supabase Storage
    const fileName = `recordings/${Date.now()}_${req.file.originalname}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('ar-fitcoach') // Replace 'ar-fitcoach' with your Supabase bucket name
      .upload(fileName, fs.createReadStream(audioFilePath as string), {
        contentType: req.file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      console.error('Error uploading to Supabase:', uploadError);
      return res.status(500).json({ error: 'Failed to upload file to Supabase' });
    }

    // Get the public URL of the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('ar-fitcoach')
      .getPublicUrl(fileName);

    const mediaUrl = publicUrlData?.publicUrl;
    if (!mediaUrl) {
      return res.status(500).json({ error: 'Failed to retrieve public URL from Supabase' });
    }

    console.log('Public URL:', mediaUrl);

    // Step 2: Submit the audio file to Rev AI
    const jobResponse = await axios.post(
      REVAI_API_URL,
      {
        source_config: {
          url: mediaUrl, // Publicly accessible URL of the audio file
        },
        metadata: 'Transcription request from my app',
      },
      {
        headers: {
          Authorization: `Bearer ${REVAI_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const jobId = jobResponse.data.id;

    // Step 3: Poll for transcription results
    let transcriptionResult;
    while (true) {
      const statusResponse = await axios.get(`${REVAI_API_URL}/${jobId}`, {
        headers: { Authorization: `Bearer ${REVAI_ACCESS_TOKEN}` },
      });

      if (statusResponse.data.status === 'completed') {
        transcriptionResult = statusResponse.data;
        break;
      } else if (statusResponse.data.status === 'failed') {
        return res.status(500).json({ error: 'Transcription failed' });
      }

      // Wait for a few seconds before polling again
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    // Step 4: Retrieve the transcription text
    const transcriptResponse = await axios.get(
      `${REVAI_API_URL}/${jobId}/transcript`,
      {
        headers: { Authorization: `Bearer ${REVAI_ACCESS_TOKEN}` },
      }
    );

    const transcriptText = transcriptResponse.data;

    // Respond with the transcription text
    res.json({ transcript: transcriptText });
  } catch (error) {
    console.error('Error transcribing audio:', error);
    res.status(500).json({ error: 'Failed to transcribe audio' });
  } finally {
    // Clean up the local file
    if (audioFilePath) {
      fs.unlink(audioFilePath, (err) => {
        if (err) {
          console.error('Failed to delete file:', err);
        } else {
          console.log('File deleted successfully');
        }
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});