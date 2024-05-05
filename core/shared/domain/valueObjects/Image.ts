import { ValueObject } from "./../ValueObject";
import { ArgumentInvalidException } from "./../../exceptions";
export enum ImageType {
    JPG = "jpg",
    PNG = "png",
    WEBP = "webp"
}
export class Image extends ValueObject<string> {
    constructor(uri: string) {
        super({ value: uri });
    }
    protected validate(props: { value: string }): void {
        if (
            !this.isExternalResource(props.value) &&
            !this.isInternalResource(props.value)
        )
            throw new ArgumentInvalidException("l'uri n'est pas valide.");
    }
    isExternalResource(uri: string = this.props.value): boolean {
        if (uri.includes("http://") || uri.includes("https://")) return true;
        return false;
    }
    isInternalResource(uri: string = this.props.value): boolean {
        if (
            uri.includes("file://") ||
            uri.includes("content://") ||
            uri.includes("asset://")
        ) {
            const uriArr = uri.split(".");
            if (
                Object.values(ImageType).includes(
                    uriArr[uriArr.length - 1].trim().toLowerCase() as ImageType
                )
            )
                return true;
        }
        return false;
    }
    get uri(): string {
        return this.props.value;
    }
}
