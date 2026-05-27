import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env.local');
let apiKey = '';
let projectId = 'tgh-73dc8';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const apiKeyMatch = envContent.match(/NEXT_PUBLIC_FIREBASE_API_KEY=(.*)/);
  if (apiKeyMatch) apiKey = apiKeyMatch[1];
  
  const projectMatch = envContent.match(/NEXT_PUBLIC_FIREBASE_PROJECT_ID=(.*)/);
  if (projectMatch) projectId = projectMatch[1];
}

const oldGroups = ["echoes", "canvas", "rhythm", "harmonies", "unfiltered", "collective"];

const newGroups = Array.from({ length: 6 }).map((_, i) => ({
  id: `group-${i + 1}`,
  data: {
    groupName: { stringValue: `Group ${i + 1}` },
    tagline: { stringValue: "" },
    activity: { stringValue: "" },
    description: { stringValue: "" },
    script: { stringValue: "" },
    heroImage: { stringValue: "" },
    secretKey: { stringValue: `secret-${i + 1}` }, // e.g. secret-1
    gallery: { arrayValue: { values: [] } },
    members: { arrayValue: { values: [] } },
    updatedAt: { timestampValue: new Date().toISOString() }
  }
}));

async function reseed() {
  console.log(`Starting reseeding for project: ${projectId}`);
  
  // 1. Delete old groups
  for (const oldId of oldGroups) {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/groups/${oldId}?key=${apiKey}`;
    try {
      await fetch(url, { method: 'DELETE' });
      console.log(`Deleted old group: ${oldId}`);
    } catch (err) {
      console.error(`Failed to delete ${oldId}:`, err);
    }
  }

  // 2. Create new blank groups
  for (const group of newGroups) {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/groups/${group.id}?key=${apiKey}`;
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `projects/${projectId}/databases/(default)/documents/groups/${group.id}`,
          fields: group.data
        })
      });
      if (response.ok) {
        console.log(`Created new blank group: ${group.id} (Secret Key: ${group.data.secretKey.stringValue})`);
      } else {
        console.error(`Failed to create ${group.id}`);
      }
    } catch (err) {
      console.error(`Error requesting ${group.id}:`, err);
    }
  }
  
  console.log("Reseeding complete.");
}

reseed();
