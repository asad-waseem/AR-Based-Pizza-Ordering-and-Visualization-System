import { NextResponse } from 'next/server';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import fs from 'fs';
import os from 'os';

export async function POST(req) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const tts = new MsEdgeTTS();
    await tts.setMetadata('en-US-JennyNeural', OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);

    const result = await tts.toFile(os.tmpdir(), text.trim());
    const audioPath = result.audioFilePath;

    if (!audioPath || !fs.existsSync(audioPath)) {
      console.error('[TTS] Audio file was not created');
      return NextResponse.json({ error: 'TTS audio file generation failed' }, { status: 500 });
    }

    const audioBuffer = fs.readFileSync(audioPath);

    // Clean up temp file
    try {
      fs.unlinkSync(audioPath);
    } catch (cleanErr) {
      // Non-fatal if unlink fails
    }

    if (audioBuffer.length === 0) {
      return NextResponse.json({ error: 'TTS returned empty audio' }, { status: 500 });
    }

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(audioBuffer.length),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    console.error('[TTS] Error:', error?.message || error);
    return NextResponse.json({ error: 'TTS generation failed' }, { status: 500 });
  }
}
