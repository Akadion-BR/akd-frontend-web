export class Mask {

    public static cpfMask(string: string): string {
        if (string.length >= 3 && string.charAt(3) != '.') {
            string = [string.slice(0, 3), '.', string.slice(3)].join('')
        }
        if (string.length >= 7 && string.charAt(7) != '.') {
            string = [string.slice(0, 7), '.', string.slice(7)].join('')
        }
        if (string.length >= 11 && string.charAt(11) != '-') {
            string = [string.slice(0, 11), '-', string.slice(11)].join('')
        }
        return string.replace(/[&\/\\#,+@=!"_ªº¹²³£¢¬()$~%;':*?<>{}]/g, "").replace(/[^0-9.-]/g, '').trim();
    }

}