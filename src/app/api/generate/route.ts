import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    const { imagePrompt } = await req.json();

    if (!imagePrompt) {
        return NextResponse.json({ error: 'Please provide an image prompt' }, { status: 400 });
    }

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: imagePrompt,
            n: 1,
            size: "1024x1024"
        });

        if (!response.data) {
            throw new Error("Failed to generate image");
        }

        const generatedImageUrl = response.data[0].url;
        if (!generatedImageUrl) {
            throw new Error("Generated image URL is undefined");
        }

        // Fetch the image server-side
        const imageResponse = await fetch(generatedImageUrl);
        const imageData = await imageResponse.arrayBuffer();

        return new NextResponse(imageData, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to generate image due to internal server error" }, { status: 500 });
    }
}
