const { calculateTip, celsiusToFahrenheit, fahrenheitToCelsius, asyncFunction } = require('../src/math')

test('Calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12)
}) 

test('Should convert 32 F to 0 C', () => {
    const celcius = fahrenheitToCelsius(32)
    expect(celcius).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
    const fahrenheit = celsiusToFahrenheit(0)
    expect(fahrenheit).toBe(32)
})

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

test('Adding numbers async', (done) => {
    asyncFunction(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Async await adding numbers', async () => {
    const sum = await asyncFunction(10, 22)
    expect(sum).toBe(32)
})