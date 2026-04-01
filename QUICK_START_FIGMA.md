# Quick Start: Connect Local Figma Desktop to Cursor

## 3-Step Setup

### 1. Get Figma Token (2 minutes)
1. Open **Figma Desktop** → Click profile icon → **Settings**
2. **Account** → **Personal Access Tokens** → **Create new token**
3. Copy the token

### 2. Set Environment Variable (1 minute)

**Windows:**
```powershell
# In PowerShell (as Administrator)
[System.Environment]::SetEnvironmentVariable("FIGMA_ACCESS_TOKEN", "your-token-here", "User")
```

**macOS/Linux:**
```bash
echo 'export FIGMA_ACCESS_TOKEN="your-token-here"' >> ~/.zshrc
source ~/.zshrc
```

### 3. Restart Cursor
- Close Cursor completely
- Reopen Cursor
- Done! ✅

## Using It

1. **Open your design in Figma Desktop**
2. **Get file key**: Click Share → Copy link → Extract the file key from URL
   - URL: `https://www.figma.com/file/ABC123xyz/MyDesign`
   - File key: `ABC123xyz`
3. **In Cursor, ask:**
   ```
   Convert this Figma design to React component: ABC123xyz
   ```

## Configuration

The MCP config is already set up in `.cursor/mcp-config.json`:
- Uses `figma-developer-mcp` package
- Connects to your local Figma Desktop via Figma API
- Automatically formats components with TypeScript + TailwindCSS

## Need Help?

- See [FIGMA_LOCAL_SETUP.md](FIGMA_LOCAL_SETUP.md) for detailed instructions
- See [DESIGN_WORKFLOW.md](DESIGN_WORKFLOW.md) for manual workflow
