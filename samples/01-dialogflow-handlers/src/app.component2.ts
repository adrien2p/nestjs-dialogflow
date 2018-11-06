import { Injectable } from '@nestjs/common';

@Injectable()
export class AppComponent2 {
    public haveBeenCalled(intentOrAction: string): string {
        console.log(`intent or action ${intentOrAction} have been called`);
    }
}
