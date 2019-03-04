export class ServiceResult {
    success: Boolean;
    title: string;
    message: string;
    newData?: any;

    constructor(success: Boolean, title: string, message: string, newData?: any) {
        this.success = success;
        this.title = title;
        this.message = message;
        this.newData = newData;
    }
}
