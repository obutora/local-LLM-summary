# Local LLM Summarizer Chrome Extension

## How to use
### Server
```shell
go run server/cmd/main.go
ollama serve
```

### Build/Develop Extention
```shell
npm run dev
```
Select the `dist` folder in the `chrome://extensions/` page.

### In your browser
- Select Text for summarization
- Right click and select `Summarize with Local LLM`
- wait for the summarization to complete(10～15sec)
- The summarization will be replaced with the selected text
