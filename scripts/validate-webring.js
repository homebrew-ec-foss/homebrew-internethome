#!/usr/bin/env node

const fs = require('fs');
const https = require('https');
const http = require('http');

const SITES_JSON = './src/data/sites.json';

let failed = 0;
let passed = 0;
let unreachable = 0;
let total = 0;
const failedSites = [];
const unreachableSites = [];

function fetchUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.get(url, { timeout: 10000 }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', () => {
      resolve('');
    });

    req.on('timeout', () => {
      req.destroy();
      resolve('');
    });
  });
}

function normalizeHtml(html) {
  return html
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ');
}

function hasWebringLinks(html, siteUrl) {
  const normalized = normalizeHtml(html);

  // Match exact pattern: href="https://homebrew.hsp-ec.xyz/ring/prev?site=https://..."
  const prevRegex = /href="https:\/\/homebrew\.hsp-ec\.xyz\/ring\/prev\?site=https:\/\/[^"]+"/i;
  const nextRegex = /href="https:\/\/homebrew\.hsp-ec\.xyz\/ring\/next\?site=https:\/\/[^"]+"/i;
  const randomRegex = /href="https:\/\/homebrew\.hsp-ec\.xyz\/ring\/random\?site=https:\/\/[^"]+"/i;

  const hasPrev = prevRegex.test(normalized);
  const hasNext = nextRegex.test(normalized);
  const hasRandom = randomRegex.test(normalized);

  return { hasPrev, hasNext, hasRandom };
}

async function validateWebring() {
  const sitesData = JSON.parse(fs.readFileSync(SITES_JSON, 'utf8'));
  const sites = sitesData.ring[0].sites;

  total = sites.length;

  for (const site of sites) {
    const siteUrl = site.url;
    const response = await fetchUrl(siteUrl);

    if (!response) {
      console.log(`⚠️  ${siteUrl} - Could not fetch (site may be down)`);
      console.log('');
      unreachable++;
      unreachableSites.push(siteUrl);
      continue;
    }

    const { hasPrev, hasNext, hasRandom } = hasWebringLinks(response, siteUrl);

    if (hasPrev && hasNext) {
      if (hasRandom) {
        console.log(`[OK] ${siteUrl} - Webring links valid (prev + next + random)`);
      } else {
        console.log(`[OK] ${siteUrl} - Webring links valid (prev + next)`);
      }
      passed++;
    } else {
      console.log(`[ERR] ${siteUrl} - Webring links NOT found or invalid`);
      console.log('   [NEED] prev and next links');
      failed++;
      failedSites.push(siteUrl);
    }
  }

  console.log('');
  console.log('========================================');
  console.log(`Total sites: ${total}`);
  console.log(`Valid: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Unreachable: ${unreachable}`);
  console.log('=========================================');
  console.log('');

  if (unreachable > 0) {
    console.log('[WARN] Unreachable sites (may be temporary):');
    unreachableSites.forEach(site => console.log(`   - ${site}`));
    console.log('');
  }

  if (failed > 0) {
    console.log('[ERR] Sites missing webring implementation:');
    failedSites.forEach(site => console.log(`   - ${site}`));
    console.log('');
    console.log('[NEED] Required HTML snippet for each site footer:');
    console.log('');
    console.log('<div class="webring-section">');
    console.log('  <div class="webring-header">');
    console.log('    <h3><a href="https://homebrew.hsp-ec.xyz/webring">Homebrew Webring</a></h3>');
    console.log('  </div>');
    console.log('  <div class="webring-nav">');
    console.log('    <a href="https://homebrew.hsp-ec.xyz/ring/prev?site=YOUR_SITE_URL">← Previous</a>');
    console.log('    <a href="https://homebrew.hsp-ec.xyz/ring/random?site=YOUR_SITE_URL">🔀 Random</a>');
    console.log('    <a href="https://homebrew.hsp-ec.xyz/ring/next?site=YOUR_SITE_URL">Next →</a>');
    console.log('  </div>');
    console.log('</div>');
    console.log('');
    process.exit(1);
  }

  process.exit(0);
}

validateWebring().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
