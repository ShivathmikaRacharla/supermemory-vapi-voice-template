# Supermemory MCP (Model Context Protocol)

A Cloudflare Workers-based implementation of the Model Context Protocol (MCP) for Supermemory.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare Wrangler CLI
- Cloudflare account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/supermemory-mcp.git
   cd supermemory-mcp
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Setup

1. Create a `.dev.vars` file in the project root with the following content:
   ```
   SUPREMEMORY_API_KEY=your_api_key_here
   AUTH_SECRET=your_auth_secret_here
   ```

2. For production, set these as secrets using Wrangler:
   ```bash
   npx wrangler secret put SUPREMEMORY_API_KEY
   npx wrangler secret put AUTH_SECRET
   ```

### Development

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. The application will be available at `http://localhost:8787`

### Production Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Cloudflare Workers:
   ```bash
   npx wrangler deploy
   ```

## 📦 Project Structure

```
.
├── app/                    # Frontend application
│   ├── routes/            # Application routes
│   └── root.tsx           # Root component
├── workers/               # Cloudflare Workers code
│   └── app.ts             # Main worker entry point
├── public/                # Static assets
├── wrangler.toml          # Wrangler configuration
└── package.json           # Project dependencies
```

## 🔧 Configuration

Edit `wrangler.toml` to configure:
- Environment-specific settings
- Routes
- Build commands
- Durable Objects

## 📝 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SUPERMEMORY_API_KEY` | Yes | API key for Supermemory service |
| `AUTH_SECRET` | Yes | Secret key for authentication |
| `NODE_ENV` | No | Environment (development/production) |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Supermemory](https://supermemory.ai/)
- [Hono](https://hono.dev/)

[![Universal Memory MCP - Your memories, in every LLM you use. | Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=954861&theme=neutral&period=daily&t=1749339045428)](https://www.producthunt.com/products/supermemory?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_source=badge-universal-memory-mcp)

Read a detailed blog about it - https://supermemory.ai/blog/the-ux-and-technicalities-of-awesome-mcps 

**Your memories are in ChatGPT... But nowhere else. Universal Memory MCP makes your memories available to every single LLM. No logins or paywall. One command to set it up.**

Which means you can carry your memories to any MCP client. and it just works!

## Demo (Click on the image for video!)

[![Demo Video](./public/og-image.png)](https://youtu.be/ST6BR3vT5Xw)

## Getting Started

To get started, just visit https://mcp.supermemory.ai, and follow the instructions on the page.

## Features

- 🚀 Built on top of the [Supermemory API](https://supermemory.ai), extremely fast and scalable.
- ✅ No login required
- 😱 Completely free to use
- Extremely simple setup.

## Self-hosting

To self host, get an API key at https://console.supermemory.ai, and then simply add it in the `.env` file with `SUPERMEMORY_API_KEY=`
