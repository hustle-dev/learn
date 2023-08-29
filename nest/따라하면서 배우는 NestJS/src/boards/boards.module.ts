import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), AuthModule],
  controllers: [BoardsController],
  /**
   * 프로바이더를 통해 **종속성**으로 주입할 수 있다. 사용하려면 여기에 등록을 해줘야 함.
   * 객체의 인스턴스를 '연결'하는 역할을 한다.
   */
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
