{\rtf1\ansi\ansicpg1252\cocoartf2818
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 export function request(ctx) \{\
    const \{ ingredients = [] \} = ctx.args;\
  \
    // Construct the prompt with the provided ingredients\
    const prompt = `Suggest a recipe idea using these ingredients: $\{ingredients.join(", ")\}.`;\
  \
    // Return the request configuration\
    return \{\
      resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,\
      method: "POST",\
      params: \{\
        headers: \{\
          "Content-Type": "application/json",\
        \},\
        body: JSON.stringify(\{\
          anthropic_version: "bedrock-2023-05-31",\
          max_tokens: 1000,\
          messages: [\
            \{\
              role: "user",\
              content: [\
                \{\
                  type: "text",\
                  text: `\\n\\nHuman: $\{prompt\}\\n\\nAssistant:`,\
                \},\
              ],\
            \},\
          ],\
        \}),\
      \},\
    \};\
  \}\
  \
  export function response(ctx) \{\
    // Parse the response body\
    const parsedBody = JSON.parse(ctx.result.body);\
    // Extract the text content from the response\
    const res = \{\
      body: parsedBody.content[0].text,\
    \};\
    // Return the response\
    return res;\
  \}}