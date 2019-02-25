export class MockRouter {
    navigate(commands: any[], extras?: string) {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }
 }