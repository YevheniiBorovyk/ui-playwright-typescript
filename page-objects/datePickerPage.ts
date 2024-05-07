import { Locator, Page, expect } from '@playwright/test'
import { HelperBase } from './heperBase'

export class DatePickerPage extends HelperBase {

    readonly commonCalendarInputField: Locator
    readonly calendarInputFieldWithRange: Locator
    readonly dateButton: Locator

    constructor(page: Page) {
        super(page)
        this.commonCalendarInputField = this.page.getByPlaceholder('Form Picker')
        this.calendarInputFieldWithRange = this.page.getByPlaceholder('Range Picker')
        this.dateButton = this.page.locator('.day-cell.ng-star-inserted')
    }

    async slectCommonDatePickerDateFormToday(numberOfdayFromToday: number) {
        await this.commonCalendarInputField.click()
        const dateToAssert = await this.selectDatePickerInTheCalendar(numberOfdayFromToday)
        await expect(this.commonCalendarInputField).toHaveValue(dateToAssert)
    }

    async slectDatePickerWithRangeFormToday(startDayFromToday: number, endDayFromToday: number) {
        await this.calendarInputFieldWithRange.click()
        const dataToAssertStart = await this.selectDatePickerInTheCalendar(startDayFromToday)
        const dataToAssertEnd = await this.selectDatePickerInTheCalendar(endDayFromToday)
        const dateToAssert = `${dataToAssertStart} - ${dataToAssertEnd}`
        await expect(this.calendarInputFieldWithRange).toHaveValue(dateToAssert)
    }

    private async selectDatePickerInTheCalendar(numberOfdayFromToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfdayFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShot = date.toLocaleString('En-US', { month: 'short' })
        const expectedYear = date.getFullYear()
        const dataToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`
        await this.dateButton.getByText(expectedDate, { exact: true }).click()
        return dataToAssert;
    }
}