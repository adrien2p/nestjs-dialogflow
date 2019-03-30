import { Injectable } from '@nestjs/common';

@Injectable()
export class AppProvider2 {
    public haveBeenCalled(intentOrAction: string): void {
        console.log(`intent or action ${intentOrAction} have been called`);
    }
}
