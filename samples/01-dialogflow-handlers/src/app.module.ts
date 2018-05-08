import { AppComponent } from './app.component';
import { DialogFlowModule } from 'nestjs-dialogflow';
import { Module } from '@nestjs/common';

@Module({
  imports: [DialogFlowModule.forRoute()],
  controllers: [],
  components: [AppComponent],
})
export class AppModule {}
