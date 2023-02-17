// Add import of CheerioCrawler
import { RequestQueue, CheerioCrawler } from 'crawlee';
import { assert, expect, test, vi } from 'vitest';

// Edit an assertion and save to see HMR in action

test('crawlee', async () => {
  vi.mock('node_modules/ow/dist/index.js', () => ({
    default: () => ({
      get: vi.fn(),
      post: vi.fn(),
    }),
  }));

  async function start() {
    const requestQueue = await RequestQueue.open();
    await requestQueue.addRequest({ url: 'https://crawlee.dev' });

    // Create the crawler and add the queue with our URL
    // and a request handler to process the page.
    const crawler = new CheerioCrawler({
      requestQueue,
      // The `$` argument is the Cheerio object
      // which contains parsed HTML of the website.
      async requestHandler({ $, request }) {
        // Extract <title> text with Cheerio.
        // See Cheerio documentation for API docs.
        const title = $('title').text();
        console.log(`The title of "${request.url}" is: ${title}.`);
      },
    });

    // Start the crawler and wait for it to finish
    await crawler.run();
  }

  await start();
});
