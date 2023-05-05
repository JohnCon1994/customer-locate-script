const fs = require('fs');

const addressRegex = /(\d+\s+[\w\s]+)(.*)?(, )?(\w{2})\s+(\d{5})(-\d{4})?/

const data = fs.readFileSync('script/addresses.txt', 'utf8');

const lines = data.split('\n');

const sanitizedData = [];


for (const line of lines) {
  
  const match = addressRegex.exec(line);
  if (match) {
    const address = match[1];
    const apartment = match[2] ? match[2].trim() : '';
    const city = match[3] ? match[3].replace(', ', '') : '';
    const state = match[4];
    const zip = match[5] + (match[6] ? match[6] : '');

    const sanitizedAddress = `${address.trim()}${apartment ? ' ' + apartment.trim() : ''}, ${city.trim()}, ${state.trim()} ${zip.trim().substring(0, 5)}`;
    sanitizedData.push(sanitizedAddress);
  }
}

fs.writeFileSync('sanitized_addresses.txt', sanitizedData.join('\n'));