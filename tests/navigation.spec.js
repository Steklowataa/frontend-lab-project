import { test, expect } from '@playwright/test';

// Test z Zadania 2: Sprawdzenie nawigacji do strony logowania
test('homepage has a button that navigates to login page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  
  await page.getByRole('button', { name: 'Zaczynamy' }).click();
  
  await expect(page).toHaveURL('http://localhost:3000/user/signin');


  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});


test('allows user to log in and redirects to profile', async ({ page }) => {
  await page.goto('http://localhost:3000/user/signin');
  await page.getByLabel('Email').fill('slizzzerin@gmail.com');
  await page.getByLabel('Password').fill('123-qweQWE');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.waitForURL('http://localhost:3000/zajecia');
  await expect(page).toHaveURL('http://localhost:3000/zajecia');
});


test('redirects unauthenticated user to login page when accessing profile', async ({ page }) => {
  await page.goto('http://localhost:3000/user/profile');
  await page.waitForURL('http://localhost:3000/user/signin?returnUrl=/user/profile');
  await expect(page).toHaveURL('http://localhost:3000/user/signin?returnUrl=/user/profile');

  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});
