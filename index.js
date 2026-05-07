export default {
  async fetch(request, env) {

    // добавляем запись
    if (request.method === "POST") {
      await env.DB.prepare(
        "INSERT INTO messages (text) VALUES (?)"
      ).bind("hello from worker").run();

      return new Response("Inserted!");
    }

    // читаем базу
    const { results } = await env.DB.prepare(
      "SELECT * FROM messages ORDER BY id DESC"
    ).all();

    return new Response(
      JSON.stringify(results, null, 2),
      {
        headers: {
          "content-type": "application/json"
        }
      }
    );
  }
}
