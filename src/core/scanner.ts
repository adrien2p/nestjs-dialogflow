import { HandlerContainer } from './handlers';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { ModuleRef } from '@nestjs/core';
import { ModulesContainer } from '@nestjs/core/injector';
import { nestMetadata, DIALOG_FLOW_ACTION, DIALOG_FLOW_INTENT } from '../constant';

export class Scanner {
	constructor(
		private readonly moduleRef: ModuleRef,
		private readonly modulesContainer: ModulesContainer,
		private readonly handlerContainer: HandlerContainer,
	) {}

	public scanAndRegisterHandlers(): void {
		const metadataScanner = new MetadataScanner();
		const modules = [...this.modulesContainer.values()];

		modules.forEach(({ metatype }) => {
			const metadata = Reflect.getMetadata(nestMetadata.COMPONENTS, metatype) || [];
			const providers = [...metadata.filter((metatype: any) => typeof metatype === 'function')];

			providers.map(provider => {
				metadataScanner.scanFromPrototype(null, provider.prototype, methodName => {
					const intentOrAction =
						Reflect.getMetadata(
							DIALOG_FLOW_INTENT,
							Reflect.getOwnPropertyDescriptor(provider.prototype, methodName).value,
						) ||
						Reflect.getMetadata(
							DIALOG_FLOW_ACTION,
							Reflect.getOwnPropertyDescriptor(provider.prototype, methodName).value,
						);
					if (intentOrAction) {
						this.handlerContainer.register(
							intentOrAction,
							this.moduleRef.get(provider, { strict: false }),
							methodName,
						);
					}
				});
			});
		});
	}
}
