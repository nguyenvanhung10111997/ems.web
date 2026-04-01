# Figma MCP Integration Setup

This guide explains how to set up the Model Context Protocol (MCP) connection to Figma Desktop.

## What is MCP?

Model Context Protocol (MCP) is a protocol that allows AI assistants to connect to external tools and services, enabling them to access real-time data and perform actions.

## Setup Instructions

### Step 1: Get Figma Access Token

1. Open Figma Desktop or go to [Figma Web](https://www.figma.com)
2. Go to **Settings** → **Account** → **Personal Access Tokens**
3. Click **Create new token**
4. Give it a name (e.g., "MCP Integration")
5. Copy the token (you'll only see it once!)

### Step 2: Set Environment Variable

#### Windows (PowerShell)
```powershell
$env:FIGMA_ACCESS_TOKEN = "your-figma-token-here"
```

#### Windows (Command Prompt)
```cmd
set FIGMA_ACCESS_TOKEN=your-figma-token-here
```

#### macOS/Linux
```bash
export FIGMA_ACCESS_TOKEN="your-figma-token-here"
```

#### Permanent Setup (Windows)
1. Open System Properties → Environment Variables
2. Add new User Variable:
   - Name: `FIGMA_ACCESS_TOKEN`
   - Value: `your-figma-token-here`

#### Permanent Setup (macOS/Linux)
Add to `~/.bashrc` or `~/.zshrc`:
```bash
export FIGMA_ACCESS_TOKEN="your-figma-token-here"
```

### Step 3: Configure MCP in Cursor

The MCP configuration is in `.cursor/mcp-config.json`. This file tells Cursor how to connect to Figma.

**Current Configuration:**
```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-figma"
      ],
      "env": {
        "FIGMA_ACCESS_TOKEN": "${FIGMA_ACCESS_TOKEN}"
      }
    }
  }
}
```

### Step 4: Restart Cursor

After setting up the environment variable and configuration:
1. Close Cursor completely
2. Reopen Cursor
3. The MCP connection should be active

## Alternative: Using Figma API Directly

If the MCP server doesn't work, you can use the Figma API directly:

### Install Figma API Package

```bash
npm install --save-dev @figma/rest-api-sdk
```

### Create Figma API Utility

Create `src/utils/figmaApi.ts`:

```typescript
import { FigmaApi } from '@figma/rest-api-sdk'

const figma = new FigmaApi({
  personalAccessToken: process.env.FIGMA_ACCESS_TOKEN || '',
})

export async function getFigmaFile(fileKey: string) {
  return await figma.getFile(fileKey)
}

export async function getFigmaFileNodes(fileKey: string, nodeIds: string[]) {
  return await figma.getFileNodes(fileKey, { ids: nodeIds })
}
```

## Using Figma MCP Connection

Once set up, you can ask the AI assistant:

```
Get the design tokens from this Figma file: [file-key]
```

Or:

```
Analyze this Figma component and convert it to React code: [file-key]/[node-id]
```

## Troubleshooting

### MCP Server Not Found
If you get an error about the MCP server not being found:
1. Make sure Node.js is installed
2. Try running manually: `npx @modelcontextprotocol/server-figma`
3. Check if the package exists or use an alternative

### Access Token Issues
- Verify the token is set: `echo $FIGMA_ACCESS_TOKEN` (macOS/Linux) or `echo %FIGMA_ACCESS_TOKEN%` (Windows)
- Make sure the token has the correct permissions
- Regenerate the token if needed

### Connection Issues
- Restart Cursor after setting environment variables
- Check Cursor's MCP logs for errors
- Verify the MCP configuration file is in the correct location

## Manual Figma Integration (Without MCP)

If MCP doesn't work, you can still use Figma by:

1. **Sharing Figma File**: Get a shareable link from Figma
2. **Using Inspect Panel**: Extract design specs manually
3. **Screenshots**: Share screenshots with design specs
4. **Figma API**: Use the Figma REST API directly

See [DESIGN_WORKFLOW.md](DESIGN_WORKFLOW.md) for manual workflow instructions.

## Security Notes

- **Never commit your Figma access token** to version control
- Add `FIGMA_ACCESS_TOKEN` to `.gitignore` if storing in a file
- Use environment variables for tokens
- Rotate tokens periodically

## Next Steps

1. Set up your Figma access token
2. Configure the MCP connection
3. Restart Cursor
4. Start using Figma designs in your development workflow!
