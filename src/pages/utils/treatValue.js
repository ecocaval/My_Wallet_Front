export default function treatValue(value) {
    return Number(value.replace(",", "."))
}