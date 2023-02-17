const { calculateTip, fahrenheitToCelcius, celciusToFahrenheit } = require('../src/math')

test('Should calculate total with tip', () => {
    expect(calculateTip(10, 0.3)).toBe(13)

    // if (calculateTip(10, 0.3) !== 13) {
    //     throw new Error(`Total tip should be $13, got $${total} `)
    // }
})

test('Should calculate total with default tip', () => {
    expect(calculateTip(10)).toBe(12.5)
})

test('Should convert 32 F to 0 C', () => {
    expect(fahrenheitToCelcius(32)).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
    expect(celciusToFahrenheit(0)).toBe(32)
})

