import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Geometry Gym/);
});

test('sign in button is visible when logged out', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
});

test('can navigate to a workout', async ({ page }) => {
  await page.goto('/');
  // Click the first muscle group card
  const firstCard = page.locator('a[href*="/workout"]').first();
  await expect(firstCard).toBeVisible();
  await firstCard.click();
  await expect(page).toHaveURL(/\/workout/);
});
