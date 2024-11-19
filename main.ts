function handleRequest(request: any) {
  const url = new URL(request.url);
  console.log(`Received request: ${url.pathname}${url.search}`);

  // Check if there's a code parameter
  const authCode = url.searchParams.get("code");

  if (authCode) {
    console.log(`Received Authorization Code: ${authCode}`);

    // Return the code in the response
    return new Response(
      JSON.stringify({
        status: "success",
        code: authCode,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          // Allow CORS for flexibility
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  // Check for error parameter
  const error = url.searchParams.get("error");
  if (error) {
    console.error(`Received Error: ${error}`);
    return new Response(
      JSON.stringify({
        status: "error",
        message: error,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  // If no code or error, return a generic response
  return new Response(
    JSON.stringify({
      status: "no_code",
      message: "No authorization code found",
    }),
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}

// Configure the server
const PORT = 8000;
console.log(`Starting server on http://localhost:${PORT}`);

// Serve forever
Deno.serve({ port: PORT }, handleRequest);
