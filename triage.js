async function analyzeChanges() {
  const prTitle = process.env.PR_TITLE;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  console.log(`Analyzing PR: ${prTitle}`);

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
        content: `You are a DevOps Assistant. Based on this PR title: "${prTitle}", should the engineering team update the internal documentation? Answer in 2 sentences.` 
      }]
    })
  });

  const data = await response.json();
  if (data.content) {
    console.log("--- CLAUDE'S ANALYSIS ---");
    console.log(data.content[0].text);
  } else {
    console.error("Error from Claude:", data);
  }
}

analyzeChanges();
