import { test, expect } from '@playwright/test';

const menuItems = [
  { label: 'Home', id: '1:4', iconId: '1:5', labelId: '1:11', icon: '/figma/home.svg' },
  { label: 'Search', id: '1:12', iconId: '107:1016', labelId: '1:19', icon: '/figma/search.svg' },
  { label: 'Analytics', id: '1:20', iconId: '107:951', labelId: '1:27', icon: '/figma/pie-chart.svg', active: true },
  { label: 'History', id: '1:28', iconId: '107:1013', labelId: '1:35', icon: '/figma/clock.svg' },
  { label: 'Profile', id: '1:36', iconId: '107:1010', labelId: '1:43', icon: '/figma/user.svg' },
];

test('renders the Figma bottom navigation with Analytics selected', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const navigation = page.getByRole('navigation', { name: 'Bottom navigation' });

  await expect(navigation).toBeVisible();
  await expect(navigation).toHaveAttribute('data-node-id', '1:2');
  await expect(navigation.locator('[data-node-id="1:3"]')).toBeVisible();

  for (const item of menuItems) {
    const link = navigation.getByRole('link', { name: item.label });
    const icon = link.locator('svg');
    const label = link.locator('span');

    await expect(link).toHaveAttribute('data-node-id', item.id);
    await expect(icon).toHaveAttribute('data-node-id', item.iconId);
    await expect(label).toHaveAttribute('data-node-id', item.labelId);

    // Figma: icons are 24x24 and use the exported SVG assets.
    await expect(icon.locator('image')).toHaveAttribute('href', item.icon);
    const iconBox = await icon.boundingBox();
    expect(iconBox).toMatchObject({ width: 24, height: 24 });

    // Figma: labels are Poppins 12px/16px, Regular (400) or Medium (500) when active,
    // #484C52 by default and #539DF3 when active.
    await expect(label).toHaveCSS('font-family', 'Poppins, "Poppins Fallback"');
    await expect(label).toHaveCSS('font-size', '12px');
    await expect(label).toHaveCSS('line-height', '16px');
    await expect(label).toHaveCSS('font-weight', item.active ? '500' : '400');
    await expect(label).toHaveCSS('color', item.active ? 'rgb(83, 157, 243)' : 'rgb(72, 76, 82)');
  }

  await expect(navigation.getByRole('link', { name: 'Analytics' })).toHaveAttribute('aria-current', 'page');
  await expect(navigation.locator('[data-node-id="1:44"]')).toBeVisible();
  await expect(navigation.locator('[data-node-id="1:45"]')).toBeVisible();
  await expect(navigation).toHaveScreenshot('bottom-nav.png');
});
