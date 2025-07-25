const http = require("http");
const PORT = 3000;
const DEFAULT_HEADER = { "Content-Type": "application/json" };

const HeroFactory = require("./factories/heroFactory");
const heroService = HeroFactory.generateInstance();
const Hero = require("./entities/hero");

// Handles the routes for the hero service
// This is a simple router that maps URL paths to functions
const routes = {
  // Routes for retrieving all heroes
  "/heroes:get": async (request, response) => {
    const { id } = request.queryString;
    const heroes = await heroService.find(id);
    response.write(JSON.stringify({ results: heroes }));

    return response.end();
  },

  // Routes for creating a new hero
  "/heroes:post": async (request, response) => {
    // async iterator
    for await (const data of request) {
      try {
        const item = JSON.parse(data);
        const hero = new Hero(item);
        const { error, valid } = hero.isValid();
        if (!valid) {
          response.writeHead(400, DEFAULT_HEADER);
          response.write(JSON.stringify({ error: error.join(", ") }));
          return response.end();
        }

        const id = await heroService.create(hero);
        response.writeHead(201, DEFAULT_HEADER);
        response.write(
          JSON.stringify({ success: "User Created Successfully", id })
        );

        // Only used return here because only one body object is sent per request
        return response.end();
      } catch (error) {
        return handleError(response)(error);
      }
    }
  },

  // Default route for handling requests that do not match any defined routes
  // This will respond with a simple "Hello" message
  default: async (request, response) => {
    response.write("Hello");
    return response.end();
  },
};

// Handles errors by logging them and sending a 500 Internal Server Error response
// This function is used to handle errors in the routes
const handleError = (response) => {
  return (error) => {
    console.error("Deu ruim", error);
    response.writeHead(500, DEFAULT_HEADER);
    response.write(JSON.stringify({ error: "Internal Server Error" }));
    return response.end();
  };
};

// Main handler function that processes incoming requests
// It extracts the URL and method from the request, determines the route to handle the request,
// and calls the appropriate function from the routes object
const handler = (request, response) => {
  const { url, method } = request;
  const [first, route, id] = url.split("/");
  request.queryString = { id: isNaN(id) ? id : Number(id) };

  // If the first part of the URL is not empty or if there is no route, return a 404 Not Found response
  // This is a simple check to ensure that the URL is valid and matches one of the defined routes
  if (first !== "" || !route) {
    response.writeHead(404, DEFAULT_HEADER);
    response.write(JSON.stringify({ error: "Not Found" }));
    return response.end();
  }

  const key = `/${route}:${method.toLowerCase()}`;

  const chosen = routes[key] || routes.default;
  return chosen(request, response).catch(handleError(response));
};

http
  .createServer(handler)
  .listen(PORT, () => console.log(`Server running on port ${PORT}`));
