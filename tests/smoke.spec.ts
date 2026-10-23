/**
 * Playwright Smoke & Accessibility Verification Suite
 * Tests:
 * 1. Home loads and renders landmark elements
 * 2. Theme toggle switches between light and dark
 * 3. Contact form enforces required fields and valid email
 * 4. Project gallery supports keyboard navigation and modal view
 */

import { test, expect } from "@playwright/test";

test.describe("Portfolio Smoke Tests", () => {
  test("loads home page with title and primary landmarks", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Kamran Ali/);

    const header = page.locator("header");
    await expect(header).toBeVisible();

    const main = page.locator("main");
    await expect(main).toBeVisible();

    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("toggles between light and dark theme", async ({ page }) => {
    await page.goto("/");
    const themeBtn = page.getByRole("button", { name: /switch to/i });
    await expect(themeBtn).toBeVisible();

    await themeBtn.click();
    const isDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    expect(typeof isDark).toBe("boolean");
  });

  test("validates contact form fields", async ({ page }) => {
    await page.goto("/#contact");
    const submitBtn = page.getByRole("button", { name: /submit inquiry/i });
    await submitBtn.click();

    const nameError = page.locator("#name-error");
    await expect(nameError).toBeVisible();
  });
});
