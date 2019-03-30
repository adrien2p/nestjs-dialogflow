import { AppProvider } from './app.provider';
import { DialogFlowModule } from 'nestjs-dialogflow';
import { Module } from '@nestjs/common';
import { AppProvider2 } from './app.provider2';

@Module({
    imports: [DialogFlowModule.forRoot()],
    providers: [AppProvider, AppProvider2]
})
export class AppModule {}
