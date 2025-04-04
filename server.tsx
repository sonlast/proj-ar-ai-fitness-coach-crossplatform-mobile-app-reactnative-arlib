import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
// import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
// import FormData from 'form-data';
import dotenv from 'dotenv';
// import { Readable } from 'stream'; // Import Readable from 'stream'

import { RealtimeClient } from '@speechmatics/real-time-client';
import fs from 'fs';
import path from 'path';
import { WebSocket, WebSocketServer } from 'ws';

dotenv.config();

const app = express();
const server = createServer(app);
const port = 3000;

app.use(bodyParser.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  process.env.EXPO_PUBLIC_SUPABASE_KEY || ''
);

const SPEECHMATICS_API_KEY = process.env.EXPO_PUBLIC_SPEECHMATICS_API_KEY;
// const SPEECHMATICS_URL = 'https://asr.api.speechmatics.com/v2/jobs';
const SPEECHMATICS_RT_URL = "https://mp.speechmatics.com/v1/api_keys?type=rt";

if (!SPEECHMATICS_API_KEY) {
  throw new Error('Speechmatics API key is missing');
}

const wss = new WebSocketServer({ server });

const clients = new Set();

wss.on('connection', (ws: any) => {
  console.log('New client connected');
  clients.add(ws);

  ws.on('close', () => {
    console.log('Client disconnected'); 
    clients.delete(ws); 
  });
});

async function fetchJWT(): Promise<string> {
  const apiKey = SPEECHMATICS_API_KEY;
  const uRL = SPEECHMATICS_RT_URL;

  const resp = await fetch(uRL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      ttl: 3600,
    }),
  });

  if (!resp.ok) {
    throw new Error('Bad response from API');
  }

  return (await resp.json()).key_value;
}

const broadcastTranscription = (message: string) => {
  clients.forEach((client: any) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'transcription', data: message}));
    }
  });
};

async function transcribeFileRealTime(filePath: string) {
  const client = new RealtimeClient();
  let finalText = '';

  client.addEventListener('receiveMessage', ({ data }) => {
    if (data.message === 'AddPartialTranscript') {
      const partialText = data.results
        .map((r) => r.alternatives?.[0].content)
        .join(' ');
      console.log(`Partial Transcript: ${partialText}`);
      broadcastTranscription(partialText);
    } else if (data.message === 'AddTranscript') {
      const text = data.results.map((r) => r.alternatives?.[0].content).join(' ');
      finalText += text;
      console.log(`Final Transcript: ${finalText}`);
      broadcastTranscription(finalText);  
    } else if (data.message === 'EndOfTranscript') {
      console.log('End of Transcript');
      broadcastTranscription('End of Transcript');
    }
  });

  const jwt = await fetchJWT();
  const fileStream = fs.createReadStream(filePath, {
    highWaterMark: 4096, // avoid sending faster than real-time
  });

  await client.start(jwt, {
    transcription_config: {
      language: 'en',
      enable_partials: true,
    },
  });

  fileStream.on('data', (sample: any) => {
    client.sendAudio(sample);
  });

  fileStream.on('end', () => {
    client.stopRecognition();
  });
}

