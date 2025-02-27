import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { endpoint, body } = await request.json()

    // Validate the required inputs
    if (!endpoint || !body) {
      return NextResponse.json({ error: "Endpoint and body are required." }, { status: 400 })
    }

    // Application token stored in environment variable
    const applicationToken = process.env.LANGFLOW_APP_TOKEN

    // Langflow API URL
    const url = `https://api.langflow.astra.datastax.com${endpoint}`

    // Make the API request
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${applicationToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Langflow Error: ${response.status} ${response.statusText}`,
          details: data,
        },
        { status: response.status },
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: "Server Error", details: error.message }, { status: 500 })
  }
}
