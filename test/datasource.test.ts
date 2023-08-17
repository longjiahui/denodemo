import { DataSource, getDataFromDataSource } from '../src/datasource.ts'
import { ServiceError } from '../src/error.ts'
import { clippy, expect } from '../deps.ts'

Deno.test('incorrect from option', async () => {
    try {
        await getDataFromDataSource({
            from: 'hello',
            base64Data: '',
        })
        // should not execute
        expect(true).toBe(false)
    } catch (err) {
        if (!(err instanceof ServiceError)) {
            throw err
        }
    }
})

Deno.test('get text datasource from clipboard', async () => {
    const original = await clippy.read_text()
    const testText = 'hello world'
    await clippy.write_text(testText)
    try {
        expect(
            await getDataFromDataSource({
                from: DataSource.cilpboard,
            })
        ).toBe(testText)
    } finally {
        await clippy.write_text(original)
    }
})

Deno.test('get text datasource from base64', async () => {
    const data = 'hello world'
    expect(
        await getDataFromDataSource({
            from: DataSource.base64,
            base64Data: btoa(data),
        })
    ).toBe(data)
})
