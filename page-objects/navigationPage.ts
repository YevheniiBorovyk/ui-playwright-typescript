import { Page } from '@playwright/test'
import { HelperBase } from './heperBase'

export class NavigationPage extends HelperBase{

    constructor(page: Page) {
        super(page)
    }

    async fromLayoutsPage() {
        await this.selectGroupMenuitem('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async datepickerPage() {
        await this.selectGroupMenuitem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage() {
        await this.selectGroupMenuitem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toasterPage() {
        await this.selectGroupMenuitem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage() {
        await this.selectGroupMenuitem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuitem(groupItemTitles: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitles)
        const expendedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expendedState == 'false') {
            await groupMenuItem.click()
        }
    }

}