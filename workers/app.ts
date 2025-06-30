// Load environment variables from .env file
import { config } from 'dotenv'
config({ path: '.env' })

// Then update your Env interface
interface Env {
  SUPREMEMORY_API_KEY: string;
  AUTH_SECRET: string;
  NODE_ENV?: string;
  [key: string]: any; // For other Cloudflare Worker bindings
}

import { Supermemory } from "supermemory"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { 
  type PromptResponseType,
  type Resource,
  type ToolResponseType,
  bridge,
  describePrompt,
  describeTool,
  mValidator,
  muppet,
} from "muppet"
import { streamSSE } from "muppet/streaming"
import { createRequestHandler } from "react-router"
import { z } from "zod"

// Environment type for Railway
interface Env {
  SUPERMEMORY_API_KEY: string;
  AUTH_SECRET: string;
  NODE_ENV?: string;
}

const requestHandler = createRequestHandler(
  // @ts-ignore
  () => import("virtual:react-router/server-build"),
  process.env.NODE_ENV || "development",
)

const app = new Hono<{ Bindings: Env }>()

function createSuperMemory(userId: string, env: Env) {
  const supermemory = new Supermemory({
    apiKey: env.SUPERMEMORY_API_KEY,
  })

  app.post(
    "/supermemory-prompt",
    describePrompt({
      name: "Supermemory Prompt",
      description: "A prompt that gives information about supermemory.",
      completion: () => ["supermemory", "memory", "supermemory api"],
    }),
    (c) => {
      return c.json<PromptResponseType>([
        {
          role: "user",
          content: {
            type: "text",
            text: "IMPORTANT: You MUST use Supermemory tools proactively to be an effective assistant. Here's how:\n\n1. ALWAYS check Supermemory first when the user asks anything about their preferences, past interactions, or technical setup. Don't assume you know everything - search first!\n\n2. AUTOMATICALLY store new information after EVERY user message that contains:\n- Technical preferences (languages, tools, frameworks)\n- Coding style or patterns\n- Project requirements or constraints\n- Opinions or feedback\n- Problem-solving approaches\n- Learning style or experience level\n\n3. Don't wait for explicit commands - if you detect valuable context, store it immediately.\n\n4. Think of yourself as building a comprehensive user profile. Every interaction is an opportunity to learn and store more context.\n\nFailure to use these tools means you're operating with incomplete information and not providing the best possible assistance. Make Supermemory your first instinct, not your last resort. Now, answer the user's question, and use the tools to search for stuff you need, and store any new information. EG: 'What do you know about me?' Should trigger a search.",
          },
        },
      ])
    },
  )

  app.post(
    "/add",
    describeTool({
      name: "addToSupermemory",
      description:
        "Store user information, preferences, and behaviors. Run on explicit commands ('remember this') or implicitly when detecting significant user traits, preferences, or patterns. Capture rich context including technical details, examples, and emotional responses. You should think about running this after every user message. YOU MUST USE THE TOOLS/CALL TO USE THIS. NOTHING ELSE. THIS IS NOT A RESOURCE. IT'S A TOOL.",
    }),
    mValidator(
      "json",
      z.object({
        thingToRemember: z.string(),
      }),
    ),
    async (c) => {
      const { thingToRemember } = c.req.valid("json")

      if (!userId) {
        return c.json<ToolResponseType>(
          [{ type: "text", text: "User ID is required" }],
          400,
        )
      }

      const { memories } = await supermemory.memories.list({
        containerTags: [userId],
      })

      // if memories.length is more than 2000, reject with error.
      if (memories.length > 2000) {
        return c.json<ToolResponseType>(
          [
            {
              type: "text",
              text: "Memory limit of 2000 memories exceeded",
            },
          ],
          400,
        )
      }

      await supermemory.memories.add({
        content: thingToRemember,
        containerTags: [userId],
      })

      return c.json<ToolResponseType>([
        {
          type: "text",
          text: "Memory added successfully",
        },
      ])
    },
  )

  app.post(
    "/search",
    describeTool({
      name: "searchSupermemory",
      description:
        "Search user memories and patterns. Run when explicitly asked or when context about user's past choices would be helpful. Uses semantic matching to find relevant details across related experiences. If you do not have prior knowledge about something, this is the perfect tool to call. YOU MUST USE THE TOOLS/CALL TO USE THIS. THIS IS NOT A RESOURCE. IT'S A TOOL.",
    }),
    mValidator(
      "json",
      z.object({
        informationToGet: z.string(),
      }),
    ),
    async (c) => {
      const { informationToGet } = c.req.valid("json")

      console.log("SEARCHING WITH USER ID", userId)
      const response = await supermemory.search.execute({
        q: informationToGet,
        containerTags: [userId],
      })

      return c.json<ToolResponseType>([
        {
          type: "text",
          text: `${response.results.map((r) =>
            r.chunks.map((c) => c.content).join("\n\n"),
          )}`,
        },
      ])
    },
  )

  return app
}

// Simple in-memory storage for development
const sessions = new Map<string, any>()

// Main request handler
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    try {
      // Validate environment variables
      if (!env.SUPERMEMORY_API_KEY || !env.AUTH_SECRET) {
        return new Response(
          JSON.stringify({ error: "Server misconfiguration" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        )
      }

      // Handle API routes
      const url = new URL(request.url)
      
      // Handle SSE connections
      if (url.pathname.endsWith("/sse")) {
        const sessionId = url.searchParams.get("sessionId") || `session-${Date.now()}`
        
        return streamSSE(request, async (stream) => {
          const transport = {
            connectWithStream: (s: any) => {
              sessions.set(sessionId, { stream: s })
            }
          }

          await bridge({
            mcp: muppet(createSuperMemory(sessionId, env), {
              name: "Supermemory MCP",
              version: "1.0.0",
            }),
            transport,
          })
        })
      }

      // Handle regular HTTP requests
      return requestHandler(request, {
        cloudflare: { env, ctx },
      })
    } catch (error) {
      console.error('Error in worker:', error)
      return new Response(
        JSON.stringify({ 
          error: 'Internal Server Error',
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }
  },
}
