export class ServiceResult {
    success: Boolean;
    title: string;
    message: string;
    newData?: string;

    constructor(success: Boolean, title: string, message: string, newData?: string) {
        this.success = success;
        this.title = title;
        this.message = message;
        this.newData = newData;
    }
}
