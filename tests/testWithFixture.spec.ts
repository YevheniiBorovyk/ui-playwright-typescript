import { test } from '../testOption'
import { faker } from '@faker-js/faker'


test('Parametrized method', async ({ pageManager }) => {
    const fullName = faker.person.fullName()
    const email = `${fullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
    
    await pageManager.onFormLayoutPage().submitUsingTheGrigdFormWithCredentialsAndSelectionOptions(email, "Welcome1", "Option 1")
})