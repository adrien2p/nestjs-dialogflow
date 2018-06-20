import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DialogFlowAuthorizationMiddleware implements NestMiddleware {
	resolve() {
		return function(req, res, next) {
			if (!req.headers.authorization) return next('Missing authorization header');

			if (process.env.DIALOG_FLOW_AUTHORIZATION_TOKEN === req.headers.authorization) {
				return next();
			} else {
				return next('Unrecognized authorization token');
			}
		};
	}
}
