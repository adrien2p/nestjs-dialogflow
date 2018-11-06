import { AppComponent } from './app.component';
import { DialogFlowModule } from 'nestjs-dialogflow';
import { Module } from '@nestjs/common';
import { AppComponent2 } from './app.component2';

@Module({
    imports: [DialogFlowModule.forRoot()],
    providers: [AppComponent, AppComponent2]
})
export class AppModule {}
