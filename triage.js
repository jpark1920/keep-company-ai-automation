/**
 * AI Documentation Triage Tool
 * * This script analyzes Pull Request titles using Claude 3.5 Sonnet 
 * to determine if internal documentation updates are required.
 */

async function analyzeChanges() {
  const prTitle = process.env.PR_TITLE || "No title provided";
  const apiKey = process.env.ANTHROPIC_API_KEY;

  console.log(`[System] Analyzing Pull Request: "${prTitle}"`);

  // --- SIMULATION MODE ---
  // If no API key is provided, the script runs a mock analysis to demonstrate the pipeline logic.
  if (!apiKey || apiKey === "" || apiKey.includes("your-key-here")) {
    console.warn("--- Running in Simulation Mode (No API Key detected) ---");
    
    if (prTitle.toLowerCase().includes("fix") || prTitle.toLowerCase().includes("bug")) {
      console.log("Analysis: This appears to be a bug fix. Documentation updates might not be necessary, but verify if runbooks need updates.");
    } else if (prTitle.toLowerCase().includes("feat") || prTitle.toLowerCase().includes("api")) {
      console.log("Analysis: New feature or API change detected. Documentation update is HIGHLY RECOMMENDED.");
    } else {
      console.log("Analysis: Standard code change. Follow regular peer review guidelines.");
    }
    
    console.log("-------------------------------------------------------");
    return;
  }

  // --- LIVE CLAUDE INTEGRATION ---
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 300,
        messages: [{ 
          role: "user", 
          content: `You are a DevOps Assistant. Based on this Pull Request title: "${prTitle}", should the engineering team update the internal documentation? Answer in 2 clear sentences.` 
        }]
      })
    });

    const data = await response.json();

    if (data.content && data.content.length > 0) {
      console.log("--- CLAUDE'S ANALYSIS ---");
      console.log(data.content[0].text);
      console.log("-------------------------");
    } else {
      console.error("Error: Received an empty response from Claude. Check API quotas or status.");
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("Network Error: Failed to reach Anthropic API.", error);
  }
}

// Execute the triage
analyzeChanges();
