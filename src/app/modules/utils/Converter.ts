import { encode } from "base64-arraybuffer";
import { Observable } from "rxjs";

export class Converter {
    public static getBase64EncodedFileData(file: any): Observable<string> {
        return new Observable(observer => {
            const reader = new FileReader();

            reader.onload = () => {
                const { result } = reader;
                const data = result as ArrayBuffer;
                const base64Encoded = encode(data);
                observer.next(base64Encoded);
                observer.complete();
            };

            reader.onerror = () => {
                observer.error(reader.error);
            };

            reader.readAsArrayBuffer(file);
        });
    }
}