app.post('/transcribe', async (req: any, res: any) => {
  try {
    const { filePath } = req.body;

    if (!filePath) {
      return res.status(400).json({ error: 'File path is required' });
    }

    console.log('Downloading file from Supabase Storage:', filePath);

    const { data: fileData, error: downloadError } = await supabase
      .storage
      .from('ar-fitcoach')
      .download(filePath);

    if (downloadError) {
      console.error('Error downloading file:', downloadError);
      return res.status(500).json({ error: 'Failed to download audio file' });
    }

    console.log('File downloaded successfully');

    const assetsDir = path.join(__dirname, 'assets/temp_audio');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    // Convert the ArrayBuffer to a Buffer
    const audioBuffer = Buffer.from(await fileData.arrayBuffer());

    const localFilePath = path.join(assetsDir, 'temp_audio.m4a');
    await fs.promises.writeFile(localFilePath, audioBuffer);

    await transcribeFileRealTime(localFilePath);

    res.json({ transcription: 'Real-time transcription in progress' });
  } catch (error) {
    console.error('Error in transcription:', error);
    res.status(500).json({ error: 'Failed to transcribe audio' });
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// import express from 'express';
// import bodyParser from 'body-parser';
// import axios from 'axios';
// import { createClient } from '@supabase/supabase-js';
// import FormData from 'form-data';
// import dotenv from 'dotenv';
// import { Readable } from 'stream'; // Import Readable from 'stream'

// dotenv.config();

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());

// // Initialize Supabase client
// const supabase = createClient(
//   process.env.EXPO_PUBLIC_SUPABASE_URL || '',
//   process.env.EXPO_PUBLIC_SUPABASE_KEY || ''
// );

// const SPEECHMATICS_API_KEY = process.env.EXPO_PUBLIC_SPEECHMATICS_API_KEY;
// const SPEECHMATICS_URL = 'https://asr.api.speechmatics.com/v2/jobs';

// if (!SPEECHMATICS_API_KEY) {
//   throw new Error('Speechmatics API key is missing');
// }

// const fetchTranscriptionResults = async (jobId: string) => {
//   const resultsResponse = await axios.get(`${SPEECHMATICS_URL}/${jobId}/transcript?format=txt`, {
//     headers: {
//       'Authorization': `Bearer ${SPEECHMATICS_API_KEY}`,
//     },
//   });

//   console.log('Transcription Results:', resultsResponse.data); // Log the transcription results

//   return resultsResponse.data || 'No transcript available';
// };
// // Endpoint to handle transcription requests
// app.post('/transcribe', async (req: any, res: any) => {
//   try {
//     const { filePath } = req.body;

//     if (!filePath) {
//       return res.status(400).json({ error: 'File path is required' });
//     }

//     console.log('Downloading file from Supabase Storage:', filePath);

//     // Download the audio file from Supabase Storage
//     const { data: fileData, error: downloadError } = await supabase
//       .storage
//       .from('ar-fitcoach') // Bucket name
//       .download(filePath); // Full file path, e.g., 'recordings/example-audio-file.m4a'

//     if (downloadError) {
//       console.error('Error downloading file:', downloadError);
//       return res.status(500).json({ error: 'Failed to download audio file' });
//     }

//     console.log('File downloaded successfully');

//     // Convert the downloaded file to a buffer
//     const audioBuffer = await fileData.arrayBuffer();

//     // Convert the buffer to a Readable stream
//     const audioStream = Readable.from(Buffer.from(audioBuffer));

//     // Prepare the form data for Speechmatics API
//     const formData = new FormData();
//     formData.append('data_file', audioStream, {
//       filename: filePath.split('/').pop(), // Use the file name from the path
//       contentType: 'audio/m4a', // Set the correct content type
//     });

//     // Correct job configuration for Speechmatics API
//     const jobConfig = {
//       type: 'transcription', // Required field
//       transcription_config: {
//         language: 'en', // Language configuration
//         operating_point: 'standard', // Operating point configuration
//       },
//     };

//     formData.append('config', JSON.stringify(jobConfig));

//     // Send the audio file to Speechmatics for transcription
//     const response = await axios.post(SPEECHMATICS_URL, formData, {
//       headers: {
//         ...formData.getHeaders(),
//         'Authorization': `Bearer ${SPEECHMATICS_API_KEY}`,
//       },
//     });

//     console.log('Speechmatics API response:', JSON.stringify(response.data, null, 2)); 

//     const transcriptionJobId = response.data.id;
//     console.log(`Transcription ${transcriptionJobId}`);

//     // Function to check the status of the transcription job
//     const checkJobStatus = async (jobId: string) => {
//       const jobStatus = await axios.get(`${SPEECHMATICS_URL}/${jobId}`, {
//         headers: {
//           'Authorization': `Bearer ${SPEECHMATICS_API_KEY}`,
//         },
//       });

//       console.log('Job Status', JSON.stringify(jobStatus.data, null, 2));

//       if (jobStatus.data.job.status === 'done') {
//         // Check the correct field for the transcription results
//         return await fetchTranscriptionResults(jobId); 
//         // return jobStatus.data.job.transcript || 'No transcript available';
//       } else if (jobStatus.data.job.status === 'running' && jobStatus.data.job.partial_transcript) {
//         return jobStatus.data.job.partial_transcript; // Return partial results
//       } else {
//         return null;
//       }
//     };

//     // Poll the Speechmatics API for the transcription result (with timeout)
//     const MAX_POLLING_TIME = 5 * 60 * 1000; // 5 minutes
//     const startTime = Date.now();

//     // Poll the Speechmatics API for the transcription result
//     let transcript = await checkJobStatus(transcriptionJobId);
//     console.log(`Transcription ${transcript}`);
//     while (!transcript && Date.now() - startTime < MAX_POLLING_TIME) {
//       await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again
//       transcript = await checkJobStatus(transcriptionJobId);
//       console.log(`Transcription ${transcript}`);
//     }

//     if (!transcript) {
//       throw new Error('Transcription job timed out');
//     }

//     // Return the transcription result to the client
//     res.json({ transcription: transcript });
//   } catch (error) {
//     console.error('Error in transcription:', error);
//     res.status(500).json({ error: 'Failed to transcribe audio' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });