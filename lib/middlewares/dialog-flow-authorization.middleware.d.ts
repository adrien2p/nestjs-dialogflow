import { NestMiddleware } from '@nestjs/common';
export declare class DialogFlowAuthorizationMiddleware implements NestMiddleware {
    resolve(): (req: any, res: any, next: any) => any;
}
