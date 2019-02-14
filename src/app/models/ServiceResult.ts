export class ServiceResult {
    success: Boolean;
    title: string;
    message: string;

    constructor(success: Boolean, title: string, message: string) {
        this.success = success;
        this.title = title;
        this.message = message;
    }
}
