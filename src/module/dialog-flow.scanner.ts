import { ModuleRef } from '@nestjs/core';
import { ModulesContainer } from '@nestjs/core/injector';
import { HandlerContainer } from './dialog-flow.handler.container';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
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
			const components = [...metadata.filter((metatype: any) => typeof metatype === 'function')];

			components.map(component => {
				const reflectedMetadata = metadataScanner
					.scanFromPrototype(null, component.prototype, methodName => {
						const intentOrAction =
							Reflect.getMetadata(
								DIALOG_FLOW_INTENT,
								Reflect.getOwnPropertyDescriptor(component.prototype, methodName).value,
							) ||
							Reflect.getMetadata(
								DIALOG_FLOW_ACTION,
								Reflect.getOwnPropertyDescriptor(component.prototype, methodName).value,
							);
						return intentOrAction ? { component, intentOrAction, methodName } : null;
					})
          .filter(v => v);

				[...reflectedMetadata].forEach(metadata => {
					this.handlerContainer.register(
						metadata.intentOrAction,
						this.moduleRef.get(metadata.component, { strict: false }),
						metadata.methodName,
					);
				});
			});
		});
	}
}
