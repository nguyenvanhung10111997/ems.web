# Connecting to Local Figma Desktop

This guide explains how to connect Cursor to your **local Figma Desktop** application.

## Important Note

Even though you're using Figma Desktop (local app), it still connects to Figma's cloud API. Figma Desktop syncs your files with the cloud, so you'll need a Figma API access token to connect via MCP.

## Quick Setup

### Step 1: Get Your Figma Access Token

1. **Open Figma Desktop** (or go to [figma.com](https://figma.com))
2. Click your **profile icon** (top-right) → **Settings**
3. Go to **Account** → **Personal Access Tokens**
4. Click **"Create new token"**
5. Name it (e.g., "Cursor Local Integration")
6. **Copy the token immediately** (you won't see it again!)

### Step 2: Set Environment Variable

#### Windows (PowerShell)
```powershell
# Temporary (current session)
$env:FIGMA_ACCESS_TOKEN = "your-token-here"

# Permanent - Add to User Environment Variables
[System.Environment]::SetEnvironmentVariable("FIGMA_ACCESS_TOKEN", "your-token-here", "User")
```

#### Windows (GUI Method)
1. Press `Win + R`, type `sysdm.cpl`, press Enter
2. Go to **Advanced** tab → **Environment Variables**
3. Under **User variables**, click **New**
4. Variable name: `FIGMA_ACCESS_TOKEN`
5. Variable value: `your-token-here`
6. Click **OK** on all dialogs

#### macOS/Linux
```bash
# Temporary (current session)
export FIGMA_ACCESS_TOKEN="your-token-here"

# Permanent - Add to shell config
echo 'export FIGMA_ACCESS_TOKEN="your-token-here"' >> ~/.zshrc
# or for bash: >> ~/.bashrc

# Reload shell
source ~/.zshrc  # or source ~/.bashrc
```

### Step 3: Verify Configuration

The MCP configuration is in `.cursor/mcp-config.json`:

```json
{
  "mcpServers": {
    "figma-local": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "${FIGMA_ACCESS_TOKEN}"
      }
    }
  }
}
```

### Step 4: Restart Cursor

1. **Close Cursor completely** (not just the window)
2. **Reopen Cursor**
3. The MCP connection should now be active

## Using Local Figma Files

### Method 1: Get File Key from Figma Desktop

1. Open your design in **Figma Desktop**
2. Click **Share** button (top-right)
3. Click **"Copy link"**
4. The URL will look like: `https://www.figma.com/file/ABC123xyz/MyDesign`
5. The **file key** is `ABC123xyz` (the part after `/file/`)

### Method 2: Working with Local Files

Even though files are "local" in Figma Desktop, they're synced to the cloud. You can:

1. **Open files in Figma Desktop** - They sync automatically
2. **Get the file key** from the shareable link
3. **Use the file key** with the MCP connection

## Testing the Connection

After setup, try these commands in Cursor:

```
Get design tokens from Figma file: [your-file-key]
```

Or:

```
Analyze this Figma component and convert to React: [file-key]/[node-id]
```

## Working with Offline Files

If you're working with files that are **offline** in Figma Desktop:

1. **Make sure files are synced** - Figma Desktop needs to sync with cloud for API access
2. **Check sync status** - Look for sync icon in Figma Desktop
3. **If offline** - You'll need to wait for sync or use manual workflow (see below)

## Manual Workflow (No API Needed)

If you prefer not to use the API, you can still work with local Figma designs:

1. **Take screenshots** of your Figma Desktop designs
2. **Use Figma's Inspect panel** to get design specs
3. **Share the specs** with AI assistant
4. **Request component conversion** using the format in [DESIGN_WORKFLOW.md](DESIGN_WORKFLOW.md)

Example:
```
I have a Figma design for a user card:
- Card: 400px wide, white bg, 24px padding
- Avatar: 64px circle
- Name: 24px bold
- Email: 16px gray

Convert this to a React component with TypeScript and TailwindCSS.
```

## Troubleshooting

### "MCP server not found"
```bash
# Test if package exists
npx figma-developer-mcp --help

# If not found, try alternative
npx -y @modelcontextprotocol/server-figma
```

### "Invalid API key"
- Verify token is set: `echo $FIGMA_ACCESS_TOKEN` (macOS/Linux) or `echo %FIGMA_ACCESS_TOKEN%` (Windows)
- Make sure token is copied correctly (no extra spaces)
- Regenerate token if needed

### "File not found"
- Make sure the file is synced to cloud (check sync status in Figma Desktop)
- Verify the file key is correct from the shareable link
- Ensure you have access to the file

### Connection not working
1. Restart Cursor completely
2. Check Cursor's MCP logs (Settings → MCP)
3. Verify environment variable is set in the same terminal where Cursor was launched
4. Try setting the variable globally (system environment variables)

## Alternative: Direct File Access

If you want to work with Figma files stored locally on your machine:

1. **Figma Desktop stores files** in:
   - **Windows**: `%APPDATA%\Figma\`
   - **macOS**: `~/Library/Application Support/Figma/`
   - **Linux**: `~/.config/Figma/`

2. **However**, these are binary/cache files, not directly readable
3. **Best approach**: Use the Figma API or manual workflow

## Next Steps

1. ✅ Set up your Figma access token
2. ✅ Configure MCP connection
3. ✅ Restart Cursor
4. ✅ Open a Figma file in Figma Desktop
5. ✅ Get the file key from shareable link
6. ✅ Start converting designs to code!

## Security Reminder

- **Never commit tokens** to git (already in `.gitignore`)
- **Use environment variables** (not hardcoded in files)
- **Rotate tokens** periodically
- **Revoke unused tokens** from Figma settings
