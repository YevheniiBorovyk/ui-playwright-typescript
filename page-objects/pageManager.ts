import { Page } from '@playwright/test'
import { NavigationPage } from './navigationPage'
import { FormLayoutsPage } from './formLayoutsPage'
import { DatePickerPage } from './datePickerPage'

export class PageManager {

    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutPage: FormLayoutsPage
    private readonly datePickerPage: DatePickerPage

    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutPage = new FormLayoutsPage(this.page)
        this.datePickerPage = new DatePickerPage(this.page)
    }

    onNavagitionPage() {
        return this.navigationPage
    }

    onFormLayoutPage() {
        return this.formLayoutPage
    }

    onDatePickerPage() {
        return this.datePickerPage
    }
}