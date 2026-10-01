import { createClient } from '@sanity/client';
const client = createClient({
  projectId: 'bdqq6fie',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01'
});
// Fetch ALL documents updated in the last 24 hours
const query = `*[dateTime(_updatedAt) > dateTime(now()) - 60*60*24]{_id, _type, _updatedAt, title}`;
client.fetch(query)
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
