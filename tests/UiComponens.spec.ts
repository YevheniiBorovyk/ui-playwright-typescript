import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test.describe.only('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })

        await usingTheGridEmailInput.fill('email@gmail.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('email2@gmail.com', { delay: 500 })

        //generic assertion 
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('email2@gmail.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('email2@gmail.com')
    })

    test('radio buttons', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" })
        const firstRadioButton = usingTheGridForm.getByRole('radio', { name: "Option 1" })
        const secondRadioButton = usingTheGridForm.getByRole('radio', { name: "Option 2" })

        await firstRadioButton.check({ force: true })
        expect(firstRadioButton).toBeChecked()

        await secondRadioButton.check({ force: true })
        expect(secondRadioButton.isChecked).toBeTruthy()
    })
})

test('radio buttons', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })
    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })

    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()) {
        await box.check({ force: true })
        expect(await box.isChecked()).toBeTruthy()
    }
})

test('List and dropdowns', async ({ page }) => {
    const dropdownMenu = page.locator('ngx-header nb-select')
    await dropdownMenu.click()

    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList.filter({ hasText: "Cosmic" }).click()
    const headerPageLocator = page.locator('nb-layout-header')
    await expect(headerPageLocator).toHaveCSS('background-color', 'rbg(50, 50, 89)')
})

test('Tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipCard = page.locator('nb-card', { hasText: "Tooltip Placements" })
    await tooltipCard.getByRole('button', { name: "Top" }).hover()

    await page.getByRole('tooltip')
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})

test('Dealog box', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', { hasText: "mdo@gmail.com" }).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})

test('datepicker', async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    let date = new Date()
    date.setDate(date.getDate() + 1)
    const expectedDate = date.getDate().toString()
    const expectedMonthShot = date.toLocaleString('En-US', { month: 'short' })
    const expectedYear = date.getFullYear()
    const dataToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click()
    await expect(calendarInputField).toHaveValue(dataToAssert)
})

test('Slider', async ({ page }) => {

    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    if (box !== null) {
        const x = box.x + box.width / 2
        const y = box.y + box.height / 2
        await page.mouse.move(x, y)
        await page.mouse.down()
        await page.mouse.move(x + 100, y)
        await page.mouse.move(x + 100, y + 100)
        await page.mouse.up
    }
    else {
        throw new Error("BoundingBox is null");
    }
    await expect(tempBox).toContainText('30')
})