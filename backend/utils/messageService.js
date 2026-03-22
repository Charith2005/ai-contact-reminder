import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  : null;


// fallback generator (free)
function fallbackMessage({ contactName, relationshipContext, lastConversation, company }) {

  const openers = [
    `Hi ${contactName}, I hope you're doing well.`,
    `Hey ${contactName}, I hope everything is going great.`,
    `Hello ${contactName}, I wanted to reach out and reconnect.`,
    `Hi ${contactName}, it's been a while since we last spoke.`
  ];

  const contextLines = [
    `I was recently thinking about our conversation about ${lastConversation}.`,
    `I’ve been reflecting on our previous discussion regarding ${lastConversation}.`,
    `Our last conversation about ${lastConversation} came to mind recently.`
  ];

  const relationshipLines = {
    mentor: [
      `I truly appreciate your guidance as a mentor.`,
      `Your mentorship has been very valuable to me.`,
      `I always value your perspective and advice.`
    ],
    investor: [
      `I appreciate the insights you shared previously.`,
      `Your perspective on strategy has been very helpful.`,
      `I value your input and experience.`
    ],
    friend: [
      `I always enjoy our conversations.`,
      `It would be great to catch up again.`,
      `I hope everything has been going well for you.`
    ]
  };

  const closings = [
    `I'd love to catch up when you have time.`,
    `Would you be open to reconnecting soon?`,
    `Let me know if you'd like to schedule a quick chat.`,
    `Looking forward to hearing from you.`
  ];

  function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const relationshipText =
    relationshipLines[relationshipContext]?.length
      ? random(relationshipLines[relationshipContext])
      : "It would be great to reconnect.";

  return `
${random(openers)}

${random(contextLines)}

${relationshipText}

${random(closings)}
`.trim();
}



export async function generateMessage(data) {

  // if no API key → use free fallback
  if (!openai) {
    return fallbackMessage(data);
  }

  try {

    const prompt = `
Write a short professional follow-up message.

Contact Name: ${data.contactName}
Relationship: ${data.relationshipContext}
Company: ${data.company}
Last conversation topic: ${data.lastConversation}

Guidelines:
- sound natural
- friendly but professional
- concise
- mention previous context
- encourage reconnecting
`;

    const response = await openai.chat.completions.create({

      model: "gpt-4o-mini",

      messages: [
        {
          role: "user",
          content: prompt
        }
      ],

      temperature: 0.8
    });

    return response.choices[0].message.content;

  } catch (err) {

    console.log("AI failed, using fallback");

    return fallbackMessage(data);
  }
}