function changeAccentColor(color) {
    localStorage.setItem('accent-color', color);
    document.querySelector(':root').style.setProperty('--clr-primary', color);
    getBrightness(color);
}

let accentColor = localStorage.getItem('accent-color');
if (!accentColor) accentColor = '#007777';
document.querySelector('#accent-color').addEventListener('input', () => changeAccentColor(document.querySelector('#accent-color').value))
document.querySelector('#accent-color').value = accentColor;
changeAccentColor(accentColor)

function getBrightness(hex) {
    const r = parseInt(hex[1] + hex[2], 16);
    const g = parseInt(hex[3] + hex[4], 16);
    const b = parseInt(hex[5] + hex[6], 16);

    const brightness = Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b) / 2.55;
    if (brightness > 50) {
        document.querySelectorAll('.homework.subheading>p').forEach((element) => element.style.color = 'var(--clr-black)')
    } else [
        document.querySelectorAll('.homework.subheading>p').forEach((element) => element.style.color = '')
    ]
    return brightness;
}