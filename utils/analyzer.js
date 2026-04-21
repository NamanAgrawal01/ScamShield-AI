export async function analyzeMessageLocally(message) {
  const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
  const GOOGLE_SAFE_BROWSING_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_SAFE_BROWSING_API_KEY;

  if (!GROQ_API_KEY) {
    throw new Error('Groq API Key is missing. Please add NEXT_PUBLIC_GROQ_API_KEY to your environment.');
  }

  // 1. Detect URL inside the message
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const foundUrls = message.match(urlRegex);
  let urlResult = null;

  // 2. Call Google Safe Browsing if URL found
  if (foundUrls && foundUrls.length > 0 && GOOGLE_SAFE_BROWSING_API_KEY) {
    try {
      const sbResponse = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_SAFE_BROWSING_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: { clientId: "scamshield-ai", clientVersion: "1.0.0" },
          threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: foundUrls.map(url => ({ url }))
          }
        })
      });

      const sbData = await sbResponse.json();
      urlResult = (sbData.matches && sbData.matches.length > 0) ? 'MALICIOUS' : 'SAFE';
    } catch (err) {
      console.error('Safe Browsing Error:', err);
    }
  }

  // 3. Call Groq for text analysis
  const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are a world-class scam and fraud detection expert. 
Respond ONLY in this exact JSON format:
{
  "verdict": "SCAM" | "SUSPICIOUS" | "SAFE",
  "confidence": number,
  "redFlags": ["flag1", "flag2"],
  "explanation": "2-3 sentence explanation",
  "scamType": "category"
}`
        },
        {
          role: "user",
          content: message
        }
      ],
      response_format: { type: "json_object" }
    })
  });

  const groqData = await groqResponse.json();
  if (groqData.error) {
    throw new Error(groqData.error.message || 'Groq API error');
  }

  const analysis = JSON.parse(groqData.choices[0].message.content);

  return {
    ...analysis,
    urlResult
  };
}
