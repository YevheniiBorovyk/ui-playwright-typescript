import { Locator, Page } from '@playwright/test'
import { HelperBase } from './heperBase'

export class FormLayoutsPage extends HelperBase {

    readonly usingTheGriadForm: any
    readonly inlineForm: any
    readonly inputEmail: Locator
    readonly inputPassword: Locator
    readonly buttonSignIn: Locator
    readonly inputName: Locator
    readonly checkbox: Locator
    readonly buttonSubmit: Locator

    constructor(page: Page) {
        super(page)
        this.usingTheGriadForm = this.page.locator('nb-card', { hasText: "Using the Grid" })
        this.inlineForm = this.page.locator('nb-card', { hasText: "Inline form" })
        this.inputEmail = this.usingTheGriadForm.getByRole('textbox', { name: "Email" })
        this.inputPassword = this.usingTheGriadForm.getByRole('textbox', { name: "Password" })
        this.buttonSignIn = this.usingTheGriadForm.getByRole('button')
        this.inputName = this.inlineForm.getByRole('textbox', { name: "Jane Doe" })
        this.checkbox = this.inlineForm.getByRole('checkbox')
        this.buttonSubmit = this.inlineForm.getByRole('button')
    }

    async submitUsingTheGrigdFormWithCredentialsAndSelectionOptions(email: string, password: string, optionText: string) {
        await this.inputEmail.fill(email)
        await this.inputPassword.fill(password)
        await this.usingTheGriadForm.getByRole('radio', { name: optionText }).check({ force: true })
        await this.buttonSignIn.click()
    }

    /**
     * 
     * @param name 
     * @param email 
     * @param rememberMe 
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        await this.inputName.fill(name)
        await this.inlineForm.inputEmail.fill(email)
        if (rememberMe)
            await this.checkbox.check({ force: true })
        await this.buttonSubmit.click()
    }
}