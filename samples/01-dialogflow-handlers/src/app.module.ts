import { AppComponent } from './app.component';
import { DialogFlowModule } from 'nestjs-dialogflow';
import { Module } from '@nestjs/common';

@Module({
  imports: [DialogFlowModule.forRoot()],
  controllers: [],
  providers: [AppComponent],
})
export class AppModule {}
