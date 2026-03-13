import AdmZip from 'adm-zip';

// Download zip from URL
const url = 'https://v0chat-agent-data-prod.s3.us-east-1.amazonaws.com/vm-binary/diCLIa58XHe/0ddb81fb101b2d9af15aa8453c5dafa0ffc9d838e5d58e737f2fffa369c191dd.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA52KF4VHQDTZ5RDMT%2F20260313%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260313T170921Z&X-Amz-Expires=3600&X-Amz-Signature=435264e27a32d67410d953012cc57385b372c33553d7f50b5e51ce73b100f881&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject';

const response = await fetch(url);
const arrayBuffer = await response.arrayBuffer();
const zipBuffer = Buffer.from(arrayBuffer);

// Extract the zip file using adm-zip with buffer
const zip = new AdmZip(zipBuffer);

// First list all entries
const entries = zip.getEntries();
console.log('All entries in zip:');
entries.forEach(entry => {
  console.log(`  ${entry.entryName}`);
});

// Read all text files
console.log('\n\n========== FILE CONTENTS ==========\n');
entries.forEach(entry => {
  if (!entry.isDirectory && (entry.entryName.endsWith('.tsx') || entry.entryName.endsWith('.ts') || entry.entryName.endsWith('.css') || entry.entryName.endsWith('.json') || entry.entryName.endsWith('.md'))) {
    console.log(`\n========== ${entry.entryName} ==========\n`);
    console.log(entry.getData().toString('utf8'));
  }
});
