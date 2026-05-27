import fs from 'fs';
import path from 'path';

// Read .env.local for API key
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

if (!apiKey) {
  console.error('Error: API key not found in .env.local');
  process.exit(1);
}

const groups = [
  {
    id: "echoes",
    data: {
      groupName: { stringValue: "Echoes" },
      tagline: { stringValue: "Stories we never said out loud." },
      activity: { stringValue: "Spoken Word Poetry" },
      description: { stringValue: "A safe space for unleashing the unspoken. We explore themes of identity, belonging, and emotional truth through spoken word and poetry." },
      script: { stringValue: "" },
      heroImage: { stringValue: "/IMG_fol/img_1.png" },
      secretKey: { stringValue: "echoes2026" },
      gallery: { arrayValue: { values: [] } },
      members: { arrayValue: { values: [] } },
      updatedAt: { timestampValue: new Date().toISOString() }
    }
  },
  {
    id: "canvas",
    data: {
      groupName: { stringValue: "The Canvas Project" },
      tagline: { stringValue: "Painting feelings we can't explain." },
      activity: { stringValue: "Collaborative Art" },
      description: { stringValue: "When words fail, colors speak. A collaborative art project where everyone adds their own stroke to a shared masterpiece." },
      script: { stringValue: "" },
      heroImage: { stringValue: "/IMG_fol/img_6.png" },
      secretKey: { stringValue: "canvas2026" },
      gallery: { arrayValue: { values: [] } },
      members: { arrayValue: { values: [] } },
      updatedAt: { timestampValue: new Date().toISOString() }
    }
  },
  {
    id: "rhythm",
    data: {
      groupName: { stringValue: "Rhythm & Soul" },
      tagline: { stringValue: "Move how you feel." },
      activity: { stringValue: "Movement Therapy" },
      description: { stringValue: "Reclaiming our bodies and finding freedom through dance, movement, and somatic expression." },
      script: { stringValue: "" },
      heroImage: { stringValue: "/IMG_fol/img_5.png" },
      secretKey: { stringValue: "rhythm2026" },
      gallery: { arrayValue: { values: [] } },
      members: { arrayValue: { values: [] } },
      updatedAt: { timestampValue: new Date().toISOString() }
    }
  },
  {
    id: "harmonies",
    data: {
      groupName: { stringValue: "Harmonies" },
      tagline: { stringValue: "Music heals softly." },
      activity: { stringValue: "Acoustic Jam" },
      description: { stringValue: "Bring your voice, an instrument, or just a listening ear. A collective jam session exploring the healing power of shared melodies." },
      script: { stringValue: "" },
      heroImage: { stringValue: "/IMG_fol/img_3.png" },
      secretKey: { stringValue: "harmonies2026" },
      gallery: { arrayValue: { values: [] } },
      members: { arrayValue: { values: [] } },
      updatedAt: { timestampValue: new Date().toISOString() }
    }
  },
  {
    id: "unfiltered",
    data: {
      groupName: { stringValue: "Unfiltered Thoughts" },
      tagline: { stringValue: "Raw. Honest. Ours." },
      activity: { stringValue: "Open Mic & Storytelling" },
      description: { stringValue: "A judgment-free zone to share personal stories, struggles, and triumphs in a circle of unwavering support." },
      script: { stringValue: "" },
      heroImage: { stringValue: "/IMG_fol/img_2.png" },
      secretKey: { stringValue: "unfiltered2026" },
      gallery: { arrayValue: { values: [] } },
      members: { arrayValue: { values: [] } },
      updatedAt: { timestampValue: new Date().toISOString() }
    }
  },
  {
    id: "collective",
    data: {
      groupName: { stringValue: "The Collective" },
      tagline: { stringValue: "Building things together." },
      activity: { stringValue: "Creative Brainstorming" },
      description: { stringValue: "Late night ideas, wild dreams, and collaborative planning. This is where the future of our community is shaped." },
      script: { stringValue: "" },
      heroImage: { stringValue: "/IMG_fol/img_4.png" },
      secretKey: { stringValue: "collective2026" },
      gallery: { arrayValue: { values: [] } },
      members: { arrayValue: { values: [] } },
      updatedAt: { timestampValue: new Date().toISOString() }
    }
  }
];

async function seed() {
  console.log(`Starting seeding for project: ${projectId}`);
  
  for (const group of groups) {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/groups/${group.id}?key=${apiKey}`;
    
    try {
      const response = await fetch(url, {
        method: 'PATCH', // PATCH with document ID in URL acts as upsert in REST API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `projects/${projectId}/databases/(default)/documents/groups/${group.id}`,
          fields: group.data
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        console.error(`Failed to seed ${group.id}:`, result);
      } else {
        console.log(`Successfully seeded ${group.id}`);
      }
    } catch (err) {
      console.error(`Error requesting ${group.id}:`, err);
    }
  }
  
  console.log("Seeding complete.");
}

seed();
