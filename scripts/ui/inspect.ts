import { chromium } from 'playwright';
import fs from 'node:fs';

async function main() {
  const browser = await chromium.launch();

  const page = await browser.newPage();

  // Optional second argument selects the page to inspect, defaulting to the home route.
  const path = process.argv[3] ?? '/';

  await page.goto(new URL(path, 'http://localhost:3000').toString());

  const result = await page.locator(process.argv[2]).evaluate((element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
  
    return {
      position: {
        x: rect.x,
        y: rect.y,
      },
  
      text: element.textContent?.trim() ?? '',
  
      width: rect.width,
      height: rect.height,
  
      padding: {
        top: style.paddingTop,
        right: style.paddingRight,
        bottom: style.paddingBottom,
        left: style.paddingLeft,
      },
  
      margin: {
        top: style.marginTop,
        right: style.marginRight,
        bottom: style.marginBottom,
        left: style.marginLeft,
      },
  
      font: {
        family: style.fontFamily,
        size: style.fontSize,
        weight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
      },
  
      color: style.color,
      backgroundColor: style.backgroundColor,
      borderRadius: style.borderRadius,
    };
  });
  
  console.log(result);
  fs.writeFileSync(
    'artifacts/actual/inspect.json',
    JSON.stringify(result, null, 2),
  );

  await browser.close();
}

main();