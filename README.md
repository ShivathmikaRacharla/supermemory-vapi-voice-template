# supermemory-vapi-voice-template
A minimal and public template for integrating Super Memory MCP with VAPI Voice Agent to store and retrieve conversational memory via voice.


# Super Memory MCP + VAPI Voice Agent Integration

This repo shows how to use Super Memory MCP as a memory tool in a VAPI Voice Agent.

### 🔧 Setup

1. Create an account at [Super Memory Console](https://console.supermemory.ai)
2. Copy your `API Key` and `Agent ID`
3. Create a `.env` file based on `.env.example`
4. Add a new Tool in your VAPI Agent with this configuration:
   - URL: `https://mcp.supermemory.ai/your-path`
   - Header: `x-api-key: YOUR_SUPERMEMORY_API_KEY`

### 🗣️ Sample Conversation Flow

- **User**: My favorite movie is Interstellar  
- **Agent**: Got it, I’ll remember that.  
- **User**: What’s my favorite movie?  
- **Agent**: You told me it’s Interstellar.

---

This confirms the memory tool is working.
