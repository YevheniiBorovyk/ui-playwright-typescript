import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('Navigation to from page', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.onNavagitionPage().fromLayoutsPage()
    await pm.onNavagitionPage().datepickerPage()
    await pm.onNavagitionPage().smartTablePage()
    await pm.onNavagitionPage().toasterPage()
    await pm.onNavagitionPage().tooltipPage()
})

test('Parametrized method', async ({ page }) => {
    const pm = new PageManager(page)
    const fullName = faker.person.fullName()
    const email = `${fullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
    
    await pm.onNavagitionPage().fromLayoutsPage()
    await pm.onFormLayoutPage().submitUsingTheGrigdFormWithCredentialsAndSelectionOptions(email, "Welcome1", "Option 1")

    await pm.onNavagitionPage().datepickerPage()
    await pm.onDatePickerPage().slectCommonDatePickerDateFormToday(5)
    await pm.onDatePickerPage().slectDatePickerWithRangeFormToday(6, 8)
})