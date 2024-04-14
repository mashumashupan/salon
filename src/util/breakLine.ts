export default function breakLine(str: string): string {
    return str.replace(/\n/g, '<br>');
}