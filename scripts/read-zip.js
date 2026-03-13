import AdmZip from 'adm-zip';

// Download zip from URL
const url = 'https://v0chat-agent-data-prod.s3.us-east-1.amazonaws.com/vm-binary/diCLIa58XHe/c3324dac7ed91b973487b248b6c906cbb8c4a7bb95d4e9cfc811fc88e6fea1db.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA52KF4VHQDTZ5RDMT%2F20260313%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260313T170722Z&X-Amz-Expires=3600&X-Amz-Signature=a2c782d0325eb368211f4a15f012a9519f064996b53ab7283d6f405d46635750&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject';

const response = await fetch(url);
const arrayBuffer = await response.arrayBuffer();
const zipBuffer = Buffer.from(arrayBuffer);

// Extract the zip file using adm-zip with buffer
const zip = new AdmZip(zipBuffer);

// List and print the contents of specific files
const filesToRead = [
  'landing-pages/README.md',
  'landing-pages/app/page.tsx',
  'landing-pages/app/v2/page.tsx',
  'landing-pages/app/v3/page.tsx',
  'landing-pages/app/layout.tsx',
  'landing-pages/app/globals.css',
  'landing-pages/components/nav.tsx',
  'landing-pages/package.json',
  'landing-pages/tailwind.config.ts'
];

for (const filePath of filesToRead) {
  const entry = zip.getEntry(filePath);
  if (entry) {
    console.log(`\n========== ${filePath} ==========\n`);
    console.log(entry.getData().toString('utf8'));
  }
}